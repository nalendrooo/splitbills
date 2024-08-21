'use client'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { forSomeAtom, showDivideEvenlyAtom } from '@/lib/atom'
import { useAtom } from 'jotai'
import { Plus } from 'lucide-react'
import { initialForSome } from "../../constants/constant"

const MenuAddSection = () => {
    const [section, setSection] = useAtom(forSomeAtom)
    const [showDivideEvenly, setShowDivideEvenly] = useAtom(showDivideEvenlyAtom)

    return (
        <DropdownMenu >
            <DropdownMenuTrigger asChild>
                <Button
                    // size="icon"
                    variant="secondary"
                    className="shrink-0 rounded-full "
                >
                    Tambah bill baru
                    <Plus className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Type bills</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem disabled={showDivideEvenly} onClick={() => setShowDivideEvenly(prev => !prev)}>Bagi ke semua orang</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSection(prev => [...prev, initialForSome])}>Beberapa orang aja ({section.length + 1})</DropdownMenuItem>
                <DropdownMenuItem disabled>more...</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MenuAddSection