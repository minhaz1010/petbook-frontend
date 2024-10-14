"use client"

import React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { oswald } from '@/config/font'
import { UserPlus, UserX, Users, ExternalLink } from 'lucide-react'
import { useFollowingList } from '@/hooks/user/useFollowingList.hook'
import { useAuth } from '@clerk/nextjs'



export default function FollowingsList() {
  const { userId } = useAuth()
  const { data: response } = useFollowingList()

  return (
    <Card className={`${oswald.className} bg-gray-900 mt-11 max-w-4xl container mx-auto border-gray-800 overflow-hidden shadow-2xl`}>
      <CardHeader className="bg-gradient-to-r from-purple-200 to-blue-200 p-6">
        <CardTitle className="text-2xl sm:text-3xl md:text-5xl font-bold text-black flex items-center justify-center gap-3">
          <Users className="w-6 h-6 sm:w-8 sm:h-8" />
          Your Followings
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!userId ? (
          <div className="bg-gray-800 rounded-lg p-6 text-center animate-pulse">
            <UserX className="w-12 h-12 mx-auto mb-3 text-red-500" />
            <p className="text-xl sm:text-2xl font-light text-gray-300">Please Login to See Your Followings</p>
          </div>
        ) : response?.data.followings.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <UserPlus className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
            <p className="text-xl sm:text-2xl font-light text-gray-300">You are not following anyone yet</p>
            <p className="mt-2 text-sm text-gray-400">Start exploring to find people to follow!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {response?.data.followings.map((following, index: number) => (
              <li
                key={following._id}
                className="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Link href={`/user/${following.userName}`} className="group relative inline-block">
                  <Avatar className="border-2 border-purple-500 shadow-lg transition-all duration-300 ease-in-out group-hover:border-purple-600 group-hover:shadow-xl group-hover:scale-105">
                    <AvatarImage src={following.imageURL} alt={following.userName} />
                    <AvatarFallback className="bg-purple-600 text-white">{following.userName[0]}</AvatarFallback>
                  </Avatar>
                  <ExternalLink className="absolute bottom-0 right-0 w-4 h-4 text-purple-500 bg-white rounded-full p-0.5 shadow-md transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
                  <span className="sr-only">View {following.userName} profile</span>
                  <div className="absolute inset-0 border-2 border-purple-500 rounded-full animate-ping opacity-0 group-hover:opacity-75"></div>
                </Link>

                <span className="text-gray-200 font-medium">{following.userName}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}