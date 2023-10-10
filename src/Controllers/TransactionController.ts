import { Request, Response } from "express";
import  {customPayloadResponse} from "../Helpers/Helpers"
import { push_expo_notification } from "../Helpers/mobile";
import {
    createMMTransaction, getTransactionByTxRef, getAllSuccessfulTransactions
} from "../Entities/Transaction"
import { charge_mobile_money, verifyOrder } from "../Helpers/pesapal";


export async function handleMobileMoneyTransaction(req: Request, res: Response) {
    try {
        const {userid, amount, transaction_type, phone_number, email, reason, network, device_id} = req.body

        if (!userid) {
            return res.json(customPayloadResponse(false, "Userid Required")).status(400).end();
        }

        if (!amount) {
            return res.json(customPayloadResponse(false, "Amount Required")).status(400).end();
        }

        if (!transaction_type) {
            return res.json(customPayloadResponse(false, "Transaction Type Required")).status(400).end();
        }

        if (!phone_number) {
            return res.json(customPayloadResponse(false, "Phone Number Required")).status(400).end();
        }

        if (!reason) {
            return res.json(customPayloadResponse(false, "Reason Required")).status(400).end();
        }



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
            reason,
            transaction.network
        )

        transaction.order_id = fw_res.order_tracking_id
        await transaction.save()


        return res.json(customPayloadResponse(true, fw_res)).status(200).end();

    } catch (error) {
        console.log(error)
        return res.json(customPayloadResponse(false, "Internal Server Error")).status(400).end();
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
                /* push_expo_notification(
                    trans.device_id,
                    "Transaction of UGX" + trans.amount + "Complete",
                ) */
                return res.json(customPayloadResponse(true, "success")).status(200).end();
            } else {
                return res.json(customPayloadResponse(true, "success")).status(200).end();
            }
        } else if (event === "charge.failed") {
            // charge successfull
            const trans = await getTransactionByTxRef(data.tx_ref)

            if (trans) {
                trans.status = "failed"
                trans.save()
                /* push_expo_notification(
                    trans.device_id,
                    "Transaction of UGX" + trans.amount + "Failed",
                ) */
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

export const getSuccessfulTransactions = async (req: Request, res: Response) => {
    try {
        const transactions = await getAllSuccessfulTransactions()

        return res.json(customPayloadResponse(true, transactions)).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "Internal Error")).status(200).end();
    }
}

export const handleVerifyTransaction = async (req: Request, res: Response) => {
    try {
        const {order_id} = req.body

        

        const fw_res = await verifyOrder(order_id)
        console.log(fw_res)

        const trans = await getTransactionByTxRef(fw_res.merchant_reference)

        if (!trans) {
            return res.json(customPayloadResponse(true, fw_res)).status(200).end();
        }

        if (fw_res.status_code === 1) {
            const trans = await getTransactionByTxRef(fw_res.merchant_reference)
            if (trans) {
                trans.status = "success"
                await trans.save()
            } 
        } else if (fw_res.status_code === 2) {
            if (trans) {
                trans.status = "failed"
                await trans.save()
            }
        }

        return res.json(customPayloadResponse(true, fw_res)).status(200).end();
    } catch (error: any) {
        console.log(error.response.data)
        return res.json(customPayloadResponse(false, "Internal Error")).status(200).end();
    }
}