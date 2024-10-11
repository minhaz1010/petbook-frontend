import { likeAComment } from "@/services/comment/comment.services";
import { getQueryClient } from "@/utils/getQueryClient";
import { useMutation } from "@tanstack/react-query";


export const useLikeAComment = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["LIKE_A_COMMENT"],
    mutationFn: async (commentId: string) => await likeAComment(commentId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_COMMENTS"] });
    }

  })
}