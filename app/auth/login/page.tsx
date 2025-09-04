'use client'

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

interface UserDataLogin {
  email: string,
  password: string
}

export default function Login() {
  const [user, setUser] = useState<UserDataLogin>({
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
  }

  return (
    <>
      <Toaster />
      <div className="h-screen justify-center items-center flex w-full">
        <div className="border border-white p-3 rounded-lg">
          <p className="font-bold m-3">login to tezucka</p>
          <form className="flex flex-col" onSubmit={handleSubmit}>
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
