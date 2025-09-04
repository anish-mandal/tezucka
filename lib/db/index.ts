import "server-only"
import { create, find } from "./services/user"

const user = {
  create: create,
  find: find
}

const db = {
  user: user
}

export default db;
