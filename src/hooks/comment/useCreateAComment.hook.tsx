import { createComment } from "@/services/comment/comment.services";
import { getQueryClient } from "@/utils/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface Comment {
  id: string;
  postId: string;
  content: string;
}

interface CreateCommentPayload {
  postId: string;
  content: string;
}

export const useCreateAComment = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateCommentPayload) => await createComment(payload),
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ['GET_ALL_COMMENTS', newComment.postId] });

      const previousComments = queryClient.getQueryData<Comment[]>(['GET_ALL_COMMENTS', newComment.postId]);

      queryClient.setQueryData<Comment[]>(['GET_ALL_COMMENTS', newComment.postId], old => {
        const optimisticComment: Comment = {
          id: 'temp-id-' + Date.now(),
          ...newComment,
        };
        return [...(old || []), optimisticComment];
      });

      return { previousComments };
    },
    onError: (err, newComment, context) => {
      queryClient.setQueryData(['GET_ALL_COMMENTS', newComment.postId], context?.previousComments);
      toast.error("Failed to add comment");
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData<Comment[]>(['GET_ALL_COMMENTS', variables.postId], old => {
        const filteredComments = old?.filter(comment => comment.id !== 'temp-id-' + Date.now()) || [];
        return [...filteredComments, data];
      });
      toast.success("Comment Added");
    },
    onSettled: (data, error, variables) => {
      queryClient.invalidateQueries({ queryKey: ['GET_ALL_COMMENTS', variables.postId] });
    },
  });
};