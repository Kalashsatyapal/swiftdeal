"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.user?.role === "admin") {
      localStorage.setItem("admin", JSON.stringify(data.user));
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.id) {
      alert("Signup successful. Please login.");
      setIsLogin(true); // Toggle to login after successful signup
    } else {
      alert("Error signing up. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300">
        <h2 className="text-center text-4xl font-extrabold text-gray-900">
          {isLogin ? "Admin Login" : "Create Admin Account"}
        </h2>

        {/* Form */}
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={isLogin ? handleLogin : handleSignup}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-lg font-medium"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          {/* Toggle between login and signup */}
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
