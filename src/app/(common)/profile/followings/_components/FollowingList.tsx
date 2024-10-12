import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { protest_strike } from '@/config/font';
import { auth } from '@clerk/nextjs/server';
import { detailsOfAUser } from '@/services/user/user.services';
import { UserPlus, UserX, Users } from 'lucide-react';

const FollowingsList = async () => {
  const { userId } = auth();
  const response = userId ? await detailsOfAUser() : null;

  return (
    <Card className={`${protest_strike.className} bg-gray-900  mt-11 max-w-4xl container mx-auto border-gray-800 overflow-hidden shadow-2xl`}>
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
            <p className="text-xl sm:text-2xl font-light text-gray-300">
              Please Login to See Your Followings
            </p>
          </div>
        ) : response?.data.followings.length === 0 ? (
          <div className="bg-gray-800 rounded-lg p-6 text-center">
            <UserPlus className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
            <p className="text-xl sm:text-2xl font-light text-gray-300">
              You're not following anyone yet
            </p>
            <p className="mt-2 text-sm text-gray-400">Start exploring to find people to follow!</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {response?.data.followings.map((following, index) => (
              <li
                key={following._id}
                className="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Avatar className="border-2 border-blue-500 shadow-lg">
                  <AvatarImage src={following.imageURL} alt={following.userName} />
                  <AvatarFallback className="bg-blue-600 text-white">{following.userName[0]}</AvatarFallback>
                </Avatar>
                <span className="text-gray-200 font-medium">{following.userName}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default FollowingsList;