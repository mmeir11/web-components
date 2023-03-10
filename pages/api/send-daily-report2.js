import axios from "axios"
import { SERVER_URL } from "../../constants.js"
import getMultipleFutureElectronics from "../../lib/get-multiple-future-electronics.js"
import mapMultipleElectronicsData from "../../lib/map-multiple-electronics-data.js"

const sendDailyReport = async (req, res) => {
    try {
        console.log('sendDailyReport');
        console.log('getting sheet');
        const sheetDataResponse = await axios.get(`${SERVER_URL}/api/get-sheet`)

        if (sheetDataResponse.status !== 200) {
            throw new Error('failed to get sheet data')
        }

        console.log('get sheet success');
        const { sheetData } = sheetDataResponse.data
        const parts = sheetData.map((row) => row.partNumber)

        console.log('Get Multiple Future Electronics');

        var startTime = performance.now()

        const multipleElectronicsData = await getMultipleFutureElectronics(parts)

        var endTime = performance.now()
        console.log(`Call to getMultipleFutureElectronics took ${endTime - startTime} milliseconds`)

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

        const sendReportEmailBody = {
            inStock: inStockAsExcelData,
            outOfStock: outOfStockAsExcelData,
            offersNotFound: offersNotFoundAsExcelData,
        }

        console.log('Send Report Email Response', { inStock: inStockAsExcelData.length });

        const sendReportEmailResponse = await axios({
            method: 'post',
            url: `${SERVER_URL}/api/send-report-email`,
            data: sendReportEmailBody
        })

        const sendReportEmailData = sendReportEmailResponse.data

        console.log('send daily report finished', { sendReportEmailData })

        res.status(200)
    } catch (err) {
        console.error(err);
        res.status(400).json({ ...err })
    }
}

export default sendDailyReport