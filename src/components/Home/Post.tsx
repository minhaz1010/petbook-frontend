"use client";
import { Card, } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import 'rc-image/assets/index.css';
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { IPost } from '@/types';
import { postOptions } from '@/queryOptions/infiniteQueryOptionsForPost';
import { PostCard } from './PostCard';
const Post = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useSuspenseInfiniteQuery(postOptions);

  if (status === 'error') {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card className="p-4 text-center text-red-400 bg-red-900/20 border-red-800">
          Error loading posts. Please try again later.
        </Card>
      </div>
    );
  }

  return (
    <div className=" p-4">
      {data.pages.map((page, pageIndex) => (
        <div key={pageIndex} className=''>
          {page.data.result.map((post: IPost) => (
            // <PostCard key={post._id} post={post} />
            <PostCard post={post} key={post._id} />
          ))}
        </div>
      ))}

      {isFetchingNextPage && (
        <div className="flex justify-center my-4">
          <Loader2 className="size-10 animate-spin text-teal-400" />
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center my-4">
          <Button
            onClick={() => fetchNextPage()}
            variant="outline"
            className=" max-w-xs bg-teal-500 text-white hover:bg-teal-300 hover:text-black"
          >
            Load More Posts
          </Button>
        </div>
      )}

      {!hasNextPage && (
        <p className="text-center text-purple-300 my-4">
          No more posts to load
        </p>
      )}
    </div>
  );
};

export default Post;