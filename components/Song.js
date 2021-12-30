import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

const Song = ({ order, item }) => {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);

  const playSong = () => {
    setCurrentTrackId(item.track.id);
    setIsPlaying(true);
    spotifyApi.play({
      uris: [item.track.uri], // stands for uniform resource identifier
    });
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={item.track.album.images[0].url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 truncate text-white">{item.track.name}</p>
          <p className="w-40">{item.track.artists[0].name}</p>
        </div>
      </div>

      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="hidden md:inline w-40">{item.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(item.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
