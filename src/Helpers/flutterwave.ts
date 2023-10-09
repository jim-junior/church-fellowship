
require("dotenv").config();
//@ts-ignore
import Flutterwave from "flutterwave-node-v3";

export async function charge_mobile_money(
    phone_number: string,
    amount: string,
    email: string,
    tx_ref: string,
    network: string = "MTN",
    currency: string = "UGX"
) {
    const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);


    const payload = {
        phone_number,
        network,
        amount,
        currency,
        email,
        tx_ref: tx_ref
    }
    const res = await flw.MobileMoney.uganda(payload)



    return res
}

