import { fetchArtistAlbums, fetchArtistTopTracks, fetchItem, fetchItemByID, fetchItems, fetchNewAlbums, fetchTopItems } from "@/lib/data";
import { ItemTypes } from "@/types/types";
import { useQueries, useQuery } from "@tanstack/react-query";

export function useItem(type: "track" | "artist" | "playlist" | "album", name:string){
    return useQuery({
        queryKey: ['item', type, name],
        queryFn: () => fetchItem(type, name),
    });
}

export function useItems(type: "track" | "artist" | "playlist" | "album", name:string, limit:number){
    return useQuery({
        queryKey: ['items', type, name, limit],
        queryFn: () => fetchItems(type, name, limit),
    });
}

export function useItemByID(type: "track" | "artist" | "playlist" | "album", id: string){
    return useQuery({
        queryKey: ['itemByID', type, id],
        queryFn: () => fetchItemByID(type, id),
    });
}

export function useTopItems(type: "tracks" | "artists" | "playlists" | "albums", limit: number) {
  return useQuery({
    queryKey: ['topItems', type, limit],
    queryFn: () => fetchTopItems(type, limit),
  });
}

export function useNewAlbums(limit: number) {
    return useQuery({
        queryKey: ['newAlbums', limit],
        queryFn: () => fetchNewAlbums(limit),
    });
}

export function useArtistTopTracks(id: string, limit: number) {
    return useQuery({
        queryKey: ['artistTopTracks', id, limit],
        queryFn: () => fetchArtistTopTracks(id, limit),
    });
}

export function useArtistAlbums(id: string) {
    return useQuery({
        queryKey: ['artistAlbums', id],
        queryFn: () => fetchArtistAlbums(id),
    });
}

export function useItemDetails(items: ItemTypes[], type:string){
    const results = useQueries({
        queries: (items ?? []).map(item =>{
            return {
                queryKey: ['detailedItemByID', type, item.id],
                queryFn: () => fetchItemByID(type, item.id),
                enabled: !!items && items.length > 0,
                
            }
        })
    })
    
    const data = results.map(result => result.data).filter(Boolean) as ItemTypes[];
    const isLoading = results.some(result => result.isLoading);
    const isError = results.some(result => result.isError);

    return {data, isLoading, isError};
}