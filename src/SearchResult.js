import React from 'react';
import Track from './Track';

const SearchResult = ({ filteredTracks, addTrack }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {filteredTracks.length > 0 ? (
        filteredTracks.map((track) => (
          <div
            key={track.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #ccc',
            }}
          >
            {/* Render Track Details */}
            <Track song={track} />

            {/* Add to Playlist Button */}
            <button
              onClick={() => addTrack(track)}
              style={{
                marginLeft: '10px',
                padding: '5px 10px',
                fontSize: '14px',
                backgroundColor: '#1DB954',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>
        ))
      ) : (
        <p>No results found. Try a different search term.</p>
      )}
    </div>
  );
};

export default SearchResult;