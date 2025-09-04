'use client'

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface UserDateSignUp {
  name: string,
  email: string,
  password: string,
  phoneNumber?: string
}

export default function SignUp() {
  const [user, setUser] = useState<UserDateSignUp>({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  }

  return (
    <>
      <Toaster />
      <div className="h-screen justify-center items-center flex w-full">
        <div className="border border-white p-3 rounded-lg">
          <p className="font-bold m-3">signup to tezucka</p>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                required
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </label>

            <label>
              Password
              <input
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />
            </label>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}
