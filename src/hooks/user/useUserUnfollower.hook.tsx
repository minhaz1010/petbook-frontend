import { unfollowAUser } from "@/services/user/user.services"
import { getQueryClient } from "@/utils/getQueryClient"
import { useMutation } from "@tanstack/react-query"

export const useUserUnfollow = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["UNFOLLOW_A_USER"],
    mutationFn: async (followerId: string) => await unfollowAUser(followerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["POSTS"] })
    }
  })
}