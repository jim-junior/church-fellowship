import { Request, Response } from "express";
import { customPayloadResponse, hashPassword } from "../Helpers/Helpers"
import {
  createStaffAccoutForUser,
  createStaff,
  getAllStaff,
} from "../Entities/Staff"


export const handleCreateStaff = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      phoneNumber,
      isMother,
      children,
    } = req.body;

    if (!firstName) {
      return res.json(customPayloadResponse(false, "First Name is required")).status(400).end();
    }

    if (!middleName) {
      return res.json(customPayloadResponse(false, "Middle Name is required")).status(400).end();
    }

    if (!lastName) {
      return res.json(customPayloadResponse(false, "Last Name is required")).status(400).end();
    }

    if (!email) {
      return res.json(customPayloadResponse(false, "Email is required")).status(400).end();
    }

    if (!password) {
      return res.json(customPayloadResponse(false, "Password is required")).status(400).end();
    }

    if (!phoneNumber) {
      return res.json(customPayloadResponse(false, "Phone Number is required")).status(400).end();
    }

    if (!isMother) {
      return res.json(customPayloadResponse(false, "Mother is required")).status(400).end();
    }

    if (!children) {
      return res.json(customPayloadResponse(false, "Children is required")).status(400).end();
    }

    const hashedPassword = await hashPassword(password, 10);

    if (!hashedPassword) {
      return res.json(customPayloadResponse(false, "Internal Error")).status(400).end();
    }

    const staff = await createStaff(firstName, middleName, lastName, email, hashedPassword);

    return res.json(customPayloadResponse(true, staff)).status(200).end();
    
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
  }
}

export const handleCreateStaffAccoutForUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.json(customPayloadResponse(false, "User Id is required")).status(400).end();
    }

    const staff = await createStaffAccoutForUser(userId);

    return res.json(customPayloadResponse(true, staff)).status(200).end();
    
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
  }
}


export const handleGetAllStaff = async (req: Request, res: Response) => {
  try {
    const staff = await getAllStaff();

    return res.json(customPayloadResponse(true, staff)).status(200).end();
    
  } catch (error) {
    console.log(error)
    return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
  }
}