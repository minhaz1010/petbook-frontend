'use client'

import { useState } from "react"
import { PostCard } from "@/components/Shared/PostCard"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { IPost } from "@/types"

interface UserPostsProps {
  posts: IPost[]
}

const POSTS_PER_PAGE = 4

export default function UserPosts({ posts }: UserPostsProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, endIndex)

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages))
  }

  const goToPreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  return (
    <div className="space-y-6 container mx-auto size-full lg:size-[40%]">
      <h2 className="text-2xl font-bold text-center text-[#00c9c8] mb-4">Total Posts : {posts.length}</h2>
      {currentPosts.map((post) => (
        <PostCard key={post._id} post={post} />
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
    </div>
  )
}