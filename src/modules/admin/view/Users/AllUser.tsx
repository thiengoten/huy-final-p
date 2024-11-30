import { DataTable } from "@/components/DataTable"
import { Spinner } from "@/components/ui/spinner"
import { allColumns } from "@/modules/admin/view/Users/Users.columns"
import { useGetUsers } from "@/queries/users/useUsers"

import { User } from "@supabase/supabase-js"
import { useMemo } from "react"

export default function AllUser() {
  const { userData, isLoadingUsers } = useGetUsers()
  const columns = useMemo(() => allColumns(), [])

  if (isLoadingUsers) return <Spinner />

  return (
    <div className="pt-0 p-6 w-full min-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <DataTable columns={columns} data={(userData as User[]) || []} />
    </div>
  )
}
