import { getErrorMessage } from '@/lib/utils';
import { InsertGroupType } from '@/lib/validators/groups.validator';
import prisma from './db';

export const InsertGroup = async ({
  classId,
  name,
  teacherId,
}: InsertGroupType) => {
  try {
    const group = await prisma.group.create({
      data: {
        name,
        teacherId,
        classEntityId: classId,
      },
      select: {
        id: true,
      },
    });
    return { status: 'success', data: group } as const;
  } catch (err) {
    return { status: 'error', message: getErrorMessage(err) } as const;
  }
};

export const UpdateGroup = async (id: string, { classId, name, students, teacherId }: InsertGroupType) => {
  try {
    const group = await prisma.group.findUnique({
      where: {
        id,
      },
      select: {
        students: {
          select: { id: true }
        }
      }
    });
    if (!group) return { status: 'error', message: 'Not Found' } as const;
    const existingIds = group.students.map(({ id }) => (id))
    // Deleted Students the ones that exists inside existingIds and not in the new student array
    const studentToDelete = existingIds.filter((id) => !students.includes(id)).map((id) => ({ id }))
    // New Students the ones that not exists inside existingIds and exists in the new student array
    const studentToAdd = students.filter((id) => !existingIds.includes(id)).map((id) => ({ studentId: id }))
    const updatedGroup = await prisma.group.update({
      where: {
        id,
      },
      select: {
        id: true
      },
      data: {
        classEntityId: classId,
        name,
        students: {
          deleteMany: studentToDelete,
          createMany: {
            skipDuplicates: true,
            data: studentToAdd,
          }
        }
      }
    })
    return { status: 'success', data: updatedGroup } as const;
  } catch (err) {
    return { status: 'error', message: getErrorMessage(err) } as const;
  }
};
