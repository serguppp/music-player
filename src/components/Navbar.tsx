'use client'

import { useState } from "react"
import { useRouter } from "next/navigation";
import { Menu, Search } from "lucide-react";


export default function Navbar(){
    const [query, setQuery] = useState<string>('');
    const router = useRouter();

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!query) return;

        router.push(`/search?q=${encodeURIComponent(query)}`);
    }

    //FIXME: hamburger button
    return(
        <header className="fixed self-center z-1 lg:ml-64 p-3 flex ">
            <div>
                <button className="hidden" onClick={()=>{}}>
                    <Menu className="w-6 h-6" />
                </button>
            </div>
            <div className="relative ">
                <form onSubmit={handleSearch}>
                    <Search className="absolute ml-2 left-0 top-1/2 transform -translate-y-1/2  w-5 h-5" />
                    <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search for music, artists...`}
                        className="text-white pl-10 pr-4 py-2 h-10 w-full rounded-xl bg-background outline-1 outline-normal-pink hover:bg-card-hover transition-all duration-300"/>

                </form>
            </div>
        </header>
        
    );
}