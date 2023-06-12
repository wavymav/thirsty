import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { Data } from '~/types'

export const fetchDrink = async (id: string) => {
  const { data } = await axios.get<Data[]>(
    `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id ?? ''}`
  )
  return data as Data
}

export const useDrink = (id: string) => {
  return useQuery({
    queryKey: ['drink', id],
    queryFn: () => fetchDrink(id)
  })
}
