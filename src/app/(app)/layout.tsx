import SideBar from "@/components/sidebar"
import DownBar from "@/components/down-navbar"

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex gap-5">
            <SideBar />
            <DownBar />
            <div className="mt-10 ml-5">
                {children}
            </div>
        </div>
    )
}
