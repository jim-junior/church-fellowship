import {
    createNewRegistration,
    createUserFromRegistration,
    getRegistrationByRef
} from "../Entities/Registration"

import { Request, Response } from "express";

import  {customPayloadResponse} from "../Helpers/Helpers"
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
            device_id 
        } = req.body;
        const createRegistration = await createNewRegistration(
            full_name, 
            phone_number, 
            email, 
            ref, 
            is_mother, 
            children, 
            device_id
        );
        return res.json(customPayloadResponse(true, "Registration Successful")).status(200).end();
    } catch (error) {
        return res.json(customPayloadResponse(false, "")).status(500).end();
    }
}

export async function handleCreateUserFromRegistration(req: Request, res: Response) {
    try {
        const { registration_ref } = req.body;
        const reg = await getRegistrationByRef(registration_ref);

        if (reg) {
            const user = await createUserFromRegistration(registration_ref);
            push_expo_notification(
                reg.device_id,
                "You have been registered successfully",
                "Registration Successful",
            )
            return res.json(customPayloadResponse(true, "User Created Successfully")).status(200).end();
        } else {
            return res.json(customPayloadResponse(false, "Registration Not Found")).status(200).end();
        }



    } catch (error) {
        return res.json(customPayloadResponse(false, "Reeor")).status(500).end();
    }
}

