import { z } from "zod"

export const productSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(3),
  price: z.string().optional(),
  images: z.string().url().optional().or(z.literal("")),
  brand: z.string().optional(),
  size: z.string().optional(),
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
