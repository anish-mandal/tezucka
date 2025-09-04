import "server-only";
import { connect } from "mongoose";

export default async function connectDB() {
  if (process.env.DB) {
    await connect(process.env.DB)
  } else {
    throw Error("DB not defined")
  }
}
