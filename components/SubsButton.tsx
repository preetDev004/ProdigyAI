"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import { Loader } from "@/components/Loader";
import toast from "react-hot-toast";

interface SubsButtonProps {
  isPro: Boolean;
}

const SubsButton = ({ isPro = false }: SubsButtonProps) => {
    const [loading, setLoading] = useState(false)
  const onClick = async () => {
    try {
        setLoading(true)
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url
    } catch (error) {
      
     toast.error("Somthing went wrong!",{duration:2000})
      
    }
    finally{
        setLoading(false)
    }
  };
  return (
    <>
  
    <Button disabled={loading} variant={isPro ? "default" : "premium"} onClick={onClick}>
      {" "}
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && (
        <Zap
          size={20}
          strokeWidth={3}
          absoluteStrokeWidth
          className="w-4 h-4 ml-2"
        />
      )}
    </Button>
    {loading && <div className="w-full">
        <Loader msg='Please Wait...'/>
    </div>}
    </>

  );
};

export default SubsButton;
