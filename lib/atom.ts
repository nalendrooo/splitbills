import { initialCustomers, initialItem } from '@/features/home/constants/constant'
import { IForSome } from '@/features/home/interface'
import { atom } from 'jotai'

export const usersAtom = atom<string[]>([])
export const individualAtom = atom([initialCustomers])
export const forSomeAtom = atom<IForSome[]>([])
export const divideEvenlyAtom = atom(initialItem)

export const showDivideEvenlyAtom = atom(false)