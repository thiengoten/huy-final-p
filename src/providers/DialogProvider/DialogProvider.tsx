import React, { createContext, useContext, useState, useCallback } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

type DialogOptions = {
  title?: React.ReactNode
  description?: React.ReactNode
  content?: React.ReactNode
}

type DialogContextType = {
  openDialog: (options: DialogOptions) => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export const DialogProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [dialogOptions, setDialogOptions] = useState<DialogOptions | null>(null)

  const openDialog = useCallback((options: DialogOptions) => {
    setDialogOptions(options)
  }, [])

  const closeDialog = useCallback(() => {
    setDialogOptions(null)
  }, [])

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      {dialogOptions && (
        <Dialog open={!!dialogOptions} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              {dialogOptions.title && (
                <DialogTitle>{dialogOptions.title}</DialogTitle>
              )}
              {dialogOptions.description && (
                <DialogDescription>
                  {dialogOptions.description}
                </DialogDescription>
              )}
            </DialogHeader>
            {dialogOptions.content}
          </DialogContent>
        </Dialog>
      )}
    </DialogContext.Provider>
  )
}

export const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
