'use client'
import { Badge } from '@/components/ui/badge'
import Header from '@/features/home/components/Header/Header'
import { placeholder } from '@/features/home/constants/constant'
import AddPeopleView from '@/features/home/views/AddPeopleView'
import CreateBillView from '@/features/home/views/CreateBillView'
import PeoplePaymentView from '@/features/home/views/PeoplePaymentView'
import { stepFormAtom, usersAtom } from '@/lib/atom'
import { useAtom, useAtomValue } from 'jotai'

const Home = () => {
  const users = useAtomValue(usersAtom)
  const [stepForm, setStepForm] = useAtom(stepFormAtom)

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

  return (
    <div className='max-w-sm mx-auto'>
      <Header />
      {renderContent()}
      {/* {users.length > 1 ? <CreateBillView /> : <AddPeopleView />} */}
    </div>
  )
}

export default Home