import { Router } from "express";
import {
    createMeetingController,
    getMeetingsController,
    deleteMeetingController,
    handleAddParticipant
} from "../Controllers/MeetingController";

export default (router: Router) => {
    const meetingPrefix = "/meetings";
    router.post(`${meetingPrefix}/create`, createMeetingController);
    router.get(`${meetingPrefix}/get`, getMeetingsController)
    router.delete(`${meetingPrefix}/delete/:id`, deleteMeetingController)
    router.post(`${meetingPrefix}/add-participant`, handleAddParticipant)
};