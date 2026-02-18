import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeById } from "../api/animeService"; 
import type { BannerAnime } from "../api/animeService";
import "./AnimeShow.css"
import { client } from "../lib/amplifyClient";

const AnimeShow = () => {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<BannerAnime | null>(null);

  useEffect(() => {
    if (id) {
      getAnimeById(id)
        .then(setAnime)
        .catch(console.error);
    }
  }, [id]);

  if (!anime) return <p>Loading...</p>;

  const saveFavorite = async () => {
    await client.models.Favorite.create({
      animeId: anime.mal_id,
      title: anime.title_japanese,
      imageUrl: anime.image
    });

    alert("Saved to favorites!");
  };
  
  return (
    <div className="anime-show">
      <img src={anime.image} alt={anime.title_japanese} />
      <h1>{anime.title_japanese}</h1>

      <p>
        <strong>公開日：</strong>{" "}
        {anime.airedFrom ? new Date(anime.airedFrom).toLocaleDateString() : "Unknown"}
      </p>

      <p>詳細</p>
      <p>{anime.synopsis}</p>
      <p>ジャンル</p>
      <p>
        {anime.genres ? anime.genres.join("    ") : "Unknown"}
      </p>

      {anime.malUrl && (
        <p>
          <a href={anime.malUrl} target="_blank" rel="noopener noreferrer">
            ホームページ
          </a>
        </p>
      )}

      <button onClick={saveFavorite}>
        ❤️ Favorite
      </button>
    </div>
  );
};

export default AnimeShow;
