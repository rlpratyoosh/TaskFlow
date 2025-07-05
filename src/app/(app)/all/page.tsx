
import { getTasks } from "@/prisma-db";
import TaskList from "@/components/tasks";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Task | TaskFlow",
  description: "Listing all tasks",
};

type Task = {
  id: number;
  title: string;
  completed: boolean;
  userId: string | null;
  createdAt: Date;
};



export default async function AllPage() {
  
  const { userId } = await auth();
  const tasks: Task[] = await getTasks(userId as string);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl">All Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}
