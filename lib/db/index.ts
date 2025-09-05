import "server-only"
import { create, find, get } from "./services/user"

const user = {
  create: create,
  find: find,
  get: get
}

const db = {
  user: user
}

export default db;
