import { initialAlreadyPaid, initialCustomers, initialForSome, initialItem } from '@/features/home/constants/constant'
import { IForSome } from '@/features/home/interface'
import { atom } from 'jotai'

export const usersAtom = atom<string[]>([])
export const individualAtom = atom([initialCustomers])
export const forSomeAtom = atom<IForSome[]>([initialForSome])
export const divideEvenlyAtom = atom(initialItem)
export const alreadyPaidAtom = atom([initialAlreadyPaid])

export const stepFormAtom = atom(3)

export const showDivideEvenlyAtom = atom(true)