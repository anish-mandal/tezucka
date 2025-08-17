import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Tezucka</h1>
      <div>
        <Link href="/auth/signup">Sign Up</Link>
        <Link href="/auth/login">Log In</Link>
      </div>
    </div>
  );
}
