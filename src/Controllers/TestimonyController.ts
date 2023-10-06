import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers"
import { Testimony, createTestimony, getTestimoniesByUser, getTestimonies  } from "../Entities/Testimony";

export async function handleGetTestimonies(req: Request, res: Response) {
    try {
        const testimonies = await getTestimonies()
        return res.json(customPayloadResponse(true, testimonies)).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "Error occured")).status(500).end();
    }
}

export async function handleCreateTestimony(req: Request, res: Response) {
    try {
        const { testimony, user } = req.body;
        const newTestimony = await createTestimony(user, testimony)
        return res.json(customPayloadResponse(true, newTestimony)).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
    }
}

export async function handleGetTestimoniesByUser(req: Request, res: Response) {
    try {
        const { user } = req.body;
        const testimonies = await getTestimoniesByUser(user)
        return res.json(customPayloadResponse(true, testimonies)).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "Error occured")).status(500).end();
    }
}