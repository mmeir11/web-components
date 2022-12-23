import axios from "axios"
import { toast } from "react-hot-toast"
import { NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY, NEXT_PUBLIC_FUTURE_ELECTRONICS_URL } from "../consts"

const getFutureElectronics = async (partNumber, lookupType) => {
    try {
        const config = {
            method: 'get',
            url: `${NEXT_PUBLIC_FUTURE_ELECTRONICS_URL}/lookup?part_number=${partNumber}&lookup_type=${lookupType}`,
            headers: {
                'Accept': 'application/json,text/javascript',
                // 'host': 'api.orbweaver.com',
                'Content-Type': 'application/json',
                'x-orbweaver-licensekey': NEXT_PUBLIC_FUTURE_ELECTRONICS_KEY
            }
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

export default getFutureElectronics