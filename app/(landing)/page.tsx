// "use client"
import { Button } from "@/components/ui/button";
// import { useSession } from "@clerk/nextjs";
import Link from "next/link";
// import { useRouter } from "next/navigation";

const LandingPage = () => {
  // const {isSignedIn} = useSession();
  // const router = useRouter()
  // if(isSignedIn) {
  //   router.push("/dashboard")
  // }
  return (
    <>
      <div>LandingPage (Unprotected)</div>
      <div>
        <Link href="/sign-in">
          <Button variant="secondary"> Log in</Button>
        </Link>
        <Link href="/sign-up">
          <Button variant="secondary"> Sign up</Button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
