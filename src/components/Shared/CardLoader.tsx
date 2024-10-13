import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { jetbrains } from '@/config/font'

function PostCardSkeleton() {
  return (
    <Card className={`mb-4  relative border-0 bg-gradient-to-b from-gray-900 to-gray-800 transition-all duration-300 shadow-lg shadow-black/20 ${jetbrains.className}`}>
      <div className="absolute top-2 right-2 z-10">
        <Skeleton className="h-8 w-24 rounded-full bg-gray-700" />
      </div>

      <CardHeader className="flex flex-row items-center space-x-4 border-b border-gray-700/50">
        <Skeleton className="h-14 w-14 rounded-full bg-gray-700" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 bg-gray-700" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-4 w-16 bg-gray-700" />
            <Skeleton className="h-4 w-16 bg-gray-700" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Skeleton className="h-6 w-3/4 bg-gray-700" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="aspect-square rounded-lg bg-gray-700" />
          <Skeleton className="aspect-square rounded-lg bg-gray-700" />
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t border-gray-700/50">
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-16 bg-gray-700" />
          <Skeleton className="h-8 w-16 bg-gray-700" />
        </div>
        <Skeleton className="h-8 w-20 bg-gray-700" />
        <Skeleton className="h-8 w-16 bg-gray-700" />
      </CardFooter>
    </Card>
  )
}
const CardLoader = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {[1, 2, 3].map((n) => (
        <PostCardSkeleton key={n} />
      ))}
    </div>
  );
}

export default CardLoader