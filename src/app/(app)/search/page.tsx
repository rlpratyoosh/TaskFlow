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

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;
  const { userId } = await auth();
  const tasks: Task[] = await getTasks(userId as string, search);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl">Search Results</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}
