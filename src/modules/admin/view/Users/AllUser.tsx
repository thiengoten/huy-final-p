"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Label } from "../../../../components/ui/label"

// Sample user data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "User",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "User",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "Moderator",
    status: "Active",
  },
]
export default function AllUser() {
  const [sortColumn, setSortColumn] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<string>("asc")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const [editingUser, setEditingUser] = useState<any>(null)

  const sortedUsers = [...users]
    .sort((a: any, b: any) => {
      if (sortColumn) {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1
      }
      return 0
    })
    .filter((user) =>
      Object.values(user).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const handleEditUser = (user: any) => {
    setEditingUser({ ...user })
    setIsDrawerOpen(true)
  }

  const handleSaveUser = () => {
    // Here you would typically make an API call to update the user
    console.log("Saving user:", editingUser)
    setIsDrawerOpen(false)
    setEditingUser(null)
  }

  return (
    <div className="pt-0 p-6 w-full min-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-4">
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("name")}>
                  Name <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("email")}>
                  Email <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("role")}>
                  Role <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("status")}>
                  Status <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() =>
                          navigator.clipboard.writeText(user.id.toString())
                        }
                      >
                        Copy user ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View user details</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditUser(user)}>
                        Edit user
                      </DropdownMenuItem>
                      <DropdownMenuItem>Delete user</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Edit User</DrawerTitle>
            <DrawerDescription>
              Make changes to the user here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          {editingUser && (
            <div className="p-4">
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editingUser.name}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={editingUser.email}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, email: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={editingUser.role}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, role: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Input
                    id="status"
                    value={editingUser.status}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, status: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <DrawerFooter>
            <Button onClick={handleSaveUser}>Save changes</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
