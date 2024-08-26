import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useTaskStore } from '@/lib/store'
import { useState } from 'react'
import { Button } from '../ui/button'


const ResetActionDialog = () => {
  const resetTasks = useTaskStore((state) => state.resetTasks);
  const resetCols = useTaskStore((state) => state.resetCols);
  const tasks = useTaskStore((state) => state.tasks);

  const [reset, setReset] = useState(2)

  const handleReset = () => {
    if (reset === 1) {
      resetTasks()
    } else {
      resetCols()
      resetTasks()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='w-full'>
          <Button
            className='w-full'
            variant="outline"
          >
            Reset
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>

        <DialogHeader>
          <DialogTitle>Ingin reset?</DialogTitle>
          <DialogDescription>
            Apakah kamu ingin mereset semuanya?
          </DialogDescription>
        </DialogHeader>

        <RadioGroup defaultValue='2' className='mt-5' onValueChange={(e) => setReset(Number(e))}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="2" />
            <Label htmlFor="2" onClick={() => setReset(2)}>Hapus semua item dan semua orang</Label>
          </div>

          {tasks.length !== 0 &&
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="1" id="1" />
              <Label htmlFor="1" onClick={() => setReset(1)}>Hapus semua item saja</Label>
            </div>
          }
        </RadioGroup>
        <div className='w-full mt-4'>
          <DialogClose asChild>
            <Button className='w-full' variant="destructive" onClick={handleReset} >Reset</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default ResetActionDialog