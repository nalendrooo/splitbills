import AlertHowToUse from '@/components/kanban/alert-how-to-use';
import { BoardColumn, BoardContainer } from '@/components/kanban/board-column';
import { KanbanBoard } from '@/components/kanban/kanban-board';
import PageContainer from '@/components/layouts/page-container';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/ui/breadcrumbs'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BASE_URL } from '@/constants/env'
import { defaultCols2 } from '@/constants/kanban';
import { formatRupiah } from '@/lib/format';
import axios from 'axios'
import { cva } from 'class-variance-authority';
import { Ellipsis, GripVertical, Plus, Share2, Undo2 } from 'lucide-react';
// import { useParams } from 'next/navigation'
import React, { Fragment } from 'react'
import { createPortal } from 'react-dom';

const breadcrumbItems = [
    { title: 'Home', link: '/' },
    { title: 'Bills', link: '/bills' },
    { title: '5MSDVM', link: '/bills' },
];


const page = async ({ params }: any) => {
    // const params = useParams()
    // try {

    //     const data = await GetBill(params?.code)
    //     console.log(data?.data?.data)
    // } catch (error) {
    //     console.log(error)
    // }

    // console.log(params.code)
    // console.log(params)
    const variants = cva(
        'h-[75vh] max-h-[75vh] w-[300px] max-w-full bg-secondary flex flex-col flex-shrink-0 snap-center',
        {
            variants: {
                dragging: {
                    default: 'border-2 border-transparent',
                    over: 'ring-2 opacity-30',
                    overlay: 'ring-2 ring-primary'
                }
            }
        }
    );

    const variantsTask = cva('', {
        variants: {
            dragging: {
                over: 'ring-2 opacity-30',
                overlay: 'ring-2 ring-primary'
            }
        }
    });
    return (

        <div className="h-full  p-4 md:px-8 ">

            <div className="space-y-4">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex items-start justify-between flex-col gap-2">
                    <Heading title="Makan di E'tala cafe" description="Dibuat oleh Nalendro" />
                    <p className="text-xs text-muted-foreground">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum at corporis modi neque accusantium laudantium reprehenderit quidem esse vero pariatur.
                    </p>
                </div>
                <Button variant='ghost' size='sm' >
                    <Undo2 size={16} />
                </Button>
                <Button variant='ghost' size='sm'>
                    <Share2 size={16} />
                </Button>
                {/* <AlertHowToUse /> */}
                <div className='w-full sm:w-[300px] flex  justify-between top-10'>
                    <Badge variant='outline' >5 Person</Badge>
                    <Badge >Total: {formatRupiah(10000)}</Badge>
                </div>


                <div className="w-full whitespace-nowrap rounded-md">
                    <div className="flex flex-wrap sm:justify-between  sm:flex-row flex-col items-start justify-center gap-4">
                        {Array.from({ length: 10 }).map((_, i) => (

                            <Card
                                key={i}
                                //   ref={setNodeRef}
                                //   style={style}
                                className={variants()}
                            >
                                <CardHeader className="justify-between flex flex-row items-center border-b-2 p-4 text-left font-semibold ">
                                    <Button
                                        variant={'ghost'}
                                        disabled
                                        className="-ml-2 h-auto cursor-grab p-1 text-secondary-foreground/50"
                                    >
                                        <span className="sr-only">Move task</span>
                                        <GripVertical />
                                    </Button>
                                    <div className='flex '>

                                        <Input
                                            value="Nalendro"
                                            //   onChange={handleChange}
                                            className="!mt-0 mr-auto text-base disabled:cursor-pointer disabled:border-none disabled:opacity-100"
                                            disabled
                                        //   disabled={editDisable}
                                        //   ref={inputRef}
                                        //   onBlur={handleBlur}
                                        />
                                    </div>
                                    <DropdownMenu modal={false}>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="secondary" disabled className="ml-1">
                                                <span className="sr-only">Actions</span>
                                                <Ellipsis className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                    </DropdownMenu>
                                </CardHeader>
                                <CardContent className="flex flex-grow flex-col gap-4 overflow-x-hidden p-2">
                                    <div className='flex justify-between items-end'>
                                        <p className='ml-2 font-semibold'>{formatRupiah(Math.round(1000))}</p>
                                        <p className='ml-2 text-xs font-semibold'>0 Item</p>
                                    </div>
                                    <ScrollArea className="h-full">
                                        {
                                            Array(10).fill(0).map((_, index) => (
                                                <Card
                                                    //   ref={setNodeRef}
                                                    //   style={style}
                                                    key={index}
                                                    className={variantsTask()}
                                                >
                                                    <CardHeader className="space-between relative flex flex-row border-b-2 border-secondary px-3 py-3">
                                                        <Button
                                                            variant={'ghost'}
                                                            disabled
                                                            className="-ml-2 h-auto cursor-grab p-1 text-secondary-foreground/50"
                                                        >
                                                            <span className="sr-only">Move task</span>
                                                            <GripVertical />
                                                        </Button>
                                                        <Badge variant='outline' className="ml-auto font-semibold">
                                                            {formatRupiah(Math.round(1000))}
                                                        </Badge>

                                                    </CardHeader>
                                                    <CardContent className="whitespace-pre-wrap px-3 pb-6 pt-3 text-left flex flex-col relative">
                                                        Ayam bakar
                                                    </CardContent>
                                                </Card>
                                            ))
                                        }
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>


            </div>
        </div>
    )
}

function GetBill(code?: string) {
    if (!code) return

    return axios.get(BASE_URL + '/api/bills/' + code)
}

export default page