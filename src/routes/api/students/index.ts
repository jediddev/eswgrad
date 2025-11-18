import { Request, Response } from "express";
import { Student } from "../../../models/Student";

export const GET = async (req: Request, res: Response) => {
    const students = await Student.find();
    res.json(students);
};

export const POST = async (req: Request, res: Response) => {
    const student = await Student.create(req.body);
    res.json(student);
};
