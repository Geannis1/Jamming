import React from 'react';

const Track = ({ song }) => {
  const { title, artist, album } = song;

  return (
    <div style={{ flex: 1 }}>
      <p><strong>{title}</strong></p>
      <p>{artist}</p>
      <p><em>{album}</em></p>
    </div>
  );
};

export default Track;