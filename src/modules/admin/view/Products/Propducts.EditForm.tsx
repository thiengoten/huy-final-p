import { Button } from "@/components/ui/button"
import { DialogFooter } from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { productSchema } from "@/modules/admin/view/Products/AddProduct.helper"
import { Product } from "@/modules/admin/view/Products/Products.columns"
import { useGetProductById, useUpdateProduct } from "@/queries/products"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select } from "@radix-ui/react-select"
import { X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

import { useForm } from "react-hook-form"

export default function EditProductForm({ productId }: { productId: string }) {
  const { toast } = useToast()
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const { productData, isLoading } = useGetProductById(productId)
  const { onUpdateProduct, handleInvalidateProducts } = useUpdateProduct({
    onSuccess: () => {
      toast({
        title: "Product updated successfully",
      })
      handleInvalidateProducts(productId)
    },
  })

  useEffect(() => {
    if (productData?.images) {
      setPreviewImages(productData.images)
    }
  }, [productData])

  const defaultValues = useMemo(() => {
    return {
      ...productData,
    }
  }, [productData])

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues,
    values: defaultValues as Product,
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newPreviewImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      setPreviewImages((prev) => [...prev, ...newPreviewImages])
      form.setValue("images", [
        ...(form.getValues("images") || []),
        ...newPreviewImages,
      ])
    }
  }

  const removeImage = (index: number) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index))
    form.setValue(
      "images",
      form.getValues("images")?.filter((_, i) => i !== index) || []
    )
  }
  const onSubmit = (data: Product) => {
    onUpdateProduct({
      id: productId,
      product: data,
    })
  }

  if (isLoading) return <Spinner />
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product name"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                The name of the product as it will appear to customers.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter product description"
                  className="resize-none"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                A detailed description of the product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="nike">Nike</SelectItem>
                    <SelectItem value="adidas">Adidas</SelectItem>
                    <SelectItem value="puma">Puma</SelectItem>
                    <SelectItem value="reebok">Reebok</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the brand of the product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    {previewImages.map((src, index) => (
                      <div key={index} className="relative">
                        <img
                          src={src}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Upload one or more images of the product. The first image will
                be used as the main product image.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
