import React, { useState } from 'react';
import './App.css';
import Spotify from './Spotify';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import Playlist from './Playlist';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [savedPlaylists, setSavedPlaylists] = useState([]);
  const [editingPlaylist, setEditingPlaylist] = useState(null);

  // Handle search functionality
  const handleSearch = async (term) => {
    try {
      const results = await Spotify.search(term);
      setSearchResults(results); // Update search results with Spotify data
    } catch (error) {
      console.error('Error searching Spotify:', error);
    }
  };

  // Add a track to the playlist
  const addTrackToPlaylist = (track) => {
    if (!playlistTracks.find((t) => t.uri === track.uri)) {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  // Remove a track from the playlist
  const removeTrackFromPlaylist = (trackToRemove) => {
    setPlaylistTracks(playlistTracks.filter((track) => track.uri !== trackToRemove.uri));
  };

  // Rename an existing playlist
  const renamePlaylist = (name) => {
    const playlistToEdit = savedPlaylists.find((playlist) => playlist.name === name);
    if (playlistToEdit) {
      setPlaylistName(playlistToEdit.name); // Update the playlist name
      setPlaylistTracks(playlistToEdit.tracks); // Load the tracks for the playlist
      setEditingPlaylist(name); // Set the playlist being edited
    }
  };

  // Save or rename the playlist (Updated function)
  const saveToSpotify = async () => {
    const trackUris = playlistTracks.map((track) => track.uri);
  
    if (trackUris.length === 0) {
      alert('Your playlist is empty. Add some tracks before saving.');
      return;
    }
  
    try {
      const message = await Spotify.savePlaylist(playlistName, trackUris);
      alert(message); // Confirm successful save
      setPlaylistTracks([]); // Clear playlist after saving
    } catch (error) {
      console.error('Error saving playlist to Spotify:', error);
      alert('There was an error saving your playlist to Spotify.');
    }
  };

  return (
    <div className="app-container">
      {/* Search Bar */}
      <div className="search-bar-container">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Search Results */}
        <div className="search-results-container">
          <h2>Search Results</h2>
          <SearchResult
            filteredTracks={searchResults}
            addTrack={addTrackToPlaylist}
          />
        </div>

        {/* Playlist */}
        <div className="playlist-container">
          <h2>Playlist</h2>
          <Playlist
            playlistName={playlistName}
            setPlaylistName={setPlaylistName}
            playlistTracks={playlistTracks}
            saveToSpotify={saveToSpotify}
            removeTrack={removeTrackFromPlaylist}
            savedPlaylists={savedPlaylists}
            renamePlaylist={renamePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;