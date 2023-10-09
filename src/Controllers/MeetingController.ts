import { Request, Response } from "express";
import  {customPayloadResponse} from "../Helpers/Helpers"
import { push_expo_notification } from "../Helpers/mobile";
import { createMeeting, getMeetings, deleteMeeting, addParticipant } from "../Entities/Meeting";


export const createMeetingController = async (req: Request, res: Response) => {
    try {
        const {title, description, start_time, end_time, meeting_link} = req.body

        if (!title || !description || !start_time || !end_time || !meeting_link) {
            return res.json(customPayloadResponse(false, "All fields are required")).status(400).end();
        }

        const meeting = await createMeeting(
            title,
            description,
            start_time,
            end_time,
            meeting_link
        )

        return res.json(customPayloadResponse(true, meeting)).status(200).end();

    } catch (error) {
        console.log(error)
        return res.json(customPayloadResponse(false, "Internal Server Error")).status(400).end();
    }
}

export const getMeetingsController = async (req: Request, res: Response) => {
    try {
        const meetings = await getMeetings()

        return res.json(customPayloadResponse(true, meetings)).status(200).end();
    } catch (error) {
        console.log(error)
        return res.json(customPayloadResponse(false, "Internal Server Error")).status(400).end();
    }
}

export const deleteMeetingController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const deleted = await deleteMeeting(parseInt(id))

        if (!deleted) {
            return res.json(customPayloadResponse(false, "Meeting not found")).status(400).end();
        }

        return res.json(customPayloadResponse(true, "Meeting deleted successfully")).status(200).end();
    } catch (error) {
        console.log(error)
        return res.json(customPayloadResponse(false, "Internal Server Error")).status(400).end();
    }
}


export const handleAddParticipant = async (req: Request, res: Response) => {
    try {
        const {meetingId, userId} = req.body

        const participant = await addParticipant(parseInt(meetingId), parseInt(userId))

        if (!participant) {
            return res.json(customPayloadResponse(false, "Meeting or User not found")).status(400).end();
        }

        const meeting = await addParticipant(parseInt(meetingId), parseInt(userId))

        return res.json(customPayloadResponse(true, "Participant added successfully")).status(200).end();
    } catch (error) {
        console.log(error)
        return res.json(customPayloadResponse(false, "Internal Server Error")).status(400).end();
    }
}