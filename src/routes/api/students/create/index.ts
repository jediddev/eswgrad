import { Request, Response } from "express";
import { Student } from "../../../../models/Student";
import bcrypt from "bcrypt";

export const POST = async (req: Request, res: Response) => {
    const { name, email, dob, gender, phone, address, photo, role, registerDate, password } = req.body;

    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Passcode is required",
        });
    }

    const salt = await bcrypt.genSalt();
    const passcode = await bcrypt.hash(password, salt);

    const student = await Student.create({
        name,
        email,
        dob,
        gender,
        phone,
        address,
        photo,
        role,
        registerDate,
        passcode,
    });
    res.json({
        success: true,
        message: "Student created successfully",
        student,
    });
};
