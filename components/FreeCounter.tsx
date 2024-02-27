import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";

const FreeCounter = ({ apiCount, isPro=false }: { apiCount: number, isPro:Boolean }) => {
  const proModal = useProModal();
  // prevent hydration error
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null;
  }
  if(isPro){
    return null;
  }
  
  return (
    <div className="px-3">
      <Card className=" bg-transparent border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-gray-400 space-y-2 mb-4">
            <p>{apiCount}/{MAX_FREE_COUNTS} Free Trials</p>
            <Progress value={(apiCount/MAX_FREE_COUNTS) *100}/>
          </div>
          <Button onClick={proModal.onOpen} className="w-full" variant="premium"><Zap className="w-4 h-4 mr-2"/> Upgrade</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
