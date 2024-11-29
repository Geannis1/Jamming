import React, { useState } from 'react';
import './App.css';
import { tracks } from './Tracklist';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const filteredTracks = tracks.filter((track) =>
    track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    track.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.find((t) => t.title === track.title)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  }

  const saveToSpotify = () => {
    alert(`Saving ${playlistName} to Spotify with ${playlistTracks.length} tracks.`)

    setPlaylistTracks([]);
  }

  return (
    <div className="app-container">
      <h1 className="jamming">Jamming</h1>
      {/* Search Bar */}
      <div className="search-bar-container">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="search-results-container">
          <h2>Search Results</h2>
          <SearchResults filteredTracks={filteredTracks} addTrack={addTrackToPlaylist} />
        </div>
        <div className="playlist-container">
          <h2>Playlist</h2>
          <Playlist 
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            playlistTracks={playlistTracks}
            saveToSpotify={saveToSpotify}
          />
        </div>
      </div>
    </div>
  );
}

export default App;