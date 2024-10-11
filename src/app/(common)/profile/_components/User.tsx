"use client"
import { userOptions } from '@/queryOptions/queryOptionsForUsers'
import { useSuspenseQuery } from '@tanstack/react-query'
import React from 'react'
import { useAuth } from '@clerk/nextjs'
import { PostsData } from '@/services/post/post.services'
import UserPosts from './UserPosts'
import CardLoader from '@/components/Shared/CardLoader'

const User = () => {
  const { data, isLoading } = useSuspenseQuery(userOptions);
  const { userId } = useAuth();
  if (isLoading) {
    return <CardLoader />
  }
  const { result: Posts } = data as PostsData;
  const userPosts = Posts?.filter((singlePost) => singlePost.author.userId === userId);
  return (
    <>
      <UserPosts posts={userPosts} />
    </>
  )
}

export default User