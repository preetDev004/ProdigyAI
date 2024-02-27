import LandingContent from '@/components/LandingContent';
import LandingHero from '@/components/LandingHero';
import LandingNavbar from '@/components/LandingNavbar'
const LandingPage = () => {
  // const {isSignedIn} = useSession();
  // const router = useRouter()
  // if(isSignedIn) {
  //   router.push("/dashboard")
  // }
  return (
    <>
      <div className="h-full">
        <LandingNavbar/>
        <LandingHero/>
        <LandingContent/>
      </div>
    </>
  );
};

export default LandingPage;
