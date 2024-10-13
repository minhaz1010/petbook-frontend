import { getAllPost } from "@/services/post/post.services";
import { postOfAUserByUserName } from "@/services/user/user.services";
import { IUSer } from "@/types";
import { queryOptions } from "@tanstack/react-query";
export const userOptions = queryOptions({
  queryKey: ["POSTS", "USER_DETAILS"],
  queryFn: async () => await getAllPost(),
  refetchOnWindowFocus: false
})


export const individualUserPostsOptions = (userName: string) => {
  return queryOptions<IUSer | undefined>({
    queryKey: ['POSTS', userName],
    queryFn: () => postOfAUserByUserName(userName),
    refetchOnWindowFocus: false
  });
};

