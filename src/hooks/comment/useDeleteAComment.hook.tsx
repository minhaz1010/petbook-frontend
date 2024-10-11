import { deleteCommentsOfAPost } from "@/services/comment/comment.services";
import { getQueryClient } from "@/utils/getQueryClient"
import { useMutation } from "@tanstack/react-query"

export const useDeleteAComment = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["DELETE_A_COMMENT"],
    mutationFn: async (postId: string) => deleteCommentsOfAPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_COMMENTS"] })
    }
  })
}