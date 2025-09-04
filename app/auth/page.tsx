import Link from "next/link";

export default function Auth() {
  return (
    <div>
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/signup">Sign Up</Link>
    </div>
  );
}
