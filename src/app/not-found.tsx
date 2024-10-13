import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, PawPrint } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="max-w-md w-full bg-black bg-opacity-50 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2">
            <PawPrint className="h-12 w-12 text-purple-400" />
            <Search className="h-8 w-8 text-purple-400 animate-bounce" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-white">Page Not Found</h2>
          <p className="mt-2 text-lg text-gray-300">
            Oops! It seems this page has wandered off like a curious puppy.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Link href="/" passHref>
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Return to Homepage
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
}