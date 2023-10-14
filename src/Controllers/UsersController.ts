require("dotenv").config();
import crypto from "crypto";
import { Request, Response } from "express";
import { customPayloadResponse, getAuthAccessToken, sendingMail, validatePassword } from "../Helpers/Helpers"
import { User, getAllUsers, getUserByEmail, getUserPassword, getUserById, updateProfilePicture, updatePassword, updateResetToken, getRessetToken } from "../Entities/User";
import { getRegistrationByEmail } from "../Entities/Registration";
import {getChatUsers, getLatestChatRoomMessage} from "../Entities/Message"
import { handleUpload } from "../Helpers/cloudinary";


export async function handleGetAllUsers(req: Request, res: Response) {
    try {
      const  {page = 1} = req.query
      const parsedPage = parseInt(page as string)
      if (parsedPage < 1) {
        return res.json(customPayloadResponse(false, "Page must be greater than 0")).status(200).end();
      }
        const users = await getAllUsers(parsedPage)
        return res.json(customPayloadResponse(true, users)).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "Error occured")).status(500).end();
    }
}

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const { email, password, expoPushToken } = req.body;

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
      if (expoPushToken) {
        user.device_token = expoPushToken;
        await user.save();
      }

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

export const handleGetChatUsers = async (req: Request, res: Response) => {
    try {
        const users = await getChatUsers(req.user.id)
        return res.json(customPayloadResponse(true, users)).status(200).end();
    } catch (error) {
        console.log(error);
        return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
    }
}

export const handleUpdateProfilePicture = async (req: Request, res: Response) => {
    try {
        const user = req.user as User

        if (!req.file) return res.json(customPayloadResponse(false, "Image is required")).status(200).end()

        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const cldRes = await handleUpload(dataURI);

        const updatedUser = await updateProfilePicture(user.id, cldRes.secure_url)
        return res.json(customPayloadResponse(true, updatedUser)).status(200).end();
    } catch (error) {
        console.log(error);
        return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
    }
}


export const handleUpdatePassword = async (req: Request, res: Response) => {
  try {
    const {email, token, password} = req.body

    if (!token) {
      return res.json(customPayloadResponse(false, "Token is required")).status(200).end();
    }
    if (!password) {
      return res.json(customPayloadResponse(false, "Password is required")).status(200).end();
    }

    const userToken = await getRessetToken(email)

    if (userToken !== token) {
      return res.json(customPayloadResponse(false, "Invalid Token")).status(200).end();
    }

    const user = await updatePassword(email, password)

    return res.json(customPayloadResponse(true, user)).status(200).end();

  } catch (error) {
    console.log(error);
    return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
  }
}

export const handleGetToken = async (req: Request, res: Response) => {
  try {
    const {email} = req.body

    if (!email) {
      return res.json(customPayloadResponse(false, "Email is required")).status(200).end();
    }

    const user = await getUserByEmail(email)

    if (!user) {
      return res.json(customPayloadResponse(false, "User not found")).status(200).end();
    }

    const token = await updateResetToken(email)


    const mailOptions = {
          to: email,
          subject: "Password Reset Code",
          template: "Email",
          context: {
            body:
              "Hey " +
              user.full_name +
              ", Below is the code for password reset. " + token,
            data: token,
          },
        };
        sendingMail(mailOptions);

    return res.json(customPayloadResponse(true, "Sent email")).status(200).end();

  } catch (error) {
    console.log(error);
    return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
  }
}


export const handleGetLatestChatRoomMessage = async (req: Request, res: Response) => {
  try {
    const message = await getLatestChatRoomMessage()
    return res.json(customPayloadResponse(true, message)).status(200).end();
  } catch (error) {
    console.log(error);
    return res.json(customPayloadResponse(false, "Error occured")).status(200).end();
  }
}