import axios from 'axios';


export async function push_expo_notification(
    token: string,
    message: string,
    title: string = "Mothers Online FellowShip",
    data = {}
) {
    const url = "https://exp.host/--/api/v2/push/send"

    const payload = {
        to: token,
        title,
        body: message,
        data
    }

    const res = await axios.post(url, payload)

    return res.data

}