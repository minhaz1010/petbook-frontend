import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Lock } from 'lucide-react';
import parse from 'html-react-parser';
import { usePathname } from 'next/navigation';

interface PostContentProps {
  content: string;
  isPremium: boolean;
  userMembership: string;
  userId: string | null;
}

export const PostContent: React.FC<PostContentProps> = ({ content, isPremium, userMembership, userId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathName = usePathname();
  const isProfileRoute = pathName === '/profile';

  const renderContent = () => {
    if (isProfileRoute) {
      // Show full content without restrictions on the profile route
      return <div className="text-gray-200">{parse(content)}</div>;
    }

    const words = content.split(' ');
    let contentToShow: string;
    let hasMore = false;

    if (isExpanded) {
      contentToShow = isPremium && userMembership !== 'PREMIUM' ? words.slice(0, 40).join(' ') : content;
      hasMore = isPremium && userMembership !== 'PREMIUM' && words.length > 40;
    } else {
      contentToShow = words.slice(0, 20).join(' ');
      hasMore = words.length > 20;
    }

    return (
      <div className="text-gray-200">
        {parse(contentToShow + (hasMore ? " ... " : ""))}
        {(hasMore || isExpanded) && (
          <Button
            variant="link"
            onClick={() => {
              if (userId) {
                setIsExpanded(!isExpanded)
              }
            }}
            className={`mt-2 text-teal-400 hover:text-teal-300 p-0 ${!userId ? 'cursor-not-allowed opacity-50' : ''}`}
            title={!userId ? 'Please login' : ''}
          >
            {isExpanded ? 'Show Less' : 'Read More'}
          </Button>
        )}
        {isExpanded && isPremium && userMembership !== 'PREMIUM' && words.length > 40 && (
          <div className="mt-2 p-2 bg-yellow-900/30 border border-yellow-500/50 rounded-md">
            <p className="text-yellow-300 flex items-center">
              <Lock className="w-4 h-4 mr-2" />
              This is premium content. Please upgrade to read more.
            </p>
          </div>
        )}
      </div>
    );
  };

  return renderContent();
};