import { useQueries } from "@tanstack/react-query";
import { getAlbums, type Album } from "../services/api";

export const useFeaturedAlbumsQuery = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["featured-albums", "nunta"],
        queryFn: () => getAlbums("nunta"),
      },
      {
        queryKey: ["featured-albums", "botez"],
        queryFn: () => getAlbums("botez"),
      },
      {
        queryKey: ["featured-albums", "trash-the-dress"],
        queryFn: () => getAlbums("trash-the-dress"),
      },
    ],
  });

  const [nuntaQuery, botezQuery, trashQuery] = results;

  const getResults = (data: Array<Album> | undefined) => {
    if (!data) return [];
    if (data && data.length > 0) return data.slice(0, 3);
    return [];
  };

  return {
    albums: {
      nunta: getResults(nuntaQuery.data),
      botez: getResults(botezQuery.data),
      "trash-the-dress": getResults(trashQuery.data),
    },
    loading: results.some((q) => q.isLoading),
    error: results.find((q) => q.error)?.error,
  };
};