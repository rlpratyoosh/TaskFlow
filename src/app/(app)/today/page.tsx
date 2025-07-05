import { getTasks } from "@/prisma-db";
import TaskList from "@/components/tasks";
import { auth } from "@clerk/nextjs/server";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  userId: string | null;
  createdAt: Date;
};

export default async function TodayPage() {
  const { userId } = await auth();
  const tasks: Task[] = await getTasks(userId as string);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayTasks = tasks.filter(
    (task) => (task.createdAt.getDate() === today.getDate() && !task.completed)
  );

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl">Today</h1>
      <TaskList tasks={todayTasks} />
    </div>
  );
}
