import jikanApi from "./axios";

export type JikanGenre = {
  mal_id: number;
  name: string;
  type: "anime" | "manga";
};

export type JikanAnime = {
  mal_id: number;
  title: string;

  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
  };

  synopsis: string | null;

  aired: {
    from: string | null; 
    to: string | null;
    string: string; 
  };

  year: number | null;
  season: "spring" | "summer" | "fall" | "winter" | null;

  genres: JikanGenre[];
};

export const getAnimeByGenre = async (genreId: number) => {
  const res = await jikanApi.get<{ data: JikanAnime[] }>("/anime", {
    params: {
      genres: genreId,
      limit: 20,
      order_by: "popularity",
    },
  });

  return res.data.data;
};