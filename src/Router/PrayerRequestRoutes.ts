import { Router } from "express";
import {
  handleGetPrayerRequests,
  handleCreatePrayerRequest
} from "../Controllers/PrayerReuestController";


export default (router: Router) => {
  const prPrefix = "/prayer-requets";
  router.get(`${prPrefix}/get`, handleGetPrayerRequests);
  router.post(`${prPrefix}/create`, handleCreatePrayerRequest);
};