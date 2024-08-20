'use client'
import Action from "../components/Menu/Action"
import IndividualBill from "../containers/IndividualBill"
import Section2Bill from "../containers/Section2Bill"



const CreateBillView = () => {
    return (
        <div className='min-h-screen flex p-4 gap-2 flex-col justify-between'>
            <div className='border border-slate-300 rounded-lg px-2'>
                <IndividualBill />
                <Section2Bill />
            </div>
            <Action />
        </div >
    )
}

export default CreateBillView