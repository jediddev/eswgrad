// In src/routes/api/students/get-all/index.ts
import { Request, Response } from "express";
import { Student } from "../../../../models/Student";

export const GET = async (req: Request, res: Response) => {
    try {
        const students = await Student.find({}, { passcode: 0 }); // Exclude passcode from response
        if (!students || students.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No students found",
                students: [] // Return empty array instead of undefined
            });
        }
        return res.json({
            success: true,
            message: "Students fetched successfully",
            students // Changed from 'student' to 'students' for consistency
        });
    } catch (e: any) {
        console.error("Error in GET /api/students/get-all:", e);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch students",
            error: e.message
        });
    }
};