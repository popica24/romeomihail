import { useQuery } from "@tanstack/react-query";
import { getAlbum } from "../services/api";

export const useAlbumQuery = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["album", slug],
    queryFn: () => getAlbum(slug!),
    enabled: !!slug,
  });
};