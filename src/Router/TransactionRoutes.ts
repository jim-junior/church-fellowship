import { Router } from "express";
import { 
    handleMobileMoneyTransaction, 
    flutterwaveWebhook,
    getSuccessfulTransactions,
    handleVerifyTransaction
} from "../Controllers/TransactionController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";



export default (router: Router) => {
    const transactionPrefix = "/transaction";
    router.post(`${transactionPrefix}/mobile-money`, JWTAuthMiddleWare, handleMobileMoneyTransaction);
    router.post(`${transactionPrefix}/flutterwave-webhook`, flutterwaveWebhook)
    router.get(`${transactionPrefix}/successful`, getSuccessfulTransactions)
    router.post(`${transactionPrefix}/verify`, handleVerifyTransaction)
};
