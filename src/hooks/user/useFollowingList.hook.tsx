import { detailsOfAUser } from "@/services/user/user.services"
import { useQuery } from "@tanstack/react-query"

export const useFollowingList = () => {
  return useQuery({
    queryKey: ["FOLLOWING", "FOLLOWER"],
    queryFn: async () => await detailsOfAUser(),
    refetchOnMount: 'always',
    staleTime: 1000,
    refetchOnWindowFocus: false,
  })
}