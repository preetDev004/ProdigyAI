import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      {/* sidebar */}
      <div className="hidden md:flex md:w-72 h-full md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar/>
      </div>

      {/* content */}
      <main className="md:pl-72">
        <Navbar/>
        {children}
      </main>

    </div>
  );
};

export default DashboardLayout;
