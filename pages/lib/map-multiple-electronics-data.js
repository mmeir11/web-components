const { default: mapElectronicsData } = require("./map-single-electronics-data")

const mapMultipleElectronicsData = (multipleElectronicsData) => {
    return multipleElectronicsData.lookup_parts?.map((electronicsData) => {

        const partNumber = electronicsData.part_number
        const electronicsDetails = mapElectronicsData(electronicsData)

        return {
            ...electronicsDetails,
            partNumber,
        }
    })
}

module.exports = mapMultipleElectronicsData