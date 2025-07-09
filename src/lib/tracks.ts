import { Track } from "@/types/types";
import { fetchItemByID } from "@/lib/data";

export async function getFullTrackDetails(tracks : Track[]) : Promise<Track[]>{
    const result = tracks ? (
        await Promise.all(
            tracks.map((track) => fetchItemByID("track", track.id)))).filter((t): t is Track => t !== null && t.type === "track")
            : [];
    return result;
}