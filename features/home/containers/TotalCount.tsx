import { Input } from '@/components/ui/input'
import { divideEvenlyAtom, forSomeAtom, individualAtom, usersAtom } from '@/lib/atom'
import { formatRupiah } from '@/lib/format'
import { useAtom } from 'jotai'
import React, { useMemo } from 'react'

const TotalCount = () => {
    const [forSome] = useAtom(forSomeAtom)
    const [divideEvenly] = useAtom(divideEvenlyAtom)
    const [individual] = useAtom(individualAtom)

    const totalDivideEvenly = useMemo(() =>
        divideEvenly
            .map((item) => item.price)
            .reduce((a, b) => a + b, 0), [divideEvenly])

    const totalForSome = useMemo(() =>
        forSome.map((item) =>
            item.items
                .map((item) => item.price)
                .reduce((a, b) => a + b, 0))
            .reduce((a, b) => a + b, 0), [forSome])

    const totalIndividual = useMemo(() =>
        individual
            .map((item) =>
                item.items
                    .map((item) => item.price)
                    .reduce((a, b) => a + b, 0))
            .reduce((a, b) => a + b, 0), [individual])

    const total = useMemo(() =>
        totalDivideEvenly + totalForSome + totalIndividual,
        [totalDivideEvenly, totalForSome, totalIndividual])

    return (
        <div className="flex items-end gap-2">
            <div style={{ width: '70%' }}>
                <Input
                    value="Total pengeluaran"
                    readOnly
                    onChange={() => { }}
                />

            </div>
            <div>
                <Input
                    value={formatRupiah(total)}
                    readOnly
                />
            </div>

        </div>
    )
}

export default TotalCount