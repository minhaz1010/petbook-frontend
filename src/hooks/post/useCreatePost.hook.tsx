/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPost } from "@/services/post/post.services";
import { getQueryClient } from "@/utils/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreatePost = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData: any) => await createPost(postData),
    onSuccess: () => {
      queryClient.cancelQueries({ queryKey: ["POSTS"] });
      toast.success("Post Created Successfully");
    },
    onError: (error) => {
      toast.error(error.message)
    }
  });
};
