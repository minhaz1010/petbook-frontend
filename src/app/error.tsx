'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PawPrint } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="max-w-md w-full bg-black bg-opacity-50 p-8 rounded-lg shadow-2xl backdrop-blur-sm">
        <div className="text-center">
          <PawPrint className="mx-auto h-16 w-16  text-purple-400 animate-bounce" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">Oops! Something went wrong</h2>
          <p className="mt-2 text-lg text-gray-300">
            Do not worry, even the best-trained pets make mistakes sometimes.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            onClick={reset}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Try again
          </Button>
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="w-full bg-transparent hover:bg-purple-600 text-purple-300 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded transition duration-300"
            >
              Return to homepage
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-center text-sm text-gray-400">
          If the problem persists, please contact our support team.
        </p>
      </div>
    </div>
  )
}