import { Button } from "@/components/ui/button"
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

import { useAddProduct } from "@/queries/products"
import { supabase } from "@/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { initValues, productSchema } from "./AddProduct.helper"
import { useToast } from "@/hooks/use-toast"

export default function AddProductForm() {
  const { toast } = useToast()
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])

  const { onAddNewProduct } = useAddProduct({
    onSuccess: () => {
      toast({
        title: "Product added successfully",
      })
    },
  })

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: initValues,
  })
  const { control, handleSubmit, setValue } = form
  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || [])
    setFiles((prevFiles) => [...prevFiles, ...newFiles])

    try {
      const uploadPromises = newFiles.map((file) =>
        supabase.storage.from("product-image").upload(file.name, file)
      )

      const results = await Promise.all(uploadPromises)

      const newImageUrls = results
        .map((result, index) => {
          if (result.error) {
            console.error(
              `Error uploading file ${newFiles[index].name}:`,
              result.error
            )
            return null
          }
          const { data } = supabase.storage
            .from("product-image")
            .getPublicUrl(result.data!.path)
          return data.publicUrl
        })
        .filter((url): url is string => url !== null)

      setValue("images", [...(form.getValues("images") || []), ...newImageUrls])

      const newPreviewImages = newFiles.map((file) => URL.createObjectURL(file))
      setPreviewImages((prevImages) => [...prevImages, ...newPreviewImages])
    } catch (err) {
      console.error("Error during image upload:", err)
    }
  }

  const removeImage = async (index: number) => {
    const fileToRemove = files[index]

    if (!fileToRemove) return

    try {
      const { error } = await supabase.storage
        .from("product-image")
        .remove([fileToRemove.name])

      if (error) {
        console.error(`Error removing file ${fileToRemove.name}:`, error)
      } else {
        const currentImages = form.getValues("images") || []
        setValue(
          "images",
          currentImages.filter((_, i) => i !== index)
        )
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index))
        setPreviewImages((prevImages) =>
          prevImages.filter((_, i) => i !== index)
        )
      }
    } catch (err) {
      console.error("Error during image removal:", err)
    }
  }

  const onSubmit = (values: z.infer<typeof productSchema>) => {
    onAddNewProduct(values as any)
  }
  return (
    <div className="w-full mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-3xl font-bold">Add New Product</h2>
        <p className="text-muted-foreground">
          Fill in the details to add a new product to your inventory.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={control}
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
            control={control}
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
              control={control}
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
          </div>
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value as string}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
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
                  Choose the category that best fits this product.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
