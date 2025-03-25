import SideMenu from "@/components/SideMenu"

export default function AdminLayout({ children }: {children:React.ReactNode}) {
    return (
        <div>
            <SideMenu />
            <main className="p-4 ml-16"> {/* Adjust based on sidebar */}
                {children}
            </main>
        </div>
      );
}
    