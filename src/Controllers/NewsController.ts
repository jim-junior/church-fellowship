import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers"
import { News, createNews, getNews, getLatestNews } from "../Entities/News";
import { handleUpload } from "../Helpers/cloudinary";

export async function handleGetNews(req: Request, res: Response) {
    try {
        const news = await getNews()
        return res.json(customPayloadResponse(true, news)).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "Error occured")).status(500).end();
    }
}

export async function handleCreateNews(req: Request, res: Response) {
    try {
        const { title, subTitle, description, date, venue } = req.body;
        if (!req.file) return res.json(customPayloadResponse(false, "Image is required")).status(200).end()

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);
        console.log(cldRes);



        const newNews = await createNews(title, subTitle, description, date, cldRes.secure_url, venue)
        return res.json(customPayloadResponse(true, newNews)).status(200).end();
    } catch (error) {
        console.log(error)
        return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
    }
}

export async function handleGetLatestNews(req: Request, res: Response) {
  try {
        const news = await getLatestNews()
        return res.json(customPayloadResponse(true, news)).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "Error occured")).status(500).end();
    }
}
