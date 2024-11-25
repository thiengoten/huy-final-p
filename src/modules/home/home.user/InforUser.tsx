import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react"

interface UserInfo {
  name: string
  email: string
  phone: string
  location: string
  memberSince: string
  avatarUrl: string
}

const userInfo: UserInfo = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  memberSince: "2021",
  avatarUrl: "/placeholder-avatar.jpg",
}

export function UserInformation() {
  return (
    <Card className="w-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={userInfo.avatarUrl}
              alt={`${userInfo.name}'s avatar`}
            />
            <AvatarFallback>
              {userInfo.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">{userInfo.name}</h2>
            <p className="text-muted-foreground">
              Member since {userInfo.memberSince}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span>{userInfo.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <span>{userInfo.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span>{userInfo.location}</span>
          </div>
        </div>
        <div className="mt-6">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="outline" className="w-full">
                <BadgeCheck className="mr-2 h-4 w-4" /> Verified Account
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Verified Account</h4>
                  <p className="text-sm">
                    This account has been verified and is in good standing.
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </CardContent>
    </Card>
  )
}
