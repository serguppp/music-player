"use client"
import { useEffect } from "react"
import Button from "./Button";
import { X } from "lucide-react";
import { useState } from "react";
import AuthForm from "./AuthForm";
import { useAuth } from "@/hooks/useAuth";

export default function Login(){
  const {toggleLogin} = useAuth();

    useEffect(() => {
        document.body.classList.add("overflow-hidden");

        return () => {
            document.body.classList.remove("overflow-hidden");
        }
    }, []);

    const [mode, setMode] = useState<string>("login");
    const navItems = [
        { id: "login", label: "Log in"},
        { id: "register", label: "Sign up"}
    ];

    return (
        <div className="fixed w-screen h-screen flex items-center backdrop-blur-sm justify-center z-150  ">
            <div className="w-11/12 h-1/2 lg:w-1/2 md:h-1/2 rounded-2xl shadow-[0_0_20px_#ee10b0] bg-black/60 border border-normal-pink/60 flex relative flex-col">
                <div className="absolute top-4 right-4 ">
                    <Button raw variant = "outline_pink" Icon={X} onClick={toggleLogin} className="rounded-xl cursor-pointer "></Button>
                </div>

                <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-x-8 "> 
                    {navItems.map(({id, label})=> (
                        <Button key={id} onClick={()=>setMode(id)} raw variant="state" className={`transition-transform ${mode===id ? "scale-150 underline text-normal-pink":"hover:scale-125 text-white"}`}>{label}</Button>
                    ))}
                </div>
                <div className="flex flex-1 items-center justify-center ">
                    <AuthForm mode={mode}/>
                </div>
            </div>
        </div>

    )
}