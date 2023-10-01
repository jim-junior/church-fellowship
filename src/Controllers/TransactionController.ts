import { Request, Response } from "express";
import  {customPayloadResponse} from "../Helpers/Helpers"
import { push_expo_notification } from "../Helpers/mobile";
import {
    createMMTransaction, getTransactionByTxRef
} from "../Entities/Transaction"
import { charge_mobile_money } from "../Helpers/flutterwave";


export async function handleMobileMoneyTransaction(req: Request, res: Response) {
    try {
        const {userid, amount, transaction_type, phone_number, email, reason, network, device_id} = req.body

        const transaction = await createMMTransaction(
            userid,
            parseInt(amount),
            transaction_type,
            phone_number,
            email,
            reason,
            network,
            device_id
        )

        const fw_res = await charge_mobile_money(
            phone_number,
            transaction.amount.toString(),
            email,
            transaction.tx_ref,
            transaction.network,
            transaction.network
        )

        return res.json(customPayloadResponse(true, fw_res)).status(200).end();

    } catch (error) {
        console.log(error)
    }
}



export const flutterwaveWebhook = async (req: Request, res: Response) => {
    try {
        const {event, data} = req.body

        if (event === "charge.completed") {
            // charge successfull
            const trans = await getTransactionByTxRef(data.tx_ref)

            if (trans) {
                trans.status = "success"
                trans.save()
                push_expo_notification(
                    trans.device_id,
                    "Transaction of UGX" + trans.amount + "Complete",
                )
                return res.json(customPayloadResponse(true, "success")).status(200).end();
            } else {
                return res.json(customPayloadResponse(true, "success")).status(200).end();
            }
        }

        return res.json(customPayloadResponse(true, "success")).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(true, "success")).status(200).end();
    }
}