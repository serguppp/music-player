'use client'

import { createContext, useState, useContext, ReactNode, useRef, useEffect } from 'react';
import { Track } from '@/types/types';

type PlayerContextType = {
    currentTrack : Track | null;
    isPlaying : boolean;
    volume : number;
    duration: number;
    currentTime: number;
    playTrack: (track: Track, trackList?: Track[])=>void;
    togglePlay: () => void;
    setVolume: (volume: number) => void;
    seek: (time:number) => void;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({children} : {children : ReactNode}){
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const audioRef = useRef<HTMLAudioElement>(null);

    // Handle playing 
    useEffect(()=>{
        if(audioRef.current){
            if(isPlaying){
                audioRef.current.play().catch(e => console.error("Playback error: ", e));
            } else{
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    // Handle volume
    useEffect(()=>{
        if(audioRef.current){
            audioRef.current.volume=volume;
        }
    }, [volume]);

    // Functions for player management

    const playTrack = (track : Track)=>{
        setCurrentTrack(track);
        setIsPlaying(true);
    }

    const togglePlay = () => {
        if (currentTrack){
            setIsPlaying(!isPlaying);
        }
    }

    const seek = (time : number) =>{
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }

    const handleTimeUpdate = () => {
        if(audioRef.current){
            setCurrentTime(audioRef.current.currentTime);
        }
    }

    const handleLoadedData = () => {
        if(audioRef.current){
            setDuration(audioRef.current.duration);
        }
    }

    return(
        <PlayerContext.Provider value = {{currentTrack, isPlaying,  volume, duration, currentTime, playTrack, togglePlay, setVolume, seek}}>
            {children}
            <audio ref={audioRef} src={currentTrack?.preview}
                    onTimeUpdate={handleTimeUpdate} onLoadedData={handleLoadedData}/>
        </PlayerContext.Provider>
    )
};