const clientId = '045b5b9b2a8c4bbf9d38d9e77e0e9ab1'; // Replace with your Spotify Client ID
const redirectUri = 'http://localhost:3000'; // Replace with your redirect URI
let accessToken;

const Spotify = {
  // Get the access token
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Clear the token after it expires
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const scope = 'playlist-modify-public playlist-modify-private';
      const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=${encodeURIComponent(
        scope
      )}&redirect_uri=${encodeURIComponent(redirectUri)}`;
      window.location = spotifyAuthUrl;
    }
  },

  // Make a Spotify API request
  async makeRequest(endpoint, method = 'GET', body = null) {
    const token = this.getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, options);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Spotify API request failed');
    }
  },

  // Search for tracks on Spotify
  async search(term) {
    if (!term) {
      throw new Error('Search term is required');
    }

    const response = await this.makeRequest(`/search?type=track&q=${encodeURIComponent(term)}`);
    return response.tracks.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  // Create and save playlist to Spotify
  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      throw new Error('Playlist name and track URIs are required');
    }

    // Step 1: Get the user's ID
    const userResponse = await this.makeRequest('/me');
    const userId = userResponse.id;

    // Step 2: Create a new playlist
    const playlistResponse = await this.makeRequest(`/users/${userId}/playlists`, 'POST', {
      name,
      description: 'Created using Jammming!',
      public: true,
    });
    const playlistId = playlistResponse.id;

    // Step 3: Add tracks to the playlist
    await this.makeRequest(`/playlists/${playlistId}/tracks`, 'POST', {
      uris: trackUris,
    });

    return `Playlist "${name}" saved successfully!`;
  },
};

export default Spotify;