import { queries } from "@/queries";
import { useQuery } from "@tanstack/react-query";

export const useFetchUserById = (userId: string) => {
  return useQuery(queries.social.fetchUserById(userId));
};

export const useGetUserByUsername = (username: string, pageSize: number, pageNumber: number) => {
  return useQuery(queries.social.getUserByUsername(username, pageSize, pageNumber));
}