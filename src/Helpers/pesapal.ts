require("dotenv").config();
import axios from "axios";

const PESAPAL_API = "https://cybqa.pesapal.com/pesapalv3"

async function getAuthToken() {
    const payload = {
        consumer_key: process.env.PESAPAL_CONSUMER_KEY,
        consumer_secret: process.env.PESAPAL_CONSUMER_SECRET
    }

    const response = await axios.post(`${PESAPAL_API}/api/Auth/RequestToken`, payload, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    return response.data
}



export async function charge_mobile_money(
    phone_number: string,
    amount: string,
    email: string,
    tx_ref: string,
    reason: string,
    network: string = "MTN",
    currency: string = "UGX"
) {
  const {token}= await getAuthToken()

  const payload = {
    "id": tx_ref,
    "currency": currency,
    "amount": amount,
    "description": reason,
    "callback_url": "http://192.168.43.171:3000/transaction/pesapal/verify",
    "notification_id": process.env.PESAPAL_NOTIFICATION_ID,
    "billing_address": {
        "email_address": email,
        "phone_number": phone_number,
    }
  }

  const response = await axios.post(`${PESAPAL_API}/api/Transactions/SubmitOrderRequest`, payload, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  return response.data
}   


export async function verifyOrder(order_id: string) {
  const {token} = await getAuthToken()
  const response = await axios.get(`${PESAPAL_API}/api/Transactions/GetTransactionStatus?orderTrackingId=${order_id}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  return response.data
}