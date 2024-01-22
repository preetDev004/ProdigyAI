import { CodeIcon } from "lucide-react"

import Heading from "@/components/Heading"

const CodePage = () => {
  return (
    <div>
        <Heading
        title="Code Generation"
        description="Ask AI to write code for you in any programming language!"
        icon={CodeIcon}
        iconColor="text-green-500"
        bgColor="bg-green-500/10"/>
    </div>
  )
}

export default CodePage