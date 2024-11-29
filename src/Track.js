import React from 'react';

const Track = ({ song }) => {
    const { title, artist, duration, genre } = song;
    return (
        <div style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
           <h2>{title}</h2> 
           <p><strong>Artist:</strong> {artist}</p>
           <p><strong>Duration:</strong> {duration}</p>
           <p><strong>Genre:</strong> {genre}</p>
        </div>
    )
}

export default Track;