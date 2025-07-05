
import { PrismaClient } from "./generated/prisma";
const prisma = new PrismaClient();

export async function getTasks(userId: string, query?: string) {
  if (query) {
    return prisma.task.findMany({
      where: {
        title: { contains: query },
        userId: { contains: userId}
      },
    });
  }
  return prisma.task.findMany({
    where: {
      userId: { contains: userId}
    }
  });
}


export async function addTask(title: string, userId: string) {
  return prisma.task.create({
    data: { title, userId},
  });
}

export async function updateTask(id: number, status: boolean) {
  return prisma.task.update({
    where: { id },
    data: { completed: status },
  });
}

export async function deleteTask(id: number) {
  return prisma.task.delete({
    where: { id },
  });
}
