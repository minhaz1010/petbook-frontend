import { getCommentsOfAPost } from "@/services/comment/comment.services"
import { useQuery } from "@tanstack/react-query"

export const useGetAllCommentsOfASinglePost = (postId: string) => {
  return useQuery({
    queryKey: ['GET_ALL_COMMENTS', postId],
    queryFn: () => getCommentsOfAPost(postId),
    refetchInterval: 30 * 1000
  })
}