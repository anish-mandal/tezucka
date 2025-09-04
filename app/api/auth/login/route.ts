import db from "@/lib/db"
import { compare } from "bcrypt"
import { error, success } from "@/helpers/message";
import { createSession } from "@/helpers/session";

export async function POST(req: Request) {
  let user, body;

  try {
    body = await req.json();
    user = await db.user.find(body.email);
  } catch (e) {
    return Response.json(error("unable to find user"), { status: 400 })
  }

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
