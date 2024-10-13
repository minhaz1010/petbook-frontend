"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { oswald } from '@/config/font';
import { UserPlus, UserX, Users } from 'lucide-react';
import { useAuth } from '@clerk/nextjs';
import { useFollowingList } from '@/hooks/user/useFollowingList.hook';

const FollowersList = () => {
  const { userId } = useAuth();
  const { data: response } = useFollowingList();

  return (
    <div className="min-h-screen   bg-black text-white p-4 sm:p-6 md:p-8 lg:p-12">
      <Card className={`${oswald.className} max-w-4xl mx-auto bg-gray-900 border-gray-800 overflow-hidden shadow-2xl`}>
        <CardHeader className="bg-gradient-to-r from-purple-200 to-blue-200 p-6">
          <CardTitle className="text-3xl sm:text-4xl md:text-5xl font-bold text-center flex items-center justify-center gap-4">
            <Users className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
            Your Followers
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!userId ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center animate-pulse">
              <UserX className="w-16 h-16 mx-auto mb-4 text-red-500" />
              <p className="text-2xl sm:text-3xl font-bold text-gray-300">
                Please Login to See Your Followers
              </p>
            </div>
          ) : response?.data.followers.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <UserPlus className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
              <p className="text-2xl sm:text-3xl font-bold text-gray-300">
                You have no followers yet
              </p>
              <p className="mt-2 text-xl text-gray-400">Start engaging to gain followers!</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {response?.data.followers.map((follower, index) => (
                <li
                  key={follower._id}
                  className="bg-gray-800 rounded-lg p-4 flex items-center space-x-4 hover:bg-gray-700 transition-all duration-300 shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Avatar className="w-16 h-16 border-2 border-purple-500 shadow-lg">
                    <AvatarImage src={follower.imageURL} alt={follower.userName} />
                    <AvatarFallback className="text-2xl font-bold bg-purple-600">{follower.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-gray-200">{follower.userName}</h3>
                    <p className="text-sm text-gray-400">Follower</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FollowersList;