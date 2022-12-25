import createExcelInBase64 from "../../lib/createExcelInBase64";
import * as XLSX from 'xlsx'
import sendEmail from '../../lib/sendEmail'
import { SENDGRID_FROM_EMAIL, SENDGRID_TO_EMAIL, NODE_ENV } from "../../constants.js";

export default async function handler(req, res) {
    try {
        const {
            body: {
                inStock,
                outOfStock,
                offersNotFound,
            }
        } = req

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

        let isEmailSend
        // if (NODE_ENV === 'production') {
        isEmailSend = await sendEmail({
            subject: 'Future Electronic API - Daily Report',
            to: SENDGRID_TO_EMAIL,
            from: SENDGRID_FROM_EMAIL,
            text: 'Daily report attached',
            attachments,
        })
        // }

        res.status(200).json({ isEmailSend })
    } catch (err) {
        console.log(err);

        res.status(400).json({ error: err.message })
    }
}


// export default function handler(req, res) {

//   res.status(200).json({ name: 'John Doe' })
// }
