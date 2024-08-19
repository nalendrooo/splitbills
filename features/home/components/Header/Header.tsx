import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"


const Header = () => {
    return (
        <div className='flex justify-between p-2 bg-slate-400 items-center'>
            {/* <div /> */}

            <Menubar >
                <MenubarMenu >
                    <MenubarTrigger >⌘</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>
                            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                        </MenubarItem>
                        <MenubarItem>New Window</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Share</MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem>Print</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <h2 className=" border-b bg-slate-200  text-7xl font-semibold tracking-tight first:mt-0">
                Splitbill
            </h2>
            <div />
        </div>
    )
}

export default Header