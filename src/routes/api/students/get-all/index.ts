import { Request, Response } from "express";
import { Student } from "../../../../models/Student";

export const GET = async (req: Request, res: Response) => {
    try{
        const student = await Student.find();
        res.json({
            success: true,
            message: "Students fetched successfully",
            student,
        });
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Failed to fetch students",
        });
    }
};
