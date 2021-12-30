import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Center = () => {
  const { data: session } = useSession();
  const spotifyApi = useSpotify();

  const [color, setColor] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);

  // recoil state
  const selectedPlaylistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    setColor(shuffle(colors).pop());
  }, [selectedPlaylistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(selectedPlaylistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => {
        console.log("Something went wrong!, ", err);
      });
  }, [spotifyApi, selectedPlaylistId]);

  return (
    <div className="flex-grow text-white h-screen overflow-y-scroll">
      <header className="absolute top-5 right-8 space-y-2">
        <div
          className="flex items-center w-50 bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
          onClick={() => setMenuVisible(!menuVisible)}
        >
          <img
            className="rounded-full w-10 h-10"
            src={session?.user.image}
            alt=""
          />
          <h2>{session?.user.name}</h2>
          {!menuVisible ? (
            <ChevronDownIcon className="h-5 w-5" />
          ) : (
            <ChevronUpIcon className="h-5 w-5" />
          )}
        </div>
        {menuVisible && (
          <div className="flex flex-col justify-evenly p-1 bg-black w-50 h-32 rounded-lg">
            <p className="menu-btn">Account</p>
            <p className="menu-btn">Profile</p>
            <p className="menu-btn" onClick={() => signOut()}>
              Logout
            </p>
          </div>
        )}
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}
      >
        <img
          src={playlist?.images?.[0].url}
          alt=""
          className="h-44 w-44 shadow-2xl"
        />
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">
            {playlist?.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
