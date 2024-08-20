'use client'
import Header from '@/features/home/components/Header/Header'
import AddPeopleView from '@/features/home/views/AddPeopleView'
import CreateBillView from '@/features/home/views/CreateBillView'
import { usersAtom } from '@/lib/atom'
import { useAtomValue } from 'jotai'

const Home = () => {
  const users = useAtomValue(usersAtom)

  return (
    <div className='max-w-xl mx-auto min-h-screen'>
      <Header />
      {users.length > 1 ? <CreateBillView /> : <AddPeopleView />}
    </div>
  )
}

export default Home