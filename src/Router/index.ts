import { Router } from "express";
import AuthRoutes from "./AuthRoutes";
import RegRoutes from "./RegRoutes";
import UserRoutes from "./UserRoutes";
import PrayerRequestRoutes from "./PrayerRequestRoutes";
import TestimonyRoutes from "./TestimonyRoutes";
import NewsRouter from "./NewsRouter";
import TransactionRoutes from "./TransactionRoutes";
import MeetingRoutes from "./MeetingRoutes";
import NotesRoutes from "./NotesRoutes";
import StaffRoutes from "./StaffRoutes";

const router = Router();

export default (): Router => {
  AuthRoutes(router);
  RegRoutes(router);
  UserRoutes(router)
  PrayerRequestRoutes(router)
  TestimonyRoutes(router)
  NewsRouter(router)
  TransactionRoutes(router)
  MeetingRoutes(router)
  NotesRoutes(router)
  StaffRoutes(router)
  return router;
};
