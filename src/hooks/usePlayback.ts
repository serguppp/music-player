import { isAlbum, isTrack } from '@/utils/typeGuards';
import { usePlayer } from './usePlayer';
import { ItemTypes } from '@/types/types';

export function usePlayback() {
  const { playTrack } = usePlayer();

  const startPlayback = (item: ItemTypes) => {
    return (e: React.MouseEvent) =>{
      e.stopPropagation();

      if (isTrack(item)) {
        playTrack(item);
      } else if (isAlbum(item) && item.tracks && item.tracks.data.length > 0) {
        playTrack(item.tracks.data[0]);
      }
      // FIXME: add artists, playlists, queue -> in playerContext
    }

  };

  return { startPlayback };
}