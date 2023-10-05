import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers"
import { PrayerRequest, createPrayerRequest, getPrayerRequestsByUser, getPrayerRequests  } from "../Entities/PrayerRequest";

export async function handleGetPrayerRequests(req: Request, res: Response) {
    try {
        const prayerRequests = await getPrayerRequests()
        return res.json(customPayloadResponse(true, prayerRequests)).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "Error occured")).status(500).end();
    }
}

export async function handleCreatePrayerRequest(req: Request, res: Response) {
    try {
        const { request, user } = req.body;
        const prayerRequest = await createPrayerRequest(request, user)
        return res.json(customPayloadResponse(true, prayerRequest)).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
    }
}