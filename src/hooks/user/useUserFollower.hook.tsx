import { followAUser } from "@/services/user/user.services"
import { getQueryClient } from "@/utils/getQueryClient"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";


export const useUserFollower = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["FOLLOW_A_USER"],
    mutationFn: async (followerId: string) => await followAUser(followerId),
    onSuccess: () => {
      toast.success("You followed the pet lover")
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
    }
  })
}

