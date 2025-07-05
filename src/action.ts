"use server";
import { addTask, deleteTask, updateTask } from "@/prisma-db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function handleSubmit(formData: FormData) {
  const title = formData.get("addTask") as string;
  if (!title.trim()) return;
  
  const { userId } = await auth();
  
  try {
    await addTask(title, userId as string);
    revalidatePath("/"); // Adjust path as needed
  } catch (error) {
    console.error("Failed to add task:", error);
    throw error;
  }
}

export async function handleDelete(id: number) {
  try {
    await deleteTask(id);
    revalidatePath("/"); // Adjust path as needed
  } catch (error) {
    console.error("Failed to delete task:", error);
    throw error;
  }
}

export async function handleToggleComplete(taskId: number, completed: boolean) {
  try {
    await updateTask(taskId, completed);
    revalidatePath("/"); // Adjust path as needed
  } catch (error) {
    console.error("Failed to update task:", error);
    throw error;
  }
}