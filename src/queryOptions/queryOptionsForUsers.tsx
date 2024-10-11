import { getAllPost } from "@/services/post/post.services";
import { queryOptions } from "@tanstack/react-query";
export const userOptions = queryOptions({
  queryKey: ["POSTS", "USER_DETAILS"],
  queryFn: async () => await getAllPost()
})