"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { IoSearch } from "react-icons/io5";
import { FaCheckDouble } from "react-icons/fa6";
import { UserButton, useUser} from "@clerk/nextjs";

export default function DownBar() {

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
    <aside className="z-10 bottom-10 left-0 w-screen fixed border-r border-[var(--border)] flex md:hidden items-center justify-start gap-5">
      <div className="mt-10"></div>
      {isLoaded ?
        <div className="flex justify-start items-center w-fit gap-2 rounded-xl hover:bg-[var(--bg-hover)] cursor-pointer">
          <UserButton />
        </div>
       : <div className="h-18"></div>}
      {pages.map((page) => (
        <Link
          key={page.id}
          href={page.route}
          className={`text-xl rounded-xl flex gap-4 items-center ${
            page.route === currentPath && "scale-150"
          }`}
        >
          {page.icon}
        </Link>
      ))}
      <div className=" rounded-xl flex gap-4 items-center">
        <IoSearch />
        <form action={searchHandler} className="w-20">
            <input type="text" required name="search" className="w-30 border-none outline-none" placeholder="Search task..."/>
        </form>
      </div>
    </aside>
  );
}
