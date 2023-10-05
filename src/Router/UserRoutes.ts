import { Router } from "express";
import { handleGetAllUsers, handleLogin, handleGetAuthUser } from "../Controllers/UsersController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const usersPrefix = "/users";
  router.get(`${usersPrefix}`, handleGetAllUsers);
  router.post(`${usersPrefix}/login`, handleLogin)
  router.get(`${usersPrefix}/auth`, JWTAuthMiddleWare, handleGetAuthUser)
};
