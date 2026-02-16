import "./Banner.css";
import { useEffect, useState } from "react";
import { getRandomAnime } from "../api/animeService"; 
import type { BannerAnime } from "../api/animeService";
import { Link } from "react-router-dom";

const Banner = () => {
  const truncate = (text: string, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + "…";
  }
  const [anime, setAnime] = useState<BannerAnime | null>(null);

  useEffect(() => {
    getRandomAnime()
      .then(setAnime)
      .catch(console.error);
  }, []);

  if (!anime) return <p>Loading Banner...</p>;

  return (
    <>
      <Link to={`/anime/${anime.mal_id}` } className="banner-link">
        <div
        className="banner"
        style={{ backgroundImage: `url(${anime.image})` }}
      >
          <div className="content">
            <h1>{anime.title_japanese}</h1>
            <p>{truncate(anime.synopsis)}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Banner