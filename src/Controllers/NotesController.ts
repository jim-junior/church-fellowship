import { Request, Response } from "express";
import { customPayloadResponse } from "../Helpers/Helpers"
import { getNotes, createNote, getUserNotes } from "../Entities/Notes";


export const getNotesController = async (req: Request, res: Response) => {
    try {
        const notes = await getNotes()

        return res.json(customPayloadResponse(true, notes)).status(200).end();
    } catch (error) {
        console.log(error)
        return res.json(customPayloadResponse(false, "Internal Server Error")).status(400).end();
    }
}

export const getUserNotesController = async (req: Request, res: Response) => {
    try {
        console.log(req.user)

        const notes = await getUserNotes(req.user.id)

        return res.json(customPayloadResponse(true, notes)).status(200).end();
    } catch (error) {
        console.log(error)
        return res.json(customPayloadResponse(false, "Internal Server Error")).status(400).end();
    }
}

export const createNoteController = async (req: Request, res: Response) => {
    try {
        const { content, user_id } = req.body

        if (!content) {
            return res.json(customPayloadResponse(false, "All fields are required")).status(200).end();
        }

        const note = await createNote(
            content,
            user_id
        )

        return res.json(customPayloadResponse(true, note)).status(200).end();

    } catch (error) {
        console.log(error)
        return res.json(customPayloadResponse(false, "Internal Server Error")).status(400).end();
    }
}

