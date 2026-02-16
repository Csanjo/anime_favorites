import { useEffect, useState } from "react"
import { getAnimeGenres } from "../api/animeService"
import type { AnimeGenre } from "../api/animeService"

const GenreShow = () => {
  const [genres, setGenres] = useState<AnimeGenre[]>([])

  useEffect(() => {
    getAnimeGenres()
      .then(setGenres)
      .catch(console.error)
  }, []);

  if (!genres) return <p>Loading Content...</p>;

  return (
    <>
    <div className="genre-list">
      <h2>ジャンル一覧</h2>
        {genres.map((genre) =>(
          <p key={genre.mal_id}>{genre.name}</p>
        ))}
    </div>
    </>
  )
}

export default GenreShow