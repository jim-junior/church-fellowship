import { Router } from "express";
import { handleGetAllUsers, handleLogin, handleGetAuthUser, handleGetChatUsers, handleUpdateProfilePicture, handleGetToken, handleUpdatePassword } from "../Controllers/UsersController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const profilePictureUpload = upload.single("photo");

export default (router: Router) => {
  const usersPrefix = "/users";
  router.get(`${usersPrefix}`, handleGetAllUsers);
  router.post(`${usersPrefix}/login`, handleLogin)
  router.get(`${usersPrefix}/auth`, JWTAuthMiddleWare, handleGetAuthUser)
  router.get(`${usersPrefix}/chat`, JWTAuthMiddleWare, handleGetChatUsers)
  router.post(`${usersPrefix}/profilepicture`, profilePictureUpload, JWTAuthMiddleWare, handleUpdateProfilePicture)
  router.post(`${usersPrefix}/token`, handleGetToken)
  router.post(`${usersPrefix}/update-password`, handleUpdatePassword)
};
