export interface IUser {
  name: string,
  password: string,
  email: string
}

export interface DBUser {
  _id?: string,
  name: string,
  password: string,
  email: string,
  phoneNumber: string,
  emailVerified: boolean,
  createdAt?: Date,
  updatedAt?: Date
}

export type PublicUser = Omit<DBUser, "password">
