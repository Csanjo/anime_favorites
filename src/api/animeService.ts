import jikanApi from "./axios";

type JikanAnime = {
  mal_id: number;
  title_japanese: string;
  synopsis: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  aired: {
    from: string | null; 
  };
  genres: { name: string }[];
  url: string;
};

export type BannerAnime = {
  mal_id: number;
  title_japanese: string;
  image: string;
  synopsis: string;
  airedFrom?: string | null;
  genres?: string[];
  malUrl?: string;
};

export type AnimeGenre = {
  mal_id: number;
  name: string
}

export const getAnimeById = async (id: string | number): Promise<BannerAnime> => {
  const res = await jikanApi.get(`/anime/${id}`);
  const anime = res.data.data;

  return {
    mal_id: anime.mal_id,
    title_japanese: anime.title_japanese,
    image: anime.images.jpg.large_image_url,
    synopsis: anime.synopsis || "No description available",
    airedFrom: anime.aired.from,
    genres: anime.genres.map((g: { name: string }) => g.name),
    malUrl: anime.url,
  };
};


export const getRandomAnime = async (): Promise<BannerAnime> => {
  const res = await jikanApi.get<{ data: JikanAnime }>("/random/anime");

  const anime = res.data.data;

  return {
    mal_id: anime.mal_id,
    title_japanese: anime.title_japanese,
    image: anime.images.jpg.large_image_url,
    synopsis: anime.synopsis || "No description available",
    airedFrom: anime.aired.from,
    genres: anime.genres.map((g: { name: string }) => g.name),
    malUrl: anime.url,
  };
};

export const getAnimeGenres = async(): Promise<AnimeGenre[]> => {
  const res = await jikanApi.get("/genres/anime")
  return res.data.data
}