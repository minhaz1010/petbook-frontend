import { fetchAllPosts } from "@/services/post/post.services";
import { infiniteQueryOptions } from "@tanstack/react-query";
export const postOptions = infiniteQueryOptions({
  queryKey: ["POSTS"],
  queryFn: ({ pageParam = 1 }) => fetchAllPosts({ pageParam }),
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    const loadedPosts = allPages.reduce((total, page) => total + page.data.result.length, 0);
    return loadedPosts < lastPage.data.totalPosts ? allPages.length + 1 : undefined;
  },
  refetchInterval: 3 * 60 * 1000,
  refetchOnMount: true
})
export const postOptionsForStoryOrTip = (category?: string) => infiniteQueryOptions({
  queryKey: ["POSTS", category],
  queryFn: ({ pageParam = 1 }) => fetchAllPosts({ pageParam, category }),
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    const loadedPosts = allPages.reduce((total, page) => total + page.data.result.length, 0);
    return loadedPosts < lastPage.data.totalPosts ? allPages.length + 1 : undefined;
  },
  refetchInterval: 3 * 60 * 1000,
  refetchOnMount: true
})
