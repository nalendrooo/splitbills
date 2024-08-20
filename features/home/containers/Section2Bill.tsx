import { Accordion } from '@/components/ui/accordion'
import React from 'react'
import DivideEvenlyBill from './DivideEvenlyBill'
import ForSomeBill from './ForSomeBill'
import { useAtomValue } from 'jotai'
import { forSomeAtom, showDivideEvenlyAtom } from '@/lib/atom'

const Section2Bill = () => {
    const forSome = useAtomValue(forSomeAtom)
    const showDivideEvenly = useAtomValue(showDivideEvenlyAtom)

    return (
        <Accordion type='multiple' className="w-full px-2">
            {showDivideEvenly && <DivideEvenlyBill />}
            {forSome.map((item, index) => <ForSomeBill itemSection={item} indexMain={index} key={index} />)}
        </Accordion>
    )
}

export default Section2Bill