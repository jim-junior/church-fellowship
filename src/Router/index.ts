import { Router } from "express";
import AuthRoutes from "./AuthRoutes";
import RegRoutes from "./RegRoutes";
import UserRoutes from "./UserRoutes";
import PrayerRequestRoutes from "./PrayerRequestRoutes";
import TestimonyRoutes from "./TestimonyRoutes";
import NewsRouter from "./NewsRouter";

const router = Router();

export default (): Router => {
  AuthRoutes(router);
  RegRoutes(router);
  UserRoutes(router)
  PrayerRequestRoutes(router)
  TestimonyRoutes(router)
  NewsRouter(router)
  return router;
};
