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
      />
      <CommandList>
        <CommandEmpty>No products found.</CommandEmpty>
        {isLoading && <CommandItem>Loading products...</CommandItem>}
        <CommandGroup heading="Products">
          {filteredProducts().map((product) => (
            <CommandItem
              key={product.id}
              className="flex items-center gap-3"
              onSelect={() => handleProductClick(product.id)}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className="relative w-12 h-12 overflow-hidden rounded-md">
                  {product.images && (
                    <img
                      src={product.images[0]}
                      alt={product.title ? String(product.title) : "product"}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{product.title}</span>
                  <span className="text-sm text-muted-foreground">
                    ${product.price}
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
