import "./MyFavorites.css"
import { useEffect, useState } from "react"
import { client } from "../lib/amplifyClient";
import type { Schema } from "../../amplify/data/resource";
import { getCurrentUser } from "aws-amplify/auth";


type Favorite = Schema["Favorite"]["type"];

const MyFavorites = () => {

  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {

    const load = async () => {

      try {

        const user = await getCurrentUser();

        const result = await client.models.Favorite.list({

          filter: {
            userId: {
              eq: user.userId
            }
          }
        });
        setFavorites(result.data);
      } catch (error) {
        console.log("User not logged in", error);
      }

    };
    load();
  }, []);
  return (
    <>
      <div className="container">

        <h1>My Favorites</h1>

        {favorites.length === 0 ? (

          <div>No Favorites...</div>

        ) : (

          favorites.map((fav) => (
            <div key={fav.animeId}>
              {fav.title}
            </div>
          ))

        )}

      </div>
    </>
  )
}

export default MyFavorites