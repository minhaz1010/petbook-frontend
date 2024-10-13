/* eslint-disable @typescript-eslint/no-explicit-any */

import { dislikeAPost } from "@/services/post/post.services";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDislikeAPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["DISLIKED_A_POST"],
    mutationFn: async (postId: string) => await dislikeAPost(postId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["POSTS"] });
    },
  });
};
