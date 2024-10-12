import React from 'react';
import { Button } from "@/components/ui/button";
import { UserMinus } from 'lucide-react';

interface UnfollowButtonProps {
  onUnfollow: () => void;
}

export const UnfollowButton: React.FC<UnfollowButtonProps> = ({ onUnfollow }) => {
  return (
    <Button variant="outline" size="sm" onClick={onUnfollow} className="mt-2">
      <UserMinus className="mr-2 h-4 w-4" />
      Unfollow
    </Button>
  );
};