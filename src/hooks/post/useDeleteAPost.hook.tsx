/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteASinglePost } from "@/services/post/post.services";
import { getQueryClient } from "@/utils/getQueryClient"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export const useDeleteAPost = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["DELETE_A_POST"],
    mutationFn: async (postId: string) => await deleteASinglePost(postId),
    onSuccess: () => {
      toast.success("Successfully Deleted the post")
      queryClient.invalidateQueries({ queryKey: ["POSTS"] })
    }
  })
}