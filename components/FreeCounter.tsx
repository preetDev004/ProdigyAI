import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const FreeCounter = ({ apiCount }: { apiCount: number }) => {
  // prevent hydration error
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
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
          <Button className="w-full" variant="premium"><Zap className="w-4 h-4 mr-2"/> Upgrade</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
