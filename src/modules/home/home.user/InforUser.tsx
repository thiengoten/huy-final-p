import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider"
import { HoverCard } from "@radix-ui/react-hover-card"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { BadgeCheck, Mail } from "lucide-react"

export function UserInformation() {
  const { user } = useAuthContext()
  dayjs.extend(utc)

  const timestamp = "2024-11-25T20:09:19.456282Z"
  const date = dayjs(timestamp)

  return (
    <Card className="w-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/micah/svg/backgroundColor=b6e3f4,c0aede,d1d4f9?seed=${user?.email}`}
              alt="@shadcn"
            />
            <AvatarFallback>
              {user
                ?.identities![0].identity_data?.full_name.split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold">
              {user?.identities![0].identity_data?.full_name}
            </h2>
            <p className="text-muted-foreground">
              Member since {date.format("YYYY-MM-DD")}
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            <span>{user?.email}</span>
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
