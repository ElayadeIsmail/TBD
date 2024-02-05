import { InsertClassSchemaType } from "@/lib/validators/classes-entity.validator";
import prisma from "./db";
import { getErrorMessage } from "@/lib/utils";

export const createClass = async (inputs: InsertClassSchemaType) => {
  try {
    const level = await prisma.level.findUnique({
      where: {
        id: inputs.levelId
      }
    })
    let className = level!.name
    if (inputs.subjects.length > 1) {
      const subjects = await prisma.subject.findMany({
        where: {
          id: { in: inputs.subjects }
        },
        select: {
          name: true
        }
      })
      const subNames = subjects.map(({ name }) => name).join(", ")
      className = `${className}, ${subNames}`
    }
    if (inputs.majors.length > 1) {
      const majors = await prisma.majorStudent.findMany({
        where: {
          id: { in: inputs.majors }
        },
        select: {
          name: true
        }
      })
      const majNames = majors.map(({ name }) => name).join(", ")
      className = `${className}, ${majNames}`
    }
    const recored = await prisma.classEntity.create({
      data: {
        name: className,
        levelId: inputs.levelId,
        price: inputs.price,
        subjects: {
          connect: inputs.subjects.map((id) => ({ id }))
        },
        majors: {
          connect: inputs.majors.map((id) => ({ id }))
        }
      },
      select: {
        id: true
      }
    })
    return { status: "success", data: recored } as const
  } catch (err) {
    return { status: "error", message: getErrorMessage(err) } as const
  }
}
