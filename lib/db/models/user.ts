import { Schema, model, models } from "mongoose";
import { DBUser } from "@/types/user";

const userSchema = new Schema<DBUser>({
 name: { type: String, minLength: [2, "name must be at least 2 characters long"], required: true },
 email: { type: String, unique: true, required: true, lowercase: true },
 phoneNumber: { type: String, unique: true, required: true },
 password: { type: String, required: true },
 emailVerified: { type: Boolean, required: true, default: false },
}, { timestamps: true })

const User = models.User || model<DBUser>("User", userSchema)

export default User;
