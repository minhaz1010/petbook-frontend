// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { likeAPost } from "@/services/post/post.services";
// import { getQueryClient } from "@/utils/getQueryClient";
// import { useMutation } from "@tanstack/react-query";

// export const useLikeAPost = () => {
//   const queryClient = getQueryClient();

//   return useMutation({
//     mutationKey: ["LIKED_A_POST"],
//     mutationFn: async (postId: string) => await likeAPost(postId),
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["POSTS"] });
//     },
//   });
// };
import { likeAPost } from "@/services/post/post.services";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { IPost } from "@/types";

export const useLikeAPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["LIKED_A_POST"],
    mutationFn: async (postId: string) => await likeAPost(postId),
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
                  ? { ...post, likes: post.likes + 1, likedBy: [...post.likedBy, "currentUserId"] }
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