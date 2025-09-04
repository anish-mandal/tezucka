import db from "@/lib/db"
import { compare } from "bcrypt"
import { error, success } from "@/helpers/message";
import { createSession } from "@/helpers/session";

export async function POST(req: Request) {
  let user;
  const body = await req.json()

  try {
    user = await db.user.find(body.email)
  } catch (e) {
    return Response.json(error("unable to find user"), { status: 400 })
  }

  const match = await compare(body.password, user!.password);
  if (match) {
    await createSession(user!._id);

    return Response.json(success("authorized", {}))
  } else {
    return Response.json(error("unauthorized"), { status: 401 })
  }
}
