import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserById = (userId: string) => {
  return useQuery({ ...queries.social.fetchUserById(userId), enabled: !!userId });
};

export const useFetchProfilePreview = (userId: string) => {
  return useQuery({ ...queries.social.fetchProfilePreview(userId), enabled: !!userId });
};
