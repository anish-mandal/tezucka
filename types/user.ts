export interface IUser {
  name: string,
  password: string,
  email: string
}

export interface DBUser {
  name: string,
  password: string,
  email: string,
  createdAt: Date
}
