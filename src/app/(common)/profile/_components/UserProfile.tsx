import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { protest_strike } from "@/config/font"
import { IUSer } from "@/types"
import { CalendarIcon, MailIcon } from "lucide-react"

type UserInfoProps = Partial<IUSer>

export default function UserProfile({
  userName,
  fullName,
  email,
  imageURL,
  followers,
  followings,
  membership,
  role,
  createdAt,
}: UserInfoProps) {
  return (
    <div className={` w-full ${protest_strike.className}  p-4 md:p-8 bg-[#000000] bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:30px_30px]`}>
      <Card className="max-w-3xl mx-auto bg-black/50 backdrop-blur-md border-gray-800">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24 border-2 text-gray-300 border-primary">
            <AvatarImage src={imageURL} alt={fullName} />
            <AvatarFallback>{fullName?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-300">{fullName}</CardTitle>
            <p className="text-muted-foreground text-gray-300">@{userName}</p>
          </div>
          <div className="flex space-x-2">
            <Badge variant="secondary">{role}</Badge>
            <Badge variant="outline" className="text-gray-300">{membership}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 ">
          <div className=" gap-4 text-gray-300">
            <InfoItem icon={<MailIcon className="w-4 h-4 text-gray-300" />} label="Email" value={email as string} />
            <InfoItem
              icon={<CalendarIcon className="w-4 h-4 text-gray-300" />}
              label="Joined"
              // value={new Date(createdAt).toLocaleDateString('en-us')}
              value={`${new Date(createdAt).getDate()}${["th", "st", "nd", "rd"][((new Date(createdAt).getDate() + 90) % 100 - 10) % 10] || "th"} ${new Date(createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`}

            />
          </div>
          <Separator className="my-4" />
          <div className="flex justify-around text-center">
            <div>
              <p className="text-xl font-semibold text-gray-300">{followers?.length}</p>
              <p className="text-muted-foreground text-gray-300">Followers</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-300">{followings?.length}</p>
              <p className="text-muted-foreground text-gray-300">Following</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-muted-foreground">{label}:</span>
      <span className="text-gray-300">{value}</span>
    </div>
  )
}