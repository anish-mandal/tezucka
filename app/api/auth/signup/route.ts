import { object, string, boolean, date, ObjectSchema, ValidationError } from "yup";
import { IUser } from "@/types/user";
import { hash } from "bcrypt";
import db from "@/lib/db";
import { success, error } from "@/helpers/message";

const userSchema: ObjectSchema<IUser> = object({
  firstName: string().required().min(2, "first name must be at least 2 character long"),
  lastName: string().default(""),
  dateOfBirth: date().required("date of birth is required").max(new Date(), "date of birth cannot be in the future"),
  email: string().email("invalid email").required("email is required"),
  phoneNumber: string().required("phone number is required"),
  password: string().required("password is required"),
  emailVerified: boolean().default(false),
  updateSignUp: boolean().default(false)
})


export async function POST(req: Request) {
  let user, body;

  try {
    body = await req.json();
  } catch (e) {
    return Response.json(error("invalid json"), { status: 422 })
  }

  try {
    user = await userSchema.validate(body);
  } catch (e) {
    if (e instanceof ValidationError) {
      return Response.json(error(e.message), { status: 400 })
    }

    return Response.json(error("validation failed"), { status: 400 })
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
