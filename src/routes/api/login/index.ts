import { Request, Response } from "express";
import { Student } from "../../../models/Student";
import bcrypt from "bcrypt";

export const POST = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, student.passcode);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
    } else if (student.role !== "admin") {
        return res.status(401).json({ message: "Invalid email or password" });
    }
    return res.json({ message: "Login successful", token: student._id });
};
