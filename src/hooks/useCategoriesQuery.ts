import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/api";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
  });
};