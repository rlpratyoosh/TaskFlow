"use client";
import { useTransition, useState, useOptimistic } from "react";
import { MdDelete } from "react-icons/md";
import { handleSubmit, handleDelete, handleToggleComplete } from "@/action";
import CheckboxButton from "./checkbox";
import { usePathname } from "next/navigation";

type Task = {
  id: number;
  title: string;
  completed: boolean;
  userId: string | null;
  createdAt: Date;
};

type OptimisticAction =
  | { type: "toggle"; id: number; completed: boolean }
  | { type: "delete"; id: number }
  | { type: "add"; task: Task };

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const currentPath = usePathname();

  // Optimistic updates
  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (state: Task[], action: OptimisticAction) => {
      switch (action.type) {
        case "toggle":
          return state.map((task) =>
            task.id === action.id
              ? { ...task, completed: action.completed }
              : task
          );
        case "delete":
          return state.filter((task) => task.id !== action.id);
        case "add":
          return [...state, action.task];
        default:
          return state;
      }
    }
  );

  const handleToggle = async (task: Task) => {
    setError(null);
    const newCompleted = !task.completed;

    // Optimistic update
    addOptimisticTask({
      type: "toggle",
      id: task.id,
      completed: newCompleted,
    });

    startTransition(async () => {
      try {
        await handleToggleComplete(task.id, newCompleted);
      } catch (err) {
        setError("Failed to update task");
        console.error("Error toggling task:", err);
      }
    });
  };

  const handleDeleteTask = async (taskId: number) => {
    setError(null);

    // Optimistic update
    addOptimisticTask({
      type: "delete",
      id: taskId,
    });

    startTransition(async () => {
      try {
        await handleDelete(taskId);
      } catch (err) {
        setError("Failed to delete task");
        console.error("Error deleting task:", err);
      }
    });
  };

  const handleAddTask = async (formData: FormData) => {
    const title = formData.get("addTask") as string;
    if (!title.trim()) return;

    setError(null);

    const tempTask: Task = {
      id: Date.now(), // Temporary ID
      title: title.trim(),
      completed: false,
      userId: null,
      createdAt: new Date(),
    };

    addOptimisticTask({
      type: "add",
      task: tempTask,
    });

    startTransition(async () => {
      try {
        await handleSubmit(formData);
      } catch (err) {
        setError("Failed to add task");
        console.error("Error adding task:", err);
      }
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {tasks.length === 0 && (
        <div className="text-red-700 px-4 py-3 rounded">
          No task to show!
        </div>
      )}

      {optimisticTasks.map((task) => (
        <div
          key={task.id}
          className={`flex items-center gap-4 p-4 transition-all duration-200`}
        >
          <CheckboxButton
            checked={task.completed}
            onToggle={() => handleToggle(task)}
          />
          <span
            className={`text-xl flex-1 transition-all duration-200 ${
              task.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {task.title}
          </span>
          <button
            onClick={() => handleDeleteTask(task.id)}
            className="text-xl cursor-pointer opacity-20 hover:opacity-100 hover:text-red-500 transition-all duration-200 flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-50"
            aria-label={`Delete task: ${task.title}`}
            disabled={isPending}
          >
            <MdDelete />
          </button>
        </div>
      ))}

      {(currentPath != "/completed" && currentPath != "/search") && (
        <div className="flex items-center gap-4 p-4">
          <div className="w-5 h-5" />
          <form action={handleAddTask} className="flex gap-2 flex-1">
            <input
              type="text"
              name="addTask"
              className="flex-1 border-none outline-none bg-transparent placeholder-gray-500 w-40 sm:w-50"
              placeholder="Add a new task..."
              required
            />
            <button
              type="submit"
              className="bg-green-400 hover:bg-green-500 px-4 py-2 rounded-xl text-violet-950 font-medium transition-colors duration-200 disabled:opacity-50"
              disabled={isPending}
            >
              Add +
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
