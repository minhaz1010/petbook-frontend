import FollowersList from '@/components/Home/FollowerList';
import FollowingsList from '@/components/Home/FollowingList';
import HomeLayout from '@/components/Home/HomeLayout';
import Post from '@/components/Home/Post';
import CardLoader from '@/components/Shared/CardLoader';
import { postOptions } from '@/queryOptions/infiniteQueryOptionsForPost';
import { getQueryClient } from '@/utils/getQueryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'

const CommonPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(postOptions);
  return (
    <HomeLayout>
      <Suspense fallback={<div>Loading followers...</div>}>
        <FollowersList />
      </Suspense>
      <Suspense fallback={<CardLoader />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Post />
        </HydrationBoundary>
      </Suspense>
      <Suspense fallback={<div>Loading following...</div>}>
        <FollowingsList />
      </Suspense>
    </HomeLayout>
  )
}

export default CommonPage