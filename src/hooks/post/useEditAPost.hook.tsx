/* eslint-disable @typescript-eslint/no-explicit-any */
import { editASinglePost } from "@/services/post/post.services";
import { getQueryClient } from "@/utils/getQueryClient"
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


export const useEditAPost = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["EDIT_A_POST"],
    mutationFn: async (payload: any) => await editASinglePost(payload),
    onSuccess: () => {
      toast.success("Successfully edited the post")
      queryClient.invalidateQueries({ queryKey: ["POSTS"] })
    }
  })
}