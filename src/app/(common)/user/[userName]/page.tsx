import { getQueryClient } from "@/utils/getQueryClient"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { individualUserPostsOptions } from "@/queryOptions/queryOptionsForUsers";
import IndividualUser from "./_components/IndividualUser";
import Loading from "@/components/Shared/Loading";
import { IUSer } from "@/types";

interface ParamsProps {
  params: {
    userName: string
  }
}

const UserNamePage = async ({ params }: ParamsProps) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery<IUSer | undefined>(individualUserPostsOptions(params.userName));

  return (
    <>
      <Suspense fallback={<Loading />}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <IndividualUser userName={params.userName} />
        </HydrationBoundary>
      </Suspense>
    </>
  )
}

export default UserNamePage