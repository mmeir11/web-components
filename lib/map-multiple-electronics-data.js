import  mapElectronicsData from "./map-single-electronics-data.js"

const mapMultipleElectronicsData = (multipleElectronicsData) => {

    const multipleElectronicsDataArr = multipleElectronicsData?.lookup_parts ?? multipleElectronicsData

    return multipleElectronicsDataArr?.map((electronicsData) => {

        const partNumber = electronicsData.part_number
        const electronicsOffersDetails = mapElectronicsData(electronicsData)

        return {
            partNumber,
            offers: electronicsOffersDetails,
        }
    })
}

export default mapMultipleElectronicsData