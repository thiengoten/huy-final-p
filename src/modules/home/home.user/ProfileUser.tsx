import { UserInformation } from "./InforUser"
import { UserOrders } from "./OrderUser"

export default function ProfileUser() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Profile</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <UserInformation />
        <UserOrders />
      </div>
    </div>
  )
}
