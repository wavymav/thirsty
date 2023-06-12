import { Box, Stack } from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'

import { type NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { NotFound } from '~/components/NotFound'
import { ListItem } from '~/components/ListItem'
import { Loading } from '~/components/Loading'
import { Navbar } from '~/components/Navbar'
import { SearchInput } from '~/components/SearchInput'
import { fetchDrinks, useDrinks } from '~/hooks/useDrinks'

const Home: NextPage = () => {
  const [name, setName] = useState<string>('')
  const { data, isLoading } = useDrinks(name)
  const drinks = data?.drinks ?? []

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value)

  const handleOnClear = () => setName('')

  const content = () => {
    if (isLoading) {
      return <Loading />
    }

    return (
      <Stack spacing='0'>
        {drinks.length > 0 ? (
          drinks.map((drink) => (
            <ListItem
              key={drink.idDrink}
              id={drink.idDrink}
              name={drink.strDrink}
              imageUrl={drink.strDrinkThumb}
            />
          ))
        ) : (
          <NotFound search={name} />
        )}
      </Stack>
    )
  }

  return (
    <>
      <Head>
        <title>Thirsty</title>
        <meta name='description' content='Thirsty drink finder app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Box h='100vh' overflow='hidden'>
        <Navbar title='Thirsty' />
        <SearchInput
          handleOnChange={handleOnChange}
          handleOnClear={handleOnClear}
          search={name}
        />
        {content()}
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['drinks'],
    queryFn: () => fetchDrinks()
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default Home
