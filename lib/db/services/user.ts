import User from "../models/user";
import connectDB from "../connect";
import { IUser, PublicUser } from "@/types/user";

interface LoginData {
  _id: string,
  password: string
}

export async function create(user: IUser) {
  await connectDB();

  await User.create(user)
}

export async function find(email: string): Promise<LoginData | null> {
  await connectDB();

  const user = await User.findOne({ email: email }, "_id password");

  return user ?? null
}

export async function get(id: string): Promise<PublicUser | null> {
  await connectDB();

  const user = await User.findOne({ _id: id });

  return user ?? null
}
