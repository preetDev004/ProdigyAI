import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "@/components/MobileSidebar";

const Navbar = ({apiCount} : {apiCount:number}) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiCount={apiCount} />

      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
