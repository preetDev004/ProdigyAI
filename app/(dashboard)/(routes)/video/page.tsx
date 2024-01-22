import { VideoIcon } from "lucide-react"

import Heading from "@/components/Heading"

const VideoPage = () => {
  return (
    <div>
        <Heading
        title="Video Generation"
        description="Transform your ideas into reality by creating innovative videos with AI"
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
        />
    </div>
  )
}

export default VideoPage