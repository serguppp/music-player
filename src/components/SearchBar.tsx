'use client'

import { useState } from "react"
import { Track } from '@/app/types';

export default function SearchBar(){
        const [query, setQuery] = useState<string>('');
        const [results, setResults] = useState<Track[]>([]);
        const [activeSongUrl, setActiveSongUrl] = useState<string>('');
    
        const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            if (!query) return;
    
            const response = await fetch(`/api/search?q=${query}`);
            const data = await response.json();
            setResults(data.data || []);
        }
    
        return(
            <div style={{ padding: '20px', color: 'white', background: '#121212' }}>
                <form onSubmit={handleSearch}>
                    <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Szukaj artysty lub utworu..."
                    style={{ color: 'white', padding: '8px' }}
                    />
                    <button type="submit" style={{ marginLeft: '8px', padding: '8px' }}>
                    Szukaj
                    </button>
                </form>
    
                <ul style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
                    {results.map((track) => (
                    <li key={track.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <img src={track.album.cover_small} alt="okładka" />
                        <div style={{ marginLeft: '10px' }}>
                        <strong>{track.title}</strong> - {track.artist.name}
                        </div>
                        <button onClick={() => setActiveSongUrl(track.preview)} style={{ marginLeft: 'auto' }}>
                        Odtwórz próbkę
                        </button>
                    </li>
                    ))}
                </ul>
    
                {activeSongUrl && (
                    <audio
                    key={activeSongUrl}
                    controls
                    autoPlay
                    src={activeSongUrl}
                    style={{ position: 'fixed', bottom: 0, left: 0, width: '100%' }}
                    >
                    Twoja przeglądarka nie obsługuje audio.
                    </audio>
                )}
            </div>
        );
}