'use client'

import { createContext, useState, ReactNode, useRef, useEffect } from 'react';
import { Track } from '@/types/types';

type PlayerContextType = {
    currentTrack : Track | null;
    tracklist : Track[];
    isPlaying : boolean;
    volume : number;
    duration: number;
    currentTime: number;
    playTrack: (track: Track, tracklist?: Track[])=>void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: ()=> void;
    setVolume: (volume: number) => void;
    seek: (time:number) => void;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({children} : {children : ReactNode}){
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const [tracklist, setTracklist] = useState<Track[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
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
    
    const playTrack = (track : Track, newTracklist?: Track[])=>{
        if (newTracklist && newTracklist.length > 0){
            const trackIndex = newTracklist.findIndex(t=>t.id === track.id);
            setTracklist(newTracklist);
            setCurrentIndex(trackIndex  !== -1 ? trackIndex : 0);
        }
        else{
            setTracklist([]);
            setCurrentIndex(0);
        }
 
        setCurrentTrack(track);
        setIsPlaying(true);
    }

    const playNext = () => {
        if (tracklist.length === 0 || currentIndex >= tracklist.length -1){
            seek(30); //currentTrack.duration
            if(isPlaying) setIsPlaying(false);
            return;
        }
        const nextIndex = (currentIndex  + 1) % tracklist.length;
        setCurrentIndex(nextIndex);
        setCurrentTrack(tracklist[nextIndex]);
        setIsPlaying(true);
    }

    const playPrevious = () => {
        if (audioRef.current && audioRef.current.currentTime > 3){
            seek(0);
            if(!isPlaying) setIsPlaying(true);
            return;
        } 
        
        if (tracklist.length === 0 || currentIndex <= 0){
            seek(0);
            return;
        } 
        const prevIndex = (currentIndex - 1 + tracklist.length) % tracklist.length;
        setCurrentIndex(prevIndex);
        setCurrentTrack(tracklist[prevIndex]);
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
        <PlayerContext.Provider value = {{currentTrack, tracklist, isPlaying,  volume, duration, currentTime, playTrack, playNext, playPrevious, togglePlay, setVolume, seek}}>
            {children}
            <audio ref={audioRef} src={currentTrack?.preview}
                    onTimeUpdate={handleTimeUpdate} onLoadedData={handleLoadedData}
                    onEnded={playNext}/>
        </PlayerContext.Provider>
    )
};