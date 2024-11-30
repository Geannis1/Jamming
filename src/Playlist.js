import React from 'react';
import Track from './Track';

const Playlist = ({
  playlistName,
  setPlaylistName,
  playlistTracks,
  saveToSpotify,
  removeTrack,
}) => {
  return (
    <div>
      {/* Playlist Name Input */}
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        style={{
          display: 'block',
          marginBottom: '20px',
          padding: '10px',
          fontSize: '16px',
          width: '100%',
        }}
      />

      {/* Playlist Tracks */}
      <div>
        {playlistTracks.length > 0 ? (
          playlistTracks.map((track, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Track song={track} />
              <button
                onClick={() => removeTrack(track)}
                style={{
                  marginLeft: '10px',
                  padding: '5px 10px',
                  fontSize: '14px',
                  backgroundColor: '#ff4d4d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>The playlist "{playlistName}" has no tracks.</p>
        )}
      </div>

      {/* Save to Spotify Button */}
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
        }}
      >
        Save to Spotify
      </button>
    </div>
  );
};

export default Playlist;