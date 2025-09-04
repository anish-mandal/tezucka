import Link from "next/link"
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tezucka - Auth",
  description: "Authentication for Tezucka Web"
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className="flex justify-center items-center h-screen w-screen"
      >
        <Link href="/" className="absolute top-1 left-3 font-bold text-xl">tezucka</Link>
        {children}
      </div>
  );
}
