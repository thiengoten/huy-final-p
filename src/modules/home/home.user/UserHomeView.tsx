import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Loader from "@/components/ui/loader"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useCart } from "@/providers/CardProvider/CardProvider"
import { useGetAllProducts } from "@/queries/products"
import { useState } from "react"
import { Link } from "react-router-dom"

type Props = {}

const ITEMS_PER_PAGE = 6

const UserHomeContainer = ({}: Props) => {
  const { addToCart } = useCart()
  const { productsData, isLoading } = useGetAllProducts()
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination values
  const totalPages = productsData ? Math.ceil(productsData.length / ITEMS_PER_PAGE) : 0
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = productsData?.slice(startIndex, endIndex)

  return isLoading ? (
    <Loader className="text-white bg-black bg-opacity-30" />
  ) : (
    <div className="mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts?.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader>
              {product.images && (
                <img
                  src={product.images[0]}
                  alt={product.title ? String(product.title) : "product"}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <CardTitle className="text-xl mb-2">{product.title}</CardTitle>
              <Badge variant="secondary" className="mb-2">
                ${product.price ? Number(product.price).toFixed(2) : ""}
              </Badge>
            </CardContent>
            <CardFooter className="grid-cols-2 gap-2">
              <Button className="w-full" onClick={() => addToCart(product)}>
                Add to Card
              </Button>
              <Button className="w-full" variant="secondary">
                <Link className="w-full" to={`/product/${product.id}`}>
                  Detail
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {/* First Page */}
            <PaginationItem>
              <PaginationLink
                onClick={() => setCurrentPage(1)}
                isActive={currentPage === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {/* Show ellipsis if there are many pages */}
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Current page neighborhood */}
            {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
              .filter(page => page > 1 && page < totalPages)
              .map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {/* Show ellipsis if there are many pages */}
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Last Page */}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => setCurrentPage(totalPages)}
                  isActive={currentPage === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default UserHomeContainer
