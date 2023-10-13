import axios from 'axios';
import { Expo } from 'expo-server-sdk';


export async function push_expo_notification(
    token: string,
    message: string,
    title: string = "Mothers Online FellowShip",
    data = {}
) {
    try {
        const url = "https://exp.host/--/api/v2/push/send"

    const payload = {
        to: token,
        body: message,
        data,
    }

    let expo = new Expo();

    let res = await expo.sendPushNotificationsAsync([payload])

    /* const res = await axios.post(url, payload)
    console.log(res.data) */
    console.log(res)

    return res
    } catch (error) {
        console.log(error)
    }
    

}