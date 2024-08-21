import React from 'react'
import MenuAddSection from './MenuAddSection'
import { Button } from '@/components/ui/button'
import { useAtom } from 'jotai'
import { divideEvenlyAtom, forSomeAtom, individualAtom, stepFormAtom, usersAtom } from '@/lib/atom'

const Action = () => {
    const [users, setUsers] = useAtom(usersAtom)
    const [forSome, setForSome] = useAtom(forSomeAtom)
    const [divideEvenly, setDivideEvenly] = useAtom(divideEvenlyAtom)
    const [individual, setIndividual] = useAtom(individualAtom)

    const [stepForm, setStepForm] = useAtom(stepFormAtom)

    const handleSubmit = () => {
        console.log(users)
        console.log(individual)
        console.log(divideEvenly)
        console.log(forSome)
        setStepForm(prev => prev + 1)
    }

    const handleCancel = () => {
        setStepForm(prev => prev - 1)
    }

    return (
        <div className='flex gap-2 w-full flex-col px-2'>

            {/* <MenuAddSection /> */}

            <Button
                // disabled={isSubmitDisabled}
                onClick={handleSubmit}
            >
                {stepForm === 3 ? 'Hitung Bill Sekarang!' : 'Lanjutkan'}
            </Button>
            <Button
                variant="outline"
                onClick={handleCancel}
            >
                Gak jadi!
            </Button>
        </div>
    )
}

export default Action