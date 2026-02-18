import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAnimeById } from "../api/animeService"; 
import type { BannerAnime } from "../api/animeService";
import "./AnimeShow.css"
import { client } from "../lib/amplifyClient";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { getCurrentUser } from "aws-amplify/auth"

const AnimeShow = () => {
  const { id } = useParams<{ id: string }>();

  const [anime, setAnime] = useState<BannerAnime | null>(null);
  const [favoriteKey, setFavoriteKey] = useState<{
    userId: string;
    animeId: number;
  } | null>(null);
  const [isToggling, setIsToggling] = useState(false);

  useEffect(() => {

    if (!id) return;

    getAnimeById(id)
      .then(setAnime)
      .catch(console.error);

  }, [id]);

  useEffect(() => {

    if (!anime) return;
    

    const checkFavorite = async () => {

      const user = await getCurrentUser();

      const result = await client.models.Favorite.list({

        filter: {
          userId: {
            eq: user.userId
          },
          animeId: {
            eq: anime.mal_id
          }
        }
      });

      if (result.data.length > 0) {
        setFavoriteKey({
          userId: result.data[0].userId,
          animeId: result.data[0].animeId
        });
      }
    };
    checkFavorite();
  }, [anime]);

  const toggleFavorite = async () => {

    if (!anime || isToggling) return; 

    setIsToggling(true); 

    try {
    
      const user = await getCurrentUser();

      if (favoriteKey) {
        await client.models.Favorite.delete({
          userId: favoriteKey!.userId,
          animeId: favoriteKey!.animeId
        });

        setFavoriteKey(null);

      } else {

        const result = await client.models.Favorite.create({
          userId: user.userId,
          animeId: anime.mal_id,
          title: anime.title_japanese,
          imageUrl: anime.image
        });

        if (result.data) {
          setFavoriteKey({
            userId: result.data.userId,
            animeId: result.data.animeId
          });
        }
      }
    } finally {

      setIsToggling(false);

    }
  };

  if (!anime) {
    return <p>Loading...</p>;
  }

    
  return (
    <div className="anime-show">
      <div className="anime-image">
        <img src={anime.image} alt={anime.title_japanese} />
        <div className="favorite-btn" onClick={toggleFavorite} >
          {favoriteKey ? (
            <FaHeart color="#E57373" size={30} />
          ) : (
            <FaRegHeart color="gray" size={30} />
          )}
        </div>
      </div>
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
    </div>
  );
};

export default AnimeShow;
