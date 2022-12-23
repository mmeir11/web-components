const axios = require("axios")
const { toast } = require("react-hot-toast")
const { FUTURE_ELECTRONICS_KEY, FUTURE_ELECTRONICS_URL } = require("../../consts")

const getMultipleFutureElectronics = async (parts) => {
    try {
        const data = JSON.stringify({parts})

        const config = {
            method: 'post',
            url: `${FUTURE_ELECTRONICS_URL}/batch/lookup`,
            headers: {
                'Accept': 'application/json,text/javascript',
                // 'host': 'api.orbweaver.com',
                'Content-Type': 'application/json',
                'x-orbweaver-licensekey': FUTURE_ELECTRONICS_KEY
            },
            data,
        };

        const electronicsResponse = await axios(config)

        if (electronicsResponse.status !== 200) {
            throw new Error('Request Failed')
        }

        const electronicsData = electronicsResponse.data

        return electronicsData
    }
    catch (err) {
        toast.error(err.message)

        return []
    }
}

module.exports = getMultipleFutureElectronics