import Heading from '@/components/Heading'
import SubsButton from '@/components/SubsButton'
import { checkSubscription } from '@/lib/subscription'

import { Settings } from 'lucide-react'

const SettingsPage = async() => {
  const isPro = await checkSubscription()
  return (
    <div>

      <Heading
      title='Settings'
      description='Manage account settings'
      icon={Settings}
      bgColor='bg-gray-700/10'
      iconColor='text-gray-700'
      />
      <div className='px-4 lg:px-8 space-y-4'>
        <div className='text-muted-foreground text-sm'>
          {isPro ? "You are currently on a PRO plan.": "You are currently on a FREE plan."}
        </div>
        <SubsButton isPro={isPro}/>
      </div>
    </div>
  )
}

export default SettingsPage