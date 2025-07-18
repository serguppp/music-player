"use client"

import { useState } from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { signIn } from "next-auth/react";

type Props = {
  mode: string;
};

export default function AuthForm({ mode }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()
  const {toggleLogin} = useAuth();
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    //Registration
    try {
      if (mode === 'register') {
        const res = await fetch ('/api/auth/register', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, password}),
        });

        if (!res.ok){
          const body = await res.json();
          setError(body.message || "Registration failed");
          return;
        }
      }

      //Logging in
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok){
        toggleLogin();
        router.refresh();
      } else{
        setError(result?.error || "Invalid credentials");
      }
    } catch(error){
      setError("An unexpected error occurred.");
      console.error(error);
    }
  };

  //FIXME: error not showing; handle error
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-8 md:max-w-sm  lg:mx-auto flex flex-col gap-4 text-white"
    >
      {error && <p className="text-red-500 text-center text-sm mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="bg-zinc-800 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 hover:border-pink-400 transition placeholder-gray-400"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="bg-zinc-800 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 hover:border-pink-400 transition placeholder-gray-400"
      />

      <Button type="submit" raw variant="outline_pink" className="cursor-pointer  absolute bottom-10 w-25 h-9 rounded-lg self-center text-center transition">
        {mode === "login" ? "Log in" : "Sign up"}
      </Button>
    </form>
  );
}
