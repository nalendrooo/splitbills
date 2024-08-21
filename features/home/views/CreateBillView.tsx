'use client'
import { Progress } from "@/components/ui/progress"
import Action from "../components/Menu/Action"
import MenuAddSection from "../components/Menu/MenuAddSection"
import IndividualBill from "../containers/IndividualBill"
import Section2Bill from "../containers/Section2Bill"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const CreateBillView = () => {
    return (
        <>
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

                <div className="flex items-end gap-2">
                    <div style={{ width: '70%' }}>
                        <Input
                            // value={item.price}
                            value="Total pengeluaran"
                            readOnly
                            onChange={() => { }}
                        />

                    </div>
                    <div>
                        <Input
                            // value={item.price}
                            value="Rp. 100.000"
                            readOnly
                            onChange={() => { }}
                        // onChange={(e) => handleInputChange(indexItem, 'price', e.target.value)}
                        />
                    </div>

                </div>
                <Action />
            </div >
        </>
    )
}

export default CreateBillView