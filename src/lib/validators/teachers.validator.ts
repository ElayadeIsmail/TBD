import { z } from "zod"


export const InsertTeacherSchema = z.object({
  firstName: z.string().min(3, "firstname is required"),
  lastName: z.string().min(3, "lastname is required"),
  dateOfBirth: z.date().optional(),
  phoneNumber: z.string().min(10).optional(),
  cin: z.string().optional(),
  enrollmentDate: z.date(),
  address: z.string().optional(),
})


export type InsertTeacherType = z.infer<typeof InsertTeacherSchema>
