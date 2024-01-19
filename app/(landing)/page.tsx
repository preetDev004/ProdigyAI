import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
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
