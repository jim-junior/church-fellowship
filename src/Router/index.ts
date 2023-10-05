import { Router } from "express";
import AuthRoutes from "./AuthRoutes";
import RegRoutes from "./RegRoutes";
import UserRoutes from "./UserRoutes";
import PrayerRequestRoutes from "./PrayerRequestRoutes";

const router = Router();

export default (): Router => {
  AuthRoutes(router);
  RegRoutes(router);
  UserRoutes(router)
  PrayerRequestRoutes(router)
  return router;
};
