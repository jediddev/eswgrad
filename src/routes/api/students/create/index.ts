import { Request, Response } from "express";
import { Student } from "../../../../models/Student";
import bcrypt from "bcrypt";

export const POST = async (req: Request, res: Response) => {
    const {
        name,
        email,
        dob,
        gender,
        phone,
        address,
        photo,
        role,
        registerDate,
        password,
        passcode: passcodeRaw,
        section,
    } = req.body;

    const rawPass = password ?? passcodeRaw;
    if (!rawPass) {
        return res.status(400).json({
            success: false,
            message: "Passcode is required",
        });
    }

    try {
        const salt = await bcrypt.genSalt();
        const passcode = await bcrypt.hash(rawPass, salt);

        const student = await Student.create({
            name,
            email,
            dob: dob ? new Date(dob) : dob,
            gender,
            phone,
            address,
            photo,
            role: role || "attendee",
            registerDate,
            section,
            passcode,
        });
        res.json({
            success: true,
            message: "Student created successfully",
            student,
        });
    } catch (err: any) {
        return res.status(400).json({
            success: false,
            message: err?.message || "Validation failed",
        });
    }
};
