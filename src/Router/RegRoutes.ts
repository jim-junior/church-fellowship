import { Router } from "express";
import {
  handleCreateNewRegistration,
  handleGetUnApprovedRegs,
  handleCreateUserFromRegistration
} from "../Controllers/RegistrationController";

export default (router: Router) => {
  const authPrefix = "/reg";
  router.post(`${authPrefix}/create`, handleCreateNewRegistration);
  router.get(`${authPrefix}/unapproved`, handleGetUnApprovedRegs);
  router.post(`${authPrefix}/approve`, handleCreateUserFromRegistration);
};
