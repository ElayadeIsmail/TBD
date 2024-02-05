import prisma from '@/database/db';
import { Gender } from '@prisma/client';
import { z } from 'zod';

export const InsertStudentSchema = z
  .object({
    firstName: z.string().min(3, 'firstname is required'),
    lastName: z.string().min(3, 'lastname is required'),
    dateOfBirth: z.date().optional(),
    phoneNumber: z.string().min(10).optional(),
    cin: z.string().optional(),
    enrollmentDate: z.date(),
    emergencyContact: z.string().optional(),
    address: z.string().optional(),
    gender: z.enum([Gender.Male, Gender.Female]),
    levelId: z.string().min(24),
    majorId: z.string().min(24).optional(),
  })
  .superRefine(async ({ levelId, majorId }, ctx) => {
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
    if (majorId) {
      const major = await prisma.majorStudent.findUnique({
        where: {
          id: majorId
        }
      })
      if (!major) {
        ctx.addIssue({
          path: ['majorId'],
          code: z.ZodIssueCode.custom,
          message: `Major Not Found`,
        })
        return z.NEVER
      }
    }
  });

export type InsertStudentType = z.infer<typeof InsertStudentSchema>;
