import "./Category.css"
import { useEffect, useState } from "react";
import { getAnimeByGenre } from "../api/animeGenre"; 
import type { JikanAnime } from "../api/animeGenre";

type Props = {
  genreId: number;
  title: string;
}

const SubCategory = ({ genreId, title}: Props) => {
  const [animeList, setAnimeList] = useState<JikanAnime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimeByGenre(genreId)
      .then(setAnimeList)
      .finally(() => setLoading(false))
  }, []);

  if (loading) return <p>Loading {title}...</p>;

  return  (
    <>
      <div className="category-container">
        <h2>{ title }</h2>
        <div className="sub-anime-card-list">
          {animeList.map((anime) => (
              <div key={anime.mal_id} className="sub-anime-card">
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  loading="lazy"
                  className="anime-image"
                />
              </div>
            ))}
          </div>
        </div>
    </>
  )
}

export default SubCategory