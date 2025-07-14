'use client';

import { usePlayer } from '@/hooks/usePlayer';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';

export default function AudioBar() {
  const { currentTrack, isPlaying, togglePlay, volume, setVolume, duration, currentTime, seek, playNext, playPrevious } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  // FIXME: move to utils
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <footer className="fixed bottom-0  left-0 lg:left-64 right-0 h-20 bg-card p-4 z-10 flex items-center justify-between border-t border-normal-pink">
      {/* Track info */}
      <div className="flex items-center gap-4 w-1/4">
        <Image src={currentTrack.album.cover_xl} alt={currentTrack.title} width={64} height={64} className="rounded-md" />
        <div>
          <h3 className="font-semibold text-white truncate">{currentTrack.title}</h3>
          <p className="text-sm text-gray-400 truncate">{currentTrack.artist.name}</p>
        </div>
      </div>

      {/* Track controls and timebar
      FIXME: range input lagging */}
      <div className="flex flex-col items-center gap-1 w-1/2">
        <div className="flex items-center gap-6 ">
          <button onClick={playPrevious}className="text-normal-blue hover:scale-105 transition cursor-pointer"><SkipBack className="h-5 w-5" /></button>
          <button onClick={togglePlay} className="bg-white hover:scale-105 rounded-full p-2 flex items-center justify-center transition cursor-pointer">
            {isPlaying ? <Pause className="h-6 w-6 text-black" /> : <Play className="h-6 w-6 text-black" />}
          </button>
          <button onClick={playNext} className="text-normal-blue hover:scale-105 transition cursor-pointer"><SkipForward className="h-5 w-5" /></button>
        </div>
        <div className="w-full flex items-center gap-2">
            <span className="text-xs text-gray-400">{formatTime(currentTime)}</span>
            <input type="range" min="0" step="0.01" max={duration} value={currentTime} onChange={(e) => seek(Number(e.target.value))} className="custom-range w-full h-1 bg-white rounded-lg appearance-none cursor-pointer range-sm " />
            <span className="text-xs text-gray-400">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume controls */}
      <div className="flex items-center gap-2 w-1/4 justify-end">
        <button onClick={() => setVolume(volume > 0 ? 0 : 0.5)}>
            {volume > 0 ? <Volume2 className="h-6 w-6 text-white" /> : <VolumeX className="h-6 w-6 text-white" />}
        </button>
        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="custom-range w-24 h-1 bg-white rounded-lg appearance-none cursor-pointer range-sm"/>
      </div>
    </footer>
  );
}