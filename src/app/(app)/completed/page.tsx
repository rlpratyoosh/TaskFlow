import { getTasks } from "@/prisma-db";
import TaskList from "@/components/tasks";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Completed Tak | TaskFlow",
  description: "Listing only completed Tasks.",
};

type Task = {
  id: number;
  title: string;
  completed: boolean;
  userId: string | null;
  createdAt: Date;
};

export default async function SearchPage() {
  const { userId } = await auth();
  const tasks: Task[] = await getTasks(userId as string);
  const completedTasks = tasks.filter(task => (task.completed == true))

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl">Completed Tasks</h1>
      <TaskList tasks={completedTasks} />
    </div>
  );
}
