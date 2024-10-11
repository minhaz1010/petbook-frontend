/* eslint-disable @typescript-eslint/no-explicit-any */
import { likeAPost } from "@/services/post/post.services";
import { getQueryClient } from "@/utils/getQueryClient";
import { useMutation } from "@tanstack/react-query";

export const useLikeAPost = () => {
  const queryClient = getQueryClient();

  return useMutation({
    mutationKey: ["LIKED_A_POST"],
    mutationFn: async (postId: string) => await likeAPost(postId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["POSTS"] });
    },
  });
};