import React, { Suspense } from 'react'
import FollowersList from './_components/FollowerList'
import Loading from '@/components/Shared/Loading'

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <FollowersList />
    </Suspense>
  )
}

export default page