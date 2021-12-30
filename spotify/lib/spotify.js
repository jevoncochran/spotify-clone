import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
].join(",");

const params = {
  scope: scopes,
};

const queryParamString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };

// https://accounts.spotify.com/authorize?client_id=812312551734407ca6eb8bd0d7258d27&scope=user-read-email%2Cplaylist-read-private%2Cplaylist-read-collaborative%2Cstreaming%2Cuser-read-private%2Cuser-library-read%2Cuser-top_read%2Cuser-read-playback-state%2Cuser-read-currently-playing%2Cuser-read-recently-played%2Cuser-follow-read&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3002%2Fapi%2Fauth%2Fcallback%2Fspotify&state=E8AIkLv_6XChpGoIVxJpTy6Z0GSIjCdo5OZJE0iE7JQ
