'use client'
import { Badge } from '@/components/ui/badge'
import Header from '@/features/home/components/Header/Header'
import { placeholder } from '@/features/home/constants/constant'
import AddPeopleView from '@/features/home/views/AddPeopleView'
import CreateBillView from '@/features/home/views/CreateBillView'
import { usersAtom } from '@/lib/atom'
import { useAtomValue } from 'jotai'

const Home = () => {
  const users = useAtomValue(usersAtom)
console.log(users)
  return (
    <div className='max-w-sm mx-auto min-h-screen'>
      <Header />
      {users.length > 1 ? <CreateBillView /> : <AddPeopleView />}
    </div>
  )
}

export default Home