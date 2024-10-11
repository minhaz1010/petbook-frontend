import { dislikeAComment } from "@/services/comment/comment.services";
import { getQueryClient } from "@/utils/getQueryClient";
import { useMutation } from "@tanstack/react-query";


export const useDislikeAComment = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["DISLIKE_A_COMMENT"],
    mutationFn: async (commentId: string) => await dislikeAComment(commentId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_COMMENTS"] });
    }
  })
}