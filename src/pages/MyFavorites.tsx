import { useEffect, useState } from "react"
import { client } from "../lib/amplifyClient";
import type { Schema } from "../../amplify/data/resource";

type Favorite = Schema["Favorite"]["type"];

const MyFavorites = () => {

  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const load = async () => {

      const result = await client.models.Favorite.list();

      setFavorites(result.data);
    };

    load();
  }, []);
  return (
    <>
      <div>

        <h1>My Favorites</h1>

        {favorites.map((fav: any) => (

          <div key={fav.id}>
            {fav.title}
          </div>

        ))}

      </div>
    </>
  )
}

export default MyFavorites