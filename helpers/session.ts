import 'server-only'
import { verify, sign } from 'jsonwebtoken'
import { cookies } from 'next/headers'

const secretKey = process.env.SESSION_SECRET

if (!secretKey) {
  throw Error("No SESSION_SECRET found")
}

async function encrypt(payload: object, exp: string | number) {
  return sign(payload, secretKey!, { expiresIn: exp })
}

async function decrypt(token: string | undefined = '') {
  try {
    return verify(token, secretKey!);
  } catch (e) {
    // if (e.name == "TokenExpiredError") {
    //   TODO Implement refresh token route
    // }

    // if (e.name == "JsonWebTokenError") {
    //   return error(e.message)
    // }

    console.error(e)
  }
}

export async function createSession(userId: string) {
  if (!userId) {
    throw Error("no user id")
  }

  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000
  const session = await encrypt({ userId }, expiresAt)
  const cookieStore = await cookies()

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function checkSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session");

  return await decrypt(token)
}

export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.delete("session")
}
