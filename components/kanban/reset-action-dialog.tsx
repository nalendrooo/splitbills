import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription } from '../ui/card'


const ResetActionDialog = () => {
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
        <div className='m-auto'>
          <Card>
            <CardContent>

              <RadioGroup defaultValue="option-one" className='mt-5'>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one">Hapus semua item</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two">Hapus semua item dan semua orang</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
        <div className='w-full'>
          <Button className='w-full' variant="destructive">Reset</Button>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default ResetActionDialog