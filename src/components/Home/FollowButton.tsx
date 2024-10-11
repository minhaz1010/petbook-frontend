import React from 'react';
import { Button } from "@/components/ui/button";
import { UserPlus } from 'lucide-react';

interface FollowButtonProps {
  onFollow: () => void;
}

export const FollowButton: React.FC<FollowButtonProps> = ({ onFollow }) => {
  return (
    <Button variant="outline" size="sm" onClick={onFollow} className="mt-2">
      <UserPlus className="mr-2 h-4 w-4" />
      Follow
    </Button>
  );
};