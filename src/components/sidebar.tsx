"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoSearch } from "react-icons/io5";
import { FaCheckDouble } from "react-icons/fa6";
import { UserButton, useUser} from "@clerk/nextjs";

export default function SideBar() {

  const router = useRouter();

  const {user, isLoaded} = useUser();

  const pages = [
    {
      id: 1,
      route: "/today",
      name: "Today",
      icon: <FaRegCalendarCheck />,
    },
    {
      id: 2,
      route: "/all",
      name: "All",
      icon: <TfiMenuAlt />,
    },
    {
      id: 3,
      route: '/completed',
      name: "Completed",
      icon: <FaCheckDouble />,
    }
  ];

  const currentPath = usePathname();

  const searchHandler = (formData: FormData) => {
    const value = formData.get('search');
    value && router.push(`/search?search=${value}`)
  }

  return (
    <aside className="z-10 top-0 left-0 w-60 h-screen border-r border-[var(--border)] bg-[var(--bg-sidebar)] hidden md:flex flex-col items-center justify-start gap-5">
      <div className="mt-5"></div>
      {isLoaded ?
        <div className="flex justify-start items-center p-4 w-50 gap-2 rounded-xl hover:bg-[var(--bg-hover)] cursor-pointer">
          <UserButton />
          <span className="text-2xl opacity-50">|</span>
          <span className="mt-1">{user?.username  || user?.firstName}</span>
        </div>
       : <div className="h-18"></div>}
      {pages.map((page) => (
        <Link
          key={page.id}
          href={page.route}
          className={`text-xl pt-2 pb-2 pl-4 w-50 rounded-xl flex gap-4 items-center hover:bg-[var(--bg-hover)] ${
            page.route === currentPath && "bg-[var(--bg-hover)]"
          }`}
        >
          {page.icon}
          {page.name}
        </Link>
      ))}
      <div className="pt-2 pb-2 pl-4 w-50 rounded-xl flex gap-4 items-center">
        <IoSearch />
        <form action={searchHandler} className="w-20">
            <input type="text" required name="search" className="w-30 border-none outline-none" placeholder="Search task..."/>
        </form>
      </div>
    </aside>
  );
}
