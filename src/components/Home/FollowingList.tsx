import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { protest_strike } from '@/config/font';

const dummyFollowingData = [
  { id: '5', name: 'Eva Green', avatar: 'https://source.unsplash.com/100x100/?portrait,woman' },
  { id: '6', name: 'Frank Sinatra', avatar: 'https://source.unsplash.com/100x100/?portrait,man' },
  { id: '7', name: 'Grace Kelly', avatar: 'https://source.unsplash.com/100x100/?portrait,woman' },
  { id: '8', name: 'Harry Potter', avatar: 'https://source.unsplash.com/100x100/?portrait,boy' },
];

const FollowingsList = () => {
  return (
    <Card className={`${protest_strike.className} md:block hidden `}>
      <CardHeader>
        <CardTitle className='text-3xl font-light'>Your Following</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {dummyFollowingData.map((following) => (
            <li key={following.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={following.avatar} alt={following.name} />
                <AvatarFallback>{following.name[0]}</AvatarFallback>
              </Avatar>
              <span>{following.name}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FollowingsList;