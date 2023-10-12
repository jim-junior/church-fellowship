import { Router } from "express";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import { handleCreateStaff, handleCreateStaffAccoutForUser, handleGetAllStaff } from "../Controllers/StaffController";


export default (router: Router) => {
  const staffPrefix = "/staff";
  router.post(`${staffPrefix}/create`, JWTAuthMiddleWare, handleCreateStaff);
  router.post(`${staffPrefix}/create-account`, JWTAuthMiddleWare, handleCreateStaffAccoutForUser);
  router.get(`${staffPrefix}/all`, JWTAuthMiddleWare, handleGetAllStaff);
};