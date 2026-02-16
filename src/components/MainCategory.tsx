import "./Category.css"
import { useEffect, useState } from "react";
import { getAnimeByGenre } from "../api/animeGenre"; 
import type { JikanAnime } from "../api/animeGenre";
import { Link } from "react-router-dom"

const MainCategory = () => {
  const [animeList, setAnimeList] = useState<JikanAnime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimeByGenre(1)
      .then(setAnimeList)
      .finally(() => setLoading(false))
  }, []);

  if (loading) return <p>Loading アクション...</p>;

  return  (
    <>
      <div className="category-container">
        <h2>アクション</h2>
        <div className="anime-card-list">
          {animeList.map((anime) => (
              <div key={anime.mal_id} className="anime-card">
                <Link to={`/anime/${anime.mal_id}`}>
                  <img
                    src={anime.images.jpg.image_url}
                    alt={anime.title}
                    loading="lazy"
                    className="anime-image"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
    </>
  )
}

export default MainCategory