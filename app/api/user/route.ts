import { success, error } from "@/helpers/message";
import { checkSession } from "@/helpers/session";
import db from "@/lib/db";

export async function GET() {
  const data = await checkSession();
  if (!data) {
    return Response.json(error("unauthorised"), { status: 401 })
  }

  const user = await db.user.get(data.userId);
  if (!user) {
    return Response.json(error("user not found"), { status: 401 })
  }

  return Response.json(success("user found", user))
}
