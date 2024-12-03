import * as React from "react"
import { useCallback, useState } from "react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { useGetAllProducts } from "@/queries/products"
import { useNavigate } from "react-router-dom"

interface SearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function Search({ open, onOpenChange }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { productsData, isLoading } = useGetAllProducts()
  const navigate = useNavigate()
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const filteredProducts = useCallback(() => {
    if (!productsData) return []
    return productsData.filter(
      (product) =>
        product.title &&
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [productsData, searchQuery])
  const handleProductClick = (productId: string) => {
    navigate("product/" + productId)
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <CommandDialog open={open} onOpenChange={(isOpen) => onOpenChange(isOpen)}>
      <CommandInput
        placeholder="Search products..."
        value={searchQuery}
        onValueChange={setSearchQuery}
        className="border-none focus:ring-0"
      />
      <CommandList className="max-h-[400px] overflow-y-auto">
        <CommandEmpty className="py-6 text-center text-sm">
          No products found.
        </CommandEmpty>
        {isLoading && (
          <CommandItem className="py-4 text-center text-sm">
            Loading products...
          </CommandItem>
        )}
        <CommandGroup heading="Products">
          {filteredProducts().map((product) => (
            <CommandItem
              key={product.id}
              onSelect={() => handleProductClick(product.id)}
              className="flex items-center gap-3 p-3 cursor-pointer hover:bg-accent"
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-md border border-border">
                  {product.images && (
                    <img
                      src={product.images[0]}
                      alt={product.title ? String(product.title) : "product"}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm line-clamp-1">
                    {product.title}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ${Number(product.price).toFixed(2)}
                  </span>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
