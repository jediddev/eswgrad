import { Request, Response } from "express";
import { Student } from "../../../../models/Student";

export const GET = async (req: Request, res: Response) => {
    try{
        const student = await Student.findById(req.params.id);
        res.json({
            success: true,
            message: "Student fetched successfully",
            student,
        });
    }catch(e){
        res.status(500).json({
            success: false,
            message: "Failed to fetch student",
        });
    }
};
