import { Suspense } from "react"
import { AppSidebar } from "@/components/admin/app-sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { Outlet } from "react-router-dom"
import { Spinner } from "@/components/ui/spinner"
import { DialogProvider } from "@/providers/DialogProvider/DialogProvider"

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <DialogProvider>
        <div className="flex">
          <AppSidebar />
          <main className="flex-1">
            <SidebarTrigger />
            <Suspense fallback={<Spinner />}>
              <Outlet />
            </Suspense>
          </main>
        </div>
        <Toaster />
      </DialogProvider>
    </SidebarProvider>
  )
}
