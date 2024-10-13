/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useCallback, useMemo } from 'react'
import { PostCard } from "@/components/Shared/PostCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { individualUserPostsOptions } from "@/queryOptions/queryOptionsForUsers"
import { IPost, IUSer } from "@/types"
import { useSuspenseQuery } from "@tanstack/react-query"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useDebounce } from '@/hooks/post/useDebounce.hook'

const POSTS_PER_PAGE = 4;

const IndividualUser = ({ userName }: { userName: string }) => {
  const { data } = useSuspenseQuery(individualUserPostsOptions(userName));
  const followersId = data?.followers.map((follower) => follower.userId);
  const { userId: idOfTheIndividualUser, posts } = data as IUSer
  const userPosts = posts as IPost[];
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('recent')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const filteredAndSortedPosts = useMemo(() => {
    const result = userPosts.filter(post =>
      post.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    )

    if (sortOption === 'mostLikes') {
      result.sort((a, b) => b.likes - a.likes)
    } else if (sortOption === 'leastLikes') {
      result.sort((a, b) => a.likes - b.likes)
    }
    return result
  }, [userPosts, debouncedSearchTerm, sortOption])

  const totalPages = Math.ceil(filteredAndSortedPosts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = filteredAndSortedPosts.slice(startIndex, endIndex)

  const goToNextPage = useCallback(() => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }, [totalPages])

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }, [])

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }, [])

  const handleSort = useCallback((value: string) => {
    setSortOption(value)
    setCurrentPage(1)
  }, [])

  return (
    <div className="space-y-6 container mx-auto size-full lg:size-[40%]">
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-grow">
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 text-white"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <Select value={sortOption} onValueChange={handleSort}>
          <SelectTrigger className="w-full sm:w-[180px] text-white">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="mostLikes">Most Likes</SelectItem>
            <SelectItem value="leastLikes">Least Likes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {currentPosts.map((post) => (
        <PostCard key={post._id} idOfIndividualUser={idOfTheIndividualUser} followersId={followersId} post={post} />
      ))}

      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          variant="outline"
          className="flex items-center"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          variant="outline"
          className="flex items-center"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {filteredAndSortedPosts.length === 0 && (
        <p className="text-center text-muted-foreground my-4">
          No posts found matching your search
        </p>
      )}
    </div>
  )
}

export default IndividualUser