import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { protest_strike } from '@/config/font';
const dummyFollowersData = [
  { id: '1', name: 'Alice Johnson', avatar: 'https://source.unsplash.com/100x100/?portrait,woman' },
  { id: '2', name: 'Bob Smith', avatar: 'https://source.unsplash.com/100x100/?portrait,man' },
  { id: '3', name: 'Charlie Brown', avatar: 'https://source.unsplash.com/100x100/?portrait,boy' },
  { id: '4', name: 'Diana Ross', avatar: 'https://source.unsplash.com/100x100/?portrait,girl' },
];


const FollowersList: FC = () => {
  return (
    <Card className={`${protest_strike.className} md:block hidden `}>
      <CardHeader>
        <CardTitle className='text-3xl font-light'>Your Followers</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {dummyFollowersData.map((follower) => (
            <li key={follower.id} className="flex font-light items-center space-x-4">
              <Avatar>
                <AvatarImage src={follower.avatar} alt={follower.name} />
                <AvatarFallback>{follower.name[0]}</AvatarFallback>
              </Avatar>
              <span>{follower.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FollowersList;