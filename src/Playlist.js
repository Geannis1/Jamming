import React from 'react';
import Track from './Track';

const Playlist = ({ playlistName, setPlaylistName, playlistTracks, saveToSpotify }) => {
return (
    <div>
        <input 
            type="text"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
            style={{
                display: 'block',
                marginBottom: '20px',
                padding: '10px',
                fontSize: '16px',
                width: '100%'
            }}
        />

        <div>
            {playlistTracks.length > 0 ? (
                playlistTracks.map((track, index) => 
                    <Track key={index} song={track} />
                )
            ) : (
                <p>Your playlist is empty.</p>
            )}
        </div>

        <button
            onClick={saveToSpotify}
            style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#1DB954',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%'
            }}
        >
            Save to Spotify
        </button>
    </div>
)}

export default Playlist;