import { Schema, model, models } from "mongoose";
import { DBUser } from "@/types/user";

const userSchema = new Schema<DBUser>({
 firstName: { type: String, minlength: [2, "first name must be at least 2 characters long"], required: true },
 lastName: { type: String, default: "" },
 email: { type: String, unique: true, required: true, lowercase: true },
 phoneNumber: { type: String, unique: true, required: true },
 password: { type: String, required: true, select: false },
 dateOfBirth: { type: Date, required: true },
 emailVerified: { type: Boolean, default: false },
 updateSignUp: { type: Boolean, default: false, select: false }
}, { timestamps: true })

const User = models.User || model<DBUser>("User", userSchema)

export default User;
