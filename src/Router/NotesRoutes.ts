import { Router } from "express";
import {
  createNoteController,
  getNotesController,
  getUserNotesController,
} from "../Controllers/NotesController";
import { JWTAuthMiddleWare } from "../Middlewares/AuthMiddleware";

export default (router: Router) => {
  const notesPrefix = "/notes";
  router.get(`${notesPrefix}`, getNotesController);
  router.post(`${notesPrefix}/create`, JWTAuthMiddleWare, createNoteController);
  router.get(`${notesPrefix}/user`, JWTAuthMiddleWare, getUserNotesController);
};
