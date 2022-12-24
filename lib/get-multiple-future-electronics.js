import axios from "axios"
import { toast } from "react-hot-toast"
import { NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY, NEXT_PUBLIC_FUTURE_ELECTRONICS_URL } from "../constants.js"
import _ from "lodash"

const getMultipleFutureElectronics = async (parts) => {
    try {
        const chunkSize = 300;

        const filteredParts = parts.filter((part) => part.length >= 3)
        const partsChunks = _.chunk(filteredParts, chunkSize)

        const config = {
            method: 'post',
            url: `${NEXT_PUBLIC_FUTURE_ELECTRONICS_URL}/batch/lookup`,
            headers: {
                'Accept': 'application/json,text/javascript',
                // 'host': 'api.orbweaver.com',
                'Content-Type': 'application/json',
                'x-orbweaver-licensekey': NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY
            },
        };

        const requests = partsChunks.map((parts) => {
            const data = JSON.stringify({ parts })
            config.data = data;

            return axios(config)
        })

        const responsesData = await Promise.allSettled(requests)

        const electronicsPartsFlatten = responsesData.map((data) => data?.value?.data?.lookup_parts ?? []).flat()

        return electronicsPartsFlatten
    }
    catch (err) {
        toast.error(err.message)

        return []
    }
}

export default getMultipleFutureElectronics