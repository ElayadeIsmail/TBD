import { z } from "zod"
import prisma from "@/database/db"

export const InsertClassSchema = z.object({
  levelId: z.string().min(1, "level is required"),
  subjects: z.string().array(),
  majors: z.string().array(),
  price: z.number().optional()
}).superRefine(async ({ levelId }, ctx) => {
  const level = await prisma.level.findUnique({
    where: {
      id: levelId
    }
  })
  if (!level) {
    ctx.addIssue({
      path: ['levelId'],
      code: z.ZodIssueCode.custom,
      message: `Level Not Found`,
    })
    return z.NEVER
  }
})

export type InsertClassSchemaType = z.infer<typeof InsertClassSchema>
