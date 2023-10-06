import { Router } from "express";
import {
  handleGetTestimonies,
  handleCreateTestimony
} from "../Controllers/TestimonyController";


export default (router: Router) => {
  const trPrefix = "/testimonies";
  router.get(`${trPrefix}/get`, handleGetTestimonies);
  router.post(`${trPrefix}/create`, handleCreateTestimony);
};
