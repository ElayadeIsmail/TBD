import { InsertTeacherType } from "@/lib/validators/teachers.validator";
import prisma from "../db";
import { getErrorMessage } from "@/lib/utils";

export const InsertTeacher = async (inputs: InsertTeacherType) => {
  try {
    const teacher = await prisma.teacher.create({
      data: {
        ...inputs
      },
      select: { id: true }
    })
    return { status: "success", data: teacher } as const
  } catch (err) {
    return { status: "error", message: getErrorMessage(err) } as const
  }
}
