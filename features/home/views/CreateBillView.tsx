'use client'
import { Progress } from "@/components/ui/progress"
import Action from "../components/Menu/Action"
import MenuAddSection from "../components/Menu/MenuAddSection"
import IndividualBill from "../containers/IndividualBill"
import Section2Bill from "../containers/Section2Bill"

const CreateBillView = () => {


    return (
        <>
            <Progress value={50} />
            <div className='min-h-screen flex p-4 gap-2 flex-col justify-between'>
                <div>

                    <div className="w-full justify-center flex py-2">
                        <MenuAddSection />
                    </div>
                    <div className='border border-slate-300 rounded-lg px-2'>

                        <IndividualBill />
                        <Section2Bill />
                    </div>
                </div>
                <Action />
            </div >
        </>
    )
}

export default CreateBillView