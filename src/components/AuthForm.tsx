"use client"

import { useState } from "react";
import Button from "./Button";

type Props = {
  mode: string;
};

export default function AuthForm({ mode }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "login") {
      console.log("Logowanie:", email, password);
      // fetch api/login
    } else if (mode=== "register") {
      console.log("Rejestracja:", email, password);
      // fetch api/register
    } else return;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-8 md:max-w-sm  lg:mx-auto flex flex-col gap-4 text-white"
    >
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
