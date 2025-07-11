'use client'

import Button from '@/components/Button'
import { House, Compass, Disc, MicVocal, Clock, History, Heart, ListMusic, Settings, User } from 'lucide-react'

export default function Sidebar(){
    return(
        <aside className="bg-background h-full z-2 w-64 py-8 px-16 hidden lg:grid lg:justify-items-center fixed top-0 left-0
            after:content-[''] 
            after:absolute 
            after:top-0 
            after:right-0 
            after:h-full 
            after:w-0.5 
            after:bg-normal-pink
            after:shadow-[8px_0px_20px_1px_#ec489980] ">
            <div className="">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-normal-pink to-normal-blue bg-clip-text text-transparent mb-12">
                    Melodies
                </h1>

                <h6 className="text-xs font-semibold text-normal-pink mb-4">
                    Menu
                </h6>

                <nav className="flex flex-col space-y-6 mb-4">
                    <Button active variant="side_bar" href="/" Icon={House}>Home</Button>
                    <Button active variant="side_bar" href="/discover" Icon={Compass} >Discover</Button>
                    <Button active variant="side_bar" href="/albums" Icon={Disc}>Albums</Button>
                    <Button active variant="side_bar" href="/artists" Icon={MicVocal}>Artists</Button>
                </nav>

                <h6 className="text-xs font-semibold text-normal-pink mb-4">
                    Library
                </h6>

                <nav className="flex flex-col space-y-6 mb-4">
                    <Button active variant="side_bar" href="/recentlyadded" Icon={Clock}>Recently added</Button>
                    <Button active variant="side_bar" href="/mostplayed" Icon={History}>Most played</Button>
                    <Button active variant="side_bar" href="/favourites" Icon={Heart}>Your favourites</Button>
                    <Button active variant="side_bar" href="/playlists" Icon={ListMusic}>Your playlists</Button>
                </nav>

                <h6 className="text-xs font-semibold text-normal-pink mb-4">
                    General
                </h6>

                <nav className="flex flex-col space-y-6 mb-4">
                    <Button active variant="side_bar" href="/settings" Icon={Settings}>Settings</Button>
                    <Button active variant="side_bar" href="/account" className="text-normal-pink" Icon={User}>Account</Button>
                </nav>

            </div>
        </aside>

    );
}