import { isAlbum, isPlaylist } from '@/utils/typeGuards';
import { usePlayer } from './usePlayer';
import { Album, Artist, Playlist, Track } from '@/types/types';
import { fetchArtistTopTracks, fetchItemByID } from '@/lib/data';

export function usePlayback() {
  const { playTrack } = usePlayer();

  const playSingleTrack = (track: Track)=>{
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

  const playAlbum = (album: Album) => {
    return async (e: React.MouseEvent) =>{
      e.stopPropagation();

      let tracks;
      let fullAlbumData;
      if(!album.tracks){
        fullAlbumData = await fetchItemByID('album', album.id);
        if (fullAlbumData && isAlbum(fullAlbumData)){
          tracks = fullAlbumData.tracks?.data;
        }
      }
      else{
        tracks=album.tracks.data;
      }
 
      if (tracks && tracks.length > 0){
        playTrack(tracks[0],tracks);
      }
    }
  }

  const playArtist = (artist: Artist) => {
    return async (e: React.MouseEvent) =>{
      e.stopPropagation();

      const tracks = await fetchArtistTopTracks(artist.id, 5);
      if (tracks && tracks.length > 0){
        playTrack(tracks[0], tracks);
      }
    }
  }

  const playPlaylist = (playlist: Playlist) =>{
    return async (e: React.MouseEvent) =>{
      e.stopPropagation();

      let tracks;

      if(!playlist.tracks){
        const fullPlaylistData = await fetchItemByID('playlist', playlist.id);
        if (fullPlaylistData && isPlaylist(fullPlaylistData)){
          tracks = fullPlaylistData.tracks?.data;
        }
        
      }
      else{
        tracks=playlist.tracks.data;
      }
      
      if (tracks && tracks.length > 0){
        playTrack(tracks[0],tracks);
      }
    }
  }

  return { playSingleTrack, playTracklist, playAlbum, playArtist, playPlaylist };
}