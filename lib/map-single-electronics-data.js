
const mapElectronicsData = (electronicsData) => {
    return electronicsData?.offers?.map((offer) => {
        const {
            part_id: {
                mpn,
                seller_part_number: partNumber,
                web_url: webUrl,
            } = {},
            part_attributes: partAttributes,
            pricing,
            quantities: {
                factory_leadtime: leadTime,
                factory_leadtime_units: leadTimeType, // Weeks
                quantity_available: quantity
            },
            currency: {
                currency_code: currency,
            },
            images,
            // DC ?
        } = offer

        const manufacture = partAttributes?.find((attribute) => attribute?.name === 'manufacturerName')?.value
        const { unit_price: price } = pricing?.[0] || {}
        const image = images[images.length - 1]?.url

        return {
            mpn, // ML-1220
            partNumber,
            manufacture,
            webUrl,
            price,
            currency,
            leadTime,
            leadTimeType,
            quantity,
            image,
        }
    })
}

export default mapElectronicsData