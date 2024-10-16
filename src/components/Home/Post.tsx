"use client";
import { useState, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search } from 'lucide-react';
import 'rc-image/assets/index.css';
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { IPost } from '@/types';
import { postOptions } from '@/queryOptions/infiniteQueryOptionsForPost';
import { useDebounce } from '@/hooks/post/useDebounce.hook';
import { PostCard } from '../Shared/PostCard';

const Post = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recent');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useSuspenseInfiniteQuery(postOptions);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleSort = useCallback((value: string) => {
    setSortOption(value);
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    let result: IPost[] = [];
    data.pages.forEach(page => {
      result = result.concat(page.data.result);
    });

    if (debouncedSearchTerm) {
      result = result.filter(post =>
        post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        post.author.userName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
    }

    if (sortOption === 'mostLikes') {
      result.sort((a, b) => b.likes - a.likes);
    } else if (sortOption === 'leastLikes') {
      result.sort((a, b) => a.likes - b.likes);
    }

    return result;
  }, [data.pages, debouncedSearchTerm, sortOption]);

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
    <div className="p-4 container mx-auto lg:w-[71%] w-full">
      <div className="mb-4 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search posts or authors..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <Select value={sortOption} onValueChange={handleSort}>
          <SelectTrigger className="w-full text-white sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="mostLikes">Most Likes</SelectItem>
            <SelectItem value="leastLikes">Least Likes</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <section className=''>
        {filteredAndSortedPosts.map((post: IPost) => (
          <PostCard key={post._id} post={post} />
        ))}
      </section>

      {isFetchingNextPage && (
        <div className="flex justify-center my-4">
          <Loader2 className="size-10 animate-spin text-teal-400" />
        </div>
      )}

      {hasNextPage && !isFetchingNextPage && filteredAndSortedPosts.length > 0 && (
        <div className="flex justify-center my-4">
          <Button
            onClick={() => {
              fetchNextPage();
            }}
            variant="outline"
            className="max-w-xs bg-teal-500 text-white hover:bg-teal-300 hover:text-black"
          >
            Load More Posts
          </Button>
        </div>
      )}

      {!hasNextPage && filteredAndSortedPosts.length > 0 && (
        <p className="text-center text-purple-300 my-4">
          No more posts to load
        </p>
      )}

      {filteredAndSortedPosts.length === 0 && (
        <p className="text-center text-purple-300 my-4">
          No posts found matching your search
        </p>
      )}
    </div>
  );
};

export default Post;