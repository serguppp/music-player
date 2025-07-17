"use client"

import { createContext, useState, ReactNode } from "react"
import Login from "@/components/Login";

type AuthContextType = {
    showLogin: boolean;
    toggleLogin: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children} : {children: ReactNode}){
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const toggleLogin = () => setShowLogin(prev => !prev);

    return (
        <AuthContext.Provider value = {{showLogin, toggleLogin}}>
            {children}
             {showLogin && <Login />}
        </AuthContext.Provider>
    );

}