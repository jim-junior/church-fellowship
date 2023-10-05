
import {
    createNewRegistration,
    createUserFromRegistration,
    getRegistrationByRef,
    getUnApprovedRegistration
} from "../Entities/Registration"

import { Request, Response } from "express";

import  {customPayloadResponse, hashPassword} from "../Helpers/Helpers"
import { push_expo_notification } from "../Helpers/mobile";

export async function handleCreateNewRegistration(req: Request, res: Response) {
    try {
        const { 
            full_name, 
            phone_number, 
            email, 
            ref, 
            is_mother, 
            children, 
            device_id,
            password
        } = req.body;

        if (!password) {
            return res.json(customPayloadResponse(false, "Please Enter password")).status(200).end();
        }
        const hashedPass = await hashPassword(password, 10)

        if (!hashedPass) {
            return res.json(customPayloadResponse(false, "Internal Server Error")).status(200).end();
        }
        const createRegistration = await createNewRegistration(
            full_name, 
            phone_number, 
            email, 
            is_mother, 
            children,
            hashedPass,
            ref,  
            device_id
        );
        return res.json(customPayloadResponse(true, "Registration Successful")).status(200).end();
    } catch (error) {
        console.log(error)
        return res.json(customPayloadResponse(false, "Registration Failed")).status(200).end();
    }
}

export async function handleCreateUserFromRegistration(req: Request, res: Response) {
    try {
        const { registration_ref } = req.body;
        const reg = await getRegistrationByRef(registration_ref);

        if (reg) {
            const user = await createUserFromRegistration(registration_ref);
            try {
                await push_expo_notification(
                reg.device_id,
                "You have been registered successfully",
                "Registration Successful",
            )
            } catch (error) {
                //
            }
            
            return res.json(customPayloadResponse(true, "User Created Successfully")).status(200).end();
        } else {
            return res.json(customPayloadResponse(false, "Registration Not Found")).status(200).end();
        }



    } catch (error) {
        return res.json(customPayloadResponse(false, "Reeor")).status(500).end();
    }
}


export async function handleGetUnApprovedRegs(req: Request, res: Response) {
    try {
        const registrations = await getUnApprovedRegistration()
        return res.json(customPayloadResponse(true, registrations)).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "Reeor")).status(500).end();
    }
}

