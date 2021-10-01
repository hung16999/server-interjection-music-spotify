import React, { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./api";
import { URL_GET_TRACKS_BY_ARTIST, URL_SEARCH } from "./env";
import { DataArtist } from "./types/artist.type";
import { DataTrack } from "./types/track.type";

const imageNull =
  "https://go.labhok.com/assets/camaleon_cms/image-not-found-4a963b95bf081c3ea02923dceaeb3f8085e1a654fc54840aac61a57a60903fef.png";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [artists, setArtists] = useState<DataArtist | null>();
  const [isShow, setIsShow] = useState<boolean>();
  const [isShowTracks, setIsShowTracks] = useState<boolean>();
  const [tracks, setTracks] = useState<DataTrack | null>(null);
  const [sourceAudio, setSourceAudio] = useState("");

  useEffect(() => {
    if (query) {
      getData(URL_SEARCH(query)).then((res) => {
        setArtists(res.data);
      });

      setIsShow(true);
      setIsShowTracks(false);
    } else {
      setArtists(null);
      setTracks(null);
      setIsShow(false);
      setIsShowTracks(false);
    }
  }, [query]);

  const getTracks = (id: string) => {
    getData(URL_GET_TRACKS_BY_ARTIST(id)).then((res) => {
      setTracks(res.data);
      setIsShowTracks(true);
    });
  };

  return (
    <div className="container">
      <div className="text-center">
        <input
          className="mt-3 mb-4"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
          value={query}
        />
      </div>

      <div className="row">
        <div className="col-8 d-flex justify-content-between flex-wrap bg-light">
          {artists !== null &&
            isShow &&
            artists?.artists.items.map((artist) => (
              <div
                key={artist.id}
                className="d-flex flex-column"
                style={{ width: "160px" }}
                onClick={() => getTracks(artist.id)}
              >
                <img
                  src={artist.images[2]?.url || imageNull}
                  width="150px"
                  className="img-thumbnail"
                  alt=""
                />
                <b>Name: {artist.name}</b>
                <p>Popularity: {artist.popularity}</p>
                <p>
                  Genres:{" "}
                  {artist.genres.map((gen) => (
                    <span key={gen}>{gen}, </span>
                  ))}
                </p>
              </div>
            ))}

          {query && artists?.artists.items.length === 0 && (
            <div className="text-danger">No result</div>
          )}
        </div>

        <div className="col-4 bg-dark text-white">
          {tracks !== null && isShowTracks && (
            <div className="d-flex flex-column">
              {tracks?.tracks.map((track) => (
                <div
                  key={track.id}
                  className="d-flex justify-content-between p-2"
                  onClick={() => setSourceAudio(track.preview_url)}
                >
                  <img
                    src={track.album.images[0]?.url || imageNull}
                    width="50px"
                    height="50px"
                    alt=""
                  />
                  <b>{track.name}</b>
                  <p>{track.album.release_date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <audio src={sourceAudio} autoPlay={true} />
    </div>
  );
};

export default App;
