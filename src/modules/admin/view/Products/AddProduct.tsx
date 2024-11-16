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
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/services"
import { zodResolver } from "@hookform/resolvers/zod"
import { SelectContent, SelectValue } from "@radix-ui/react-select"
import { X } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { initValues, productSchema } from "./AddProduct.helper"

export default function AddProductForm() {
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])
  console.log(previewImages)
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: initValues,
  })
  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFiles(files)
    console.log(files)
    for (const file of files) {
      const { data, error } = await supabase.storage
        .from("product-image")
        .upload(file.name, file)
      if (error) {
        console.error("Error uploading file: ", error)
      }
      console.log(data)
    }
    const newPreviewImages = files.map((file) => URL.createObjectURL(file))
    setPreviewImages((prevImages) => [...prevImages, ...newPreviewImages])
  }

  // Remove image
  const removeImage = async (index: number) => {
    const { name } = files[index]
    console.log("🚀 ~ removeImage ~ name:", name)

    // const { data, error } = await supabase.storage
    //   .from("product-image")
    //   .remove([name])
    // console.log(error, data)
    setPreviewImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }
  const { control, handleSubmit, formState } = form

  console.log(formState.errors)
  const onSubmit = (values: z.infer<typeof productSchema>) => {
    console.log(values)
    // setTimeout(() => {
    //   setIsSubmitting(false)
    //   form.reset()
    //   setPreviewImages([])
    // }, 2000)
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
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="clothing">Clothing</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="home">Home & Garden</SelectItem>
                    <SelectItem value="toys">Toys & Games</SelectItem>
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
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}
