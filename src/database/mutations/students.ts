import { getErrorMessage } from "@/lib/utils";
import prisma from "../db";
import { InsertStudentType } from "@/lib/validators/students.validator";

export const InsertStudent = async (inputs: InsertStudentType) => {
  try {
    const student = await prisma.student.create({
      data: {
        ...inputs
      },
      select: { id: true }
    })
    return { status: "success", data: student } as const
  } catch (err) {
    return { status: "error", message: getErrorMessage(err) } as const
  }
}
