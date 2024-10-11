import React from 'react';
import { Crown, Users } from 'lucide-react';

interface PostBadgeProps {
  isPremium: boolean;
}

export const PostBadge: React.FC<PostBadgeProps> = ({ isPremium }) => {
  return (
    <div className={`bg-gradient-to-r ${isPremium ? 'from-yellow-500 to-amber-500' : 'from-emerald-500 to-green-500'} text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full flex items-center shadow-lg`}>
      {isPremium ? (
        <Crown className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
      ) : (
        <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
      )}
      <span className="text-xs sm:text-sm font-medium">
        {isPremium ? 'Premium' : 'Free'}
      </span>
    </div>
  );
};