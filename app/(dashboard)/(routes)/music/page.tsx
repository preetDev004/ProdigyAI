import { MusicIcon } from "lucide-react"

import Heading from "@/components/Heading"

const MusicPage = () => {
  return (
    <div>
        <Heading
        title="Music Generation"
        description="Elevate your musical journey to new heights with AI-generated melodies"
        icon={MusicIcon}
        iconColor="text-emerald-700"
        bgColor="bg-emerald-700/10"
        />
    </div>
  )
}

export default MusicPage