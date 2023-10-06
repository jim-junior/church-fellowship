import { Router } from "express";
import { handleCreateNews, handleGetLatestNews, handleGetNews } from "../Controllers/NewsController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";
import multer from "multer";
const storage = multer.diskStorage({
  destination: "useruploads/",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const newsImage = upload.single("photo");


export default (router: Router) => {
  const newsPrefix = "/news";
  router.get(`${newsPrefix}`, handleGetNews);
  router.get(`${newsPrefix}/latest`, handleGetLatestNews);
  router.post(`${newsPrefix}/create`, JWTAuthMiddleWare, newsImage, handleCreateNews);
};
