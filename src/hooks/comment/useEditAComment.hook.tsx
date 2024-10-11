/* eslint-disable @typescript-eslint/no-explicit-any */
import { editAComment } from "@/services/comment/comment.services";
import { getQueryClient } from "@/utils/getQueryClient"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"


export const useEditAComment = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ["EDIT_A_COMMENT"],
    mutationFn: async (payload: any) => await editAComment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_ALL_COMMENTS"] })
      toast.success("Successfully edited the comment")
    }
  })
}