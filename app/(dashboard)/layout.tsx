import CrispProvider from "@/components/CrispProvider";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getUserApiUsage } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiCount = await getUserApiUsage();
  const isPro = await checkSubscription()
  return (
    <>
    <CrispProvider/>
    <div className="h-full relative">
      {/* sidebar */}
      <div className="hidden md:flex md:w-72 h-full md:flex-col md:fixed md:inset-y-0 z-[40] bg-gray-900">
  
          <Sidebar isPro={isPro} apiCount={apiCount}  />
      </div>

      {/* content */}
      <main className="md:pl-72">
        <Navbar isPro={isPro} apiCount={apiCount} />
        {children}
      </main>
    </div>
    </>
  );
};

export default DashboardLayout;
