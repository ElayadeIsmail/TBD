import { z } from "zod"
import prisma from "@/database/db";

export const InsertGroupSchema = z.object({
  name: z.string().min(2, "name is required"),
  classId: z.string().min(2, "class is required"),
  teacherId: z.string().min(2, "teacher is required"),
  students: z.string().array()
}).superRefine(async ({ classId, teacherId }, ctx) => {
  const [classEntity, teacher] = await Promise.all([prisma.classEntity.findUnique({
    where: {
      id: classId
    }
  }), prisma.teacher.findUnique({
    where: {
      id: teacherId
    }
  })])
  if (!classEntity) {
    ctx.addIssue({
      path: ['classId'],
      code: z.ZodIssueCode.custom,
      message: `Class Not Found`,
    })
    return z.NEVER
  }
  if (!teacher) {
    ctx.addIssue({
      path: ['teacherId'],
      code: z.ZodIssueCode.custom,
      message: `Teacher Not Found`,
    })
    return z.NEVER
  }
});

export type InsertGroupType = z.infer<typeof InsertGroupSchema>
