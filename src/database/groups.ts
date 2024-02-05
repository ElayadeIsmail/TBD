import { InsertGroupType } from "@/lib/validators/groups.validator";
import prisma from "./db";
import { getErrorMessage } from "@/lib/utils";


export const InsertGroup = async ({ classId, name, teacherId }: InsertGroupType) => {
  try {
    const group = await prisma.group.create({
      data: {
        name,
        teacherId,
        classEntityId: classId
      },
      select: {
        id: true
      }
    })
    return { status: "success", data: group }
  } catch (err) {
    return { status: "error", message: getErrorMessage(err) }
  }
}
