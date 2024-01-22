import { ImageIcon } from "lucide-react"

import Heading from "@/components/Heading"

const ImagePage = () => {
  return (
    <div>
        <Heading
        title="Image Generation"
        description="Turn words into art and create unique & surreal images with AI"
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
        />
    </div>
  )
}

export default ImagePage