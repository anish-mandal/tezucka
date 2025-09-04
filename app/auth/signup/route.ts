import { object, string, boolean, ObjectSchema } from "yup";
import { IUser } from "@/types/user";
import { hash } from "bcrypt";
import db from "@/lib/db";
import { success, error } from "@/helpers/message";

const userSchema: ObjectSchema<IUser> = object({
  name: string().required().min(2, "name must be at least 2 character long"),
  email: string().email().required(),
  phoneNumber: string().required(),
  password: string().required(),
  emailVerified: boolean().default(false)
})


export async function POST(req: Request) {
  let user, body;

  try {
    body = await req.json();
    user = await userSchema.validate(body);
  } catch (e) {
    return Response.json(error("invalid user data syntax"), { status: 400 })
  }

    const existingUser = await db.user.find(user.email)

    if (existingUser) {
      return Response.json(error("user already exist"), { status: 409 })
    }

  try {
    user.password = await hash(user.password, 10)
  } catch (e) {
    return Response.json(error("unable to hash password"), { status: 500 })
  }

  try {
    await db.user.create(user);

    return Response.json(success("user created", {}))
  } catch (e) {
    console.log(e)
    return Response.json(error("unable to create user"), { status: 500 })
  }
}
