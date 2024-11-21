import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const productSchema = z.object({
  id: z.string(),
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters long" }),
  price: z.string().min(1, { message: "Price is required" }),
  images: z.array(z.string().url()).optional(),
  brand: z.string().min(1, { message: "Brand is required" }),
  size: z.string().optional(),
})

type Product = z.infer<typeof productSchema>

interface EditProductDialogProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onSave: (updatedProduct: Product) => void
}

export function EditProductDialog({
  product,
  isOpen,
  onClose,
  onSave,
}: EditProductDialogProps) {
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const form = useForm<Product>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
      price: "",
      images: [],
      brand: "",
      size: "",
    },
  })

  useEffect(() => {
    if (product) {
      form.reset(product)
      setPreviewImages(product.images || [])
      console.log(product)
    }
  }, [product, form])

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
    onSave(data)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
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
                      defaultValue={field.value}
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
                    Upload one or more images of the product. The first image
                    will be used as the main product image.
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
      </DialogContent>
    </Dialog>
  )
}
