import db from "@/lib/db"
import { compare } from "bcrypt"
import { error, success } from "@/helpers/message";
import { createSession } from "@/helpers/session";
import { object, string, ValidationError } from "yup";

interface LoginData {
  email: string,
  password: string
}

const userLoginSchema = object<LoginData>({
  email: string().email("invalid email").required("email is required"),
  password: string().required("password is required")
})

export async function POST(req: Request) {
  let user, body: LoginData;

  try {
    body = await req.json();
  } catch (e) {
    return Response.json(error("invalid json"), { status: 422 })
  }

  try {
    body = await userLoginSchema.validate(body) as LoginData;
  } catch (e) {
    if (e instanceof ValidationError) {
      return Response.json(error(e.message), { status: 400 })
    }

    return Response.json(error("validation failed"), { status: 400 })
  }

  user = await db.user.find(body.email);
  if (!user) {
    return Response.json(error("user not found"), { status: 400 })
  }

  const match = await compare(body.password, user.password);
  if (match) {
    await createSession(user._id);

    return Response.json(success("authorized", {}))
  } else {
    return Response.json(error("email or password incorrect"), { status: 401 })
  }
}
