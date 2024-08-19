'use client'
import React from 'react'
import Header from '@/features/home/components/Header/Header'
import AddPeopleView from '@/features/home/views/AddPeopleView'
import CreateBillView from '@/features/home/views/CreateBillView'
import { useAtom, useAtomValue } from 'jotai'
import { customerAtom } from '@/lib/atom'

const Home = () => {
  const [customer] = useAtom(customerAtom)

  return (
    <div className='max-w-xl mx-auto'>
      <Header />
      {customer.length > 1 ? <CreateBillView /> : <AddPeopleView />}
      {/* <CreateBillView /> */}
    </div>

  )
}

export default Home