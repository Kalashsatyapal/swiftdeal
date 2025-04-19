// frontend/app/page.js
"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Welcome to Our Shop</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => router.push("/login")}
      >
        Admin Login
      </button>
    </main>
  );
}
