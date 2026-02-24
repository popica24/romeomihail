import { useQuery } from "@tanstack/react-query";
import { getAlbums } from "../services/api";

export const useAlbumsQuery = (categorySlug?: string) => {
  return useQuery({
    queryKey: ["albums", categorySlug],
    queryFn: () => getAlbums(categorySlug), 
    enabled: !!categorySlug,
  });
};