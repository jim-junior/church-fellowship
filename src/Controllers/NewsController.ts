import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers"
import { News, createNews, getNews, getLatestNews } from "../Entities/News";

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
        const newNews = await createNews(title, subTitle, description, date, req.file.filename, venue)
        return res.json(customPayloadResponse(true, newNews)).status(200).end();
    } catch (error) {
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
