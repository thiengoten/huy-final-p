import { z } from "zod"

export const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  price: z.string().nullable(),
  brand: z.string().nullable(),
  size: z.string().nullable(),
})

export const initValues = {
  title: "",
  description: "",
  price: "",
  images: "",
  brand: "",
  createdAt: "",
  size: "",
}
