import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    photo: { type: String, required: true },
    role: { type: String, enum: ["attendee", "host", "admin"], required: true },
    registered: { type: Boolean, default: false },
    paymentDone: { type: Boolean, default: false },
    passcode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Student = mongoose.model("Student", StudentSchema);
