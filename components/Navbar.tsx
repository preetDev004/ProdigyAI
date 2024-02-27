"use client"
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/MobileSidebar";

const Navbar = ({apiCount, isPro=false} : {apiCount:number, isPro:Boolean}) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar isPro={isPro} apiCount={apiCount} />

      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
