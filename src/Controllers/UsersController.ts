require("dotenv").config();
import crypto from "crypto";
import { Request, Response } from "express";
import { customPayloadResponse, getAuthAccessToken, validatePassword } from "../Helpers/Helpers"
import { User, getAllUsers, getUserByEmail, getUserPassword, getUserById } from "../Entities/User";
import { getRegistrationByEmail } from "../Entities/Registration";


export async function handleGetAllUsers(req: Request, res: Response) {
    try {
        const users = await getAllUsers()
        return res.json(customPayloadResponse(true, users)).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "Error occured")).status(500).end();
    }
}

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res
        .json(customPayloadResponse(false, "Email Required"))
        .status(200)
        .end();
    }

    if (!password) {
      return res
        .json(customPayloadResponse(false, "Password Required"))
        .status(200)
        .end();
    }

    const user = await getUserByEmail(email);

    if (!user) {
        const registration = await getRegistrationByEmail(email)
        if (registration) {
            return res
                .json(customPayloadResponse(false, "Account not approved yet. Please Wait"))
                .status(200)
                .end();
        }
        return res
            .json(customPayloadResponse(false, "Incorrect Email or Password"))
            .status(200)
            .end();
    } else {
      const userWithPass = await getUserPassword(email) as User
      const validatedPassword = await validatePassword(password, userWithPass.password);

      const findUserById = await getUserById(user.id);

      if (!validatedPassword) {
        return res
          .json(customPayloadResponse(false, "Incorrect Email or Password"))
          .status(200)
          .end();
      }

      if (findUserById) {
        const accessToken = getAuthAccessToken(
          findUserById,
          process.env.ACCESS_TOKEN_SECRET
        );

        const response = {
          token: accessToken,
          user: findUserById,
        };

        return res
          .json(customPayloadResponse(true, response))
          .status(200)
          .end();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleGetAuthUser = async (req: Request, res: Response) => {
  try {
    const user = req.user
    return res.json(customPayloadResponse(true, user)).status(200).end();
  } catch (error) {
    console.log(error);
    return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
  }
}