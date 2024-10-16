import CardLoader from '@/components/Shared/CardLoader';
import Story from '@/components/Story/Story';
import { postOptionsForStoryOrTip } from '@/queryOptions/infiniteQueryOptionsForPost';
import { getQueryClient } from '@/utils/getQueryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'

const StoryPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(postOptionsForStoryOrTip("STORY"));
  return (
    <Suspense fallback={<CardLoader />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='container mx-auto lg:w-[40%] w-full'>
          <Story />
        </div>
      </HydrationBoundary>
    </Suspense>
  )
}

export default StoryPage
