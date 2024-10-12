// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { dislikeAPost } from "@/services/post/post.services";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const useDislikeAPost = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationKey: ["DISLIKED_A_POST"],
//     mutationFn: async (postId: string) => await dislikeAPost(postId),
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["POSTS"] });
//     },
//   });
// };

import { dislikeAPost } from "@/services/post/post.services";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IPost } from "@/types";

export const useDislikeAPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["DISLIKED_A_POST"],
    mutationFn: async (postId: string) => await dislikeAPost(postId),
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ["POSTS"] });
      const previousData = queryClient.getQueryData<{ pages: { data: { result: IPost[] } }[] }>(["POSTS"]);

      queryClient.setQueryData<{ pages: { data: { result: IPost[] } }[] }>(["POSTS"], (old) => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              result: page.data.result.map((post) =>
                post._id === postId
                  ? { ...post, dislikes: post.dislikes + 1, dislikedBy: [...post.dislikedBy, "currentUserId"] }
                  : post
              ),
            },
          })),
        };
      });

      return { previousData };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(["POSTS"], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["POSTS"] });
    },
  });
};