import React, { Suspense } from 'react'
import FollowingsList from './_components/FollowingList'
import Loading from '@/components/Shared/Loading'

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <FollowingsList />
    </Suspense>
  )
}

export default page