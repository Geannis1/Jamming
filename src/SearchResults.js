import React from 'react';
import Track from './Track';

const SearchResults = ({ filteredTracks, addTrack }) => {
    return (
        <div>
           {filteredTracks.length > 0 ? (
            filteredTracks.map((track, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Track song={track} />
                    <button onClick={() => addTrack(track)} style={{ marginLeft: '10px' }}>
                        +
                    </button>
                </div>
            ))
           ) : (
            <p>No results found.</p>
           )}
        </div>
    )
};

export default SearchResults;