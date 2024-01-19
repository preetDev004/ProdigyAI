"use client";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";


const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="hover:bg-black/10 p-2 -ml-2 rounded-sm md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
