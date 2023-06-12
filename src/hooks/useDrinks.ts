import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { Data } from '~/types'

export const fetchDrinks = async (name?: string) => {
  const { data } = await axios.get<Data[]>(
    `https://thecocktaildb.com/api/json/v1/1/search.php?s=${name ?? ''}`
  )
  return data as Data
}

export const useDrinks = (name?: string) => {
  return useQuery({
    queryKey: ['drinks', name],
    queryFn: () => fetchDrinks(name)
  })
}
