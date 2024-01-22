import { MessageSquare } from "lucide-react"

import Heading from "@/components/Heading"

const ConversationPage = () => {
  return (
    <div>
        <Heading
        title="Conversation"
        description="Chat with AI to grab the knowledge about any topic"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
        />
    </div>
  )
}

export default ConversationPage