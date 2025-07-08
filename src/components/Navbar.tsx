'use client'

import { useState } from "react"
//import { Track } from '@/app/types';
import Button from "./Button";

export default function Navbar(){
        const [query, setQuery] = useState<string>('');
        //const [results, setResults] = useState<Track[]>([]);
        const [activeSongUrl, setActiveSongUrl] = useState<string>('');
    
        const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!query) return;
    
            const response = await fetch(`/api/search?q=${query}`);
            const data = await response.json();
            //setResults(data.data || []);
        }
    
        return(
            <header className="absolute max-w-screen z-10 grid grid-cols-2 lg:grid-cols-3 px-8 py-6 gap-x-8 ">
                <div className="">
                    <form onSubmit={handleSearch}>
                        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for music, artists..."
                               className="text-white p-4 h-8 w-full md:h-12 rounded-xl bg-background"/>
                    </form>
                </div>

                <div className="hidden lg:flex space-x-6 justify-end">
                    <Button variant="text" href="/premium" className="text-base lg:text-xl  justify-center">Premium</Button>
                </div>

                <div className="flex space-x-6">
                    <Button variant="outline_pink" href="/login" className="text-base lg:text-xl justify-center text-normal-pink">Login </Button>
                    <Button variant="fill" href="/signup" className="text-base lg:text-xl justify-center text-center">Sign Up</Button>
                </div>
            </header>
            
        );
}