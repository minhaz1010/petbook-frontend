/* eslint-disable @typescript-eslint/no-unused-vars */
import { userOptions } from '@/queryOptions/queryOptionsForUsers';
import { detailsOfAUser } from '@/services/user/user.services'
import { getQueryClient } from '@/utils/getQueryClient'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import UserProfile from './_components/UserProfile';
import Loading from '@/components/Shared/Loading';
import User from './_components/User';
import { IUSer } from '@/types';

const page = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(userOptions);
  const userDetails = await detailsOfAUser();

  const { posts, ...userInfo } = userDetails?.data as IUSer;
  return (
    <div>
      <UserProfile {...userInfo} />
      <Suspense fallback={<Loading />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <User />
        </HydrationBoundary>
      </Suspense>
    </div>
  )
}

export default page
