"use client";

import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FaRegStar } from "react-icons/fa6";
import { SignInButton, SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();

  const handleButton = () => {
    router.push("/today");
  };

  return (
    <main>
      <header className="bg-[var(--bg-card)] top-0 left-0 w-full p-4 sm:p-10 flex items-center justify-between border-b border-[var(--border)] flex-wrap gap-4">
        <div className="text-2xl flex items-center gap-2">
          <span className="text-[var(--accent)]">
            <IoMdCheckmarkCircleOutline />
          </span>
          TaskFlow
        </div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="flex gap-2 items-center justify-center rounded-xl px-4 py-2 bg-[var(--accent)] text-white cursor-pointer hover:bg-blue-600">
              Login
              <FaArrowRight />
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="flex gap-4 items-center">
            <UserButton />
            <button
              className="flex gap-2 items-center justify-center rounded-xl px-4 py-2 bg-[var(--accent)] text-white cursor-pointer hover:bg-blue-600"
              onClick={handleButton}
            >
              Go to app
              <FaArrowRight />
            </button>
          </div>
        </SignedIn>
      </header>

      <div className="w-full bg-[var(--bg-card)] flex flex-col items-center text-center p-8 sm:p-20 gap-4">
        <span className="text-white text-3xl sm:text-5xl max-w-xs sm:max-w-2xl">
          Organize Your Life With Using
        </span>
        <span className="text-blue-500 text-3xl sm:text-5xl max-w-xs sm:max-w-xl">
          Simple Task Manager
        </span>
        <div className="text-white opacity-50 max-w-sm sm:max-w-xl">
          Stay productive and never miss a task. TaskFlow helps you organize,
          prioritize, and complete your daily goals with an intuitive and
          beautiful interface.
        </div>
        <button
          className="mt-4 px-4 py-2 rounded-xl bg-[var(--accent)] text-white cursor-pointer hover:bg-blue-600"
          onClick={handleButton}
        >
          Start Managing Tasks +
        </button>
      </div>

      <div className="w-full py-10 px-4 sm:px-10 flex flex-col items-center text-center gap-3">
        <span className="text-2xl sm:text-3xl">Everything You Need</span>
        <div className="text-white opacity-50 max-w-3xs sm:max-w-xl">
          Powerful features to keep you organized and productive
        </div>
      </div>

      <div className="w-full p-8 sm:p-15 flex flex-col items-center text-center bg-[var(--bg-card)] gap-4">
        <div className="text-5xl sm:text-6xl text-yellow-400">
          <FaRegStar />
        </div>
        <span className="text-2xl sm:text-3xl">Ready to get organized?</span>
        <span className="text-white opacity-50 max-w-sm sm:max-w-xs">
          Join thousands of users who have transformed their productivity with
          TaskFlow
        </span>
        <button
          className="mt-4 px-4 py-2 rounded-xl bg-[var(--accent)] text-white flex gap-2 items-center justify-center cursor-pointer hover:bg-blue-600"
          onClick={handleButton}
        >
          Start Your Journey
          <FaArrowRight />
        </button>
      </div>

      <footer className="w-full flex flex-col sm:flex-row items-center justify-between p-4 sm:p-10 gap-2">
        <div className="text-xl flex items-center gap-2">
          <span className="text-[var(--accent)]">
            <IoMdCheckmarkCircleOutline />
          </span>
          TaskFlow
        </div>
        <div className="text-white opacity-50 text-sm sm:text-base">
          © 2025 TaskFlow. Built with Next.js.
        </div>
      </footer>
    </main>
  );
}
