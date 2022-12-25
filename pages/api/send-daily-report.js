import axios from "axios"
import getMultipleFutureElectronics from "../../lib/get-multiple-future-electronics.js"
import mapMultipleElectronicsData from "../../lib/map-multiple-electronics-data.js"
import { google } from 'googleapis'
import { GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, SPREADSHEET_ID, SENDGRID_FROM_EMAIL, SENDGRID_TO_EMAIL } from '../../constants.js'
import createExcelInBase64 from "../../lib/createExcelInBase64";
import * as XLSX from 'xlsx'
import sendEmail from '../../lib/sendEmail'

const sendReportEmail = async ({ inStock, outOfStock, offersNotFound }) => {
    try {
        const workbook = XLSX.utils.book_new();

        await createExcelInBase64({ workbook, sheetName: 'In Stock', data: inStock, headers: ['Part Number', 'Quantity', 'Manufacture', 'Lead Time', 'Price'] })
        await createExcelInBase64({ workbook, sheetName: 'Out Of Stock', data: outOfStock, headers: ['Part Number'] })
        const base64Excel = await createExcelInBase64({ workbook, sheetName: 'Offers Not Found', data: offersNotFound, headers: ['Part Number'] })

        // const excelFile = await XLSX.writeFile(workbook, 'excel.xlsx')

        const todayDate = new Date().toLocaleDateString('gu')
        const attachments = [
            {
                content: base64Excel,
                filename: `Daily Report ${todayDate}.xlsx`,
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                disposition: 'attachment'
            }
        ]

        const isEmailSend = await sendEmail({
            subject: 'Future Electronic API - Daily Report',
            to: SENDGRID_TO_EMAIL,
            from: SENDGRID_FROM_EMAIL,
            text: 'Daily report attached',
            attachments,
        })

        return isEmailSend
    } catch (err) {
        console.log(err);

        throw err
    }
}

const getSheetData = async () => {
    try {
        const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
        const jwt = new google.auth.JWT(
            GOOGLE_SHEETS_CLIENT_EMAIL,
            null,
            (GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
            target
        );

        const sheetName = 'Priority'
        const sheets = google.sheets({ version: 'v4', auth: jwt });
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: sheetName,
        });

        const rows = response.data.values;

        let sheetData = []
        if (rows.length) {
            sheetData = rows.slice(1).map((row) => ({
                partNumber: row[0],
                stock: row[1],
            }));
        }

        return { sheetData }
    } catch (err) {
        console.log(err);

        throw err
    }
}

const parseMultipleElectronicsToExcel = (multipleElectronicsData) => {
    const mappedMultipleElectronicsData = mapMultipleElectronicsData(multipleElectronicsData)

    const outOfStock = mappedMultipleElectronicsData.filter((electronic) => electronic?.offers.length > 0 && electronic.offers?.every((offer) => offer?.quantity === 0))
    const inStock = mappedMultipleElectronicsData.filter((electronic) => electronic?.offers.length > 0 && electronic.offers?.some((offer) => offer?.quantity > 0))
    const offersNotFound = mappedMultipleElectronicsData.filter((electronic) => !electronic?.offers.length)

    const inStockAsExcelData = inStock.map((electronic) => {
        const offer = electronic.offers?.find((offer) => offer?.quantity > 0)
        const { quantity, manufacture, leadTime, leadTimeType, price, currency } = offer

        return [electronic.partNumber, quantity, manufacture, `${leadTime} ${leadTimeType}`, `${price} ${currency}`]
    })
    const outOfStockAsExcelData = outOfStock.map((electronic) => [electronic.partNumber])
    const offersNotFoundAsExcelData = offersNotFound.map((electronic) => [electronic.partNumber])

    return { inStockAsExcelData, outOfStockAsExcelData, offersNotFoundAsExcelData }
}

const sendDailyReport = async (req, res) => {
    var startTime = performance.now()
    try {
        console.log('sendDailyReport');
        console.log('getting sheet');

        const { sheetData } = await getSheetData()

        console.log('get sheet success');

        const parts = sheetData.map((row) => row.partNumber)

        console.log('Get Multiple Future Electronics');

        const multipleElectronicsData = await getMultipleFutureElectronics(parts)

        const {
            inStockAsExcelData,
            outOfStockAsExcelData,
            offersNotFoundAsExcelData
        } = parseMultipleElectronicsToExcel(multipleElectronicsData)

        const sendReportEmailBody = {
            inStock: inStockAsExcelData,
            outOfStock: outOfStockAsExcelData,
            offersNotFound: offersNotFoundAsExcelData,
        }

        console.log('Send Report Email Response', { inStock: inStockAsExcelData.length });

        const isEmailSend = await sendReportEmail(sendReportEmailBody)

        console.log('send daily report finished')

        res.status(200).json({ isEmailSend })
    } catch (err) {
        console.error(err);
        res.status(400).json({ ...err })
    }
    var endTime = performance.now()
    console.log(`Call to getMultipleFutureElectronics took ${endTime - startTime} milliseconds`)

}

export default sendDailyReport