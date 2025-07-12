import { isAlbum, isTrack, isTrackArray } from '@/utils/typeGuards';
import { usePlayer } from './usePlayer';
import { ItemTypes, Track } from '@/types/types';

  // FIXME: add artists, playlists, queue -> in playerContext

export function usePlayback() {
  const { playTrack } = usePlayer();

  const playSingleTrack = (track: Track, tracklist?: Track[])=>{
    return (e: React.MouseEvent)=>{
      e.stopPropagation();
      playTrack(track);
    }
  }

  const playTracklist = (tracks: Track[]) =>{
    return (e: React.MouseEvent) =>{
      e.stopPropagation();
      if(tracks && tracks.length>0){
        playTrack(tracks[0], tracks);
      }
    }
  }
  return { playSingleTrack, playTracklist };
}