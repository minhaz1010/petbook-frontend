import { unfollowAUser } from "@/services/user/user.services"
import { getQueryClient } from "@/utils/getQueryClient"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"


export const useUserUnfollow = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["UNFOLLOW_A_USER"],
    mutationFn: async (followerId: string) => await unfollowAUser(followerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["POSTS"] })
      toast.success("You Unfollowed The Person")
    }
  })
}