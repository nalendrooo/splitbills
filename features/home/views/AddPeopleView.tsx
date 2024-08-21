import React from 'react'
import FormAddPeopleDrawer from '../components/Drawer/FormAddPeopleDrawer'
import { Progress } from '@/components/ui/progress'
import { usersAtom } from '@/lib/atom'
import { useAtomValue } from 'jotai'

const AddPeopleView = () => {
   

    return (
        <>
           
            <div className='flex justify-center min-w-full w-full items-center gap-2 min-h-screen'>
                <FormAddPeopleDrawer />
            </div >
        </>

    )
}

export default AddPeopleView