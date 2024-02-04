import { z } from "zod"

export const InsertClassSchema = z.object({
  levelId: z.string().min(1, "level is required"),
  subjects: z.string().array(),
  majors: z.string().array(),
  price: z.number().optional()
})

export type InsertClassSchemaType = z.infer<typeof InsertClassSchema>
