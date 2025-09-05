export interface IUser {
  name: string,
  password: string,
  email: string
}

export interface DBUser {
  readonly _id?: string,
  firstName: string,
  lastName: string,
  password: string,
  dateOfBirth: Date,
  email: string,
  phoneNumber: string,
  emailVerified?: boolean,
  updateSignUp?: boolean,
  readonly createdAt?: Date,
  readonly updatedAt?: Date
}

export type PublicUser = Omit<DBUser, "password" | "updateSignUp">
