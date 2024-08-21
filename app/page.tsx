'use client'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Header from '@/features/home/components/Header/Header'
import { placeholder } from '@/features/home/constants/constant'
import AddPeopleView from '@/features/home/views/AddPeopleView'
import CreateBillView from '@/features/home/views/CreateBillView'
import PeoplePaymentView from '@/features/home/views/PeoplePaymentView'
import { stepFormAtom, usersAtom } from '@/lib/atom'
import { useAtom, useAtomValue } from 'jotai'

const Home = () => {
  const users = useAtomValue(usersAtom)
  const [stepForm] = useAtom(stepFormAtom)

  const renderContent = () => {

    switch (stepForm) {

      case 1:
        return <AddPeopleView />

      case 2:
        return <CreateBillView />

      case 3:
        return <PeoplePaymentView />

      default:
        return null
    }
  }

  const countProgress = () => {
    if (stepForm === 1) {
      if (users.length >= 2) {
        return 30
      }
      return 0
    } else if (stepForm === 2) {
      return 60
    } else if (stepForm === 3) {
      return 100
    }
    return 0
  }

  return (
    <div className='max-w-sm mx-auto'>
      <Header />
      <Progress value={countProgress()} />
      {renderContent()}
    </div>
  )
}

export default Home