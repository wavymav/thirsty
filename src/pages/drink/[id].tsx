import { Box, HStack, Square, Text, VStack } from '@chakra-ui/react'
import { Navbar } from '~/components/Navbar'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Pie, Cell } from 'recharts'
import type {
  GetStaticPropsContext,
  InferGetStaticPropsType,
  NextPage
} from 'next'
import { QueryClient } from '@tanstack/react-query'
import randomColor from 'randomcolor'
import { fetchDrink, useDrink } from '~/hooks/useDrink'
import { Loading } from '~/components/Loading'
import { NotFound } from '~/components/NotFound'
import { measure } from '~/utils/measure'
import Head from 'next/head'

const PieChart = dynamic(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  () => import('recharts').then((recharts) => recharts.PieChart),
  { ssr: false }
)

type PageProps = InferGetStaticPropsType<typeof getStaticProps>
const HomePage: NextPage<PageProps> = ({ id }: { id: string }) => {
  const { data: newData, isLoading, isError } = useDrink(id)
  const drink = newData?.drinks?.[0]
  const name = drink?.strDrink ?? 'Loading...'
  const measurements = Object.entries(drink ?? {})
    .filter((item) => item[0].includes('strMeasure') && !!item[1])
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .map((item) => item?.[1] as string)
  const ingredients = Object.entries(drink ?? {})
    .filter((item) => item[0].includes('strIngredient') && !!item[1])
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    .map((item, i) => {
      const measurement = measurements[i]?.trim()
      return {
        name: item?.[1] as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        color: randomColor({ luminosity: 'light' }),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        measurement,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        value: measure(measurement?.toLocaleLowerCase()).milliliters()
      }
    })

  const content = () => {
    if (isLoading) {
      return <Loading />
    }

    if (isError) {
      return <NotFound />
    }

    return (
      <>
        <VStack>
          <VStack mt='30px'>
            <Box rounded='full' overflow='hidden'>
              <Image
                alt='drink'
                src={drink?.strDrinkThumb ?? ''}
                height={130}
                width={130}
              />
            </Box>
            <Text fontSize='20px' mt='20px' fontWeight='bold'>
              {drink?.strDrink}
            </Text>
          </VStack>
        </VStack>
        <VStack pl='20px' w='full' align='stretch' spacing='0'>
          <Text fontSize='17px' mt='30px' mb='20px' fontWeight='bold'>
            Ingredients:
          </Text>
          <HStack alignItems='flex-start'>
            <VStack w='full' align='stretch' spacing='1' mt='20px'>
              {ingredients.map((ingredient, i) => (
                <HStack key={i}>
                  <Square size='20px' bg={ingredient.color} rounded='3px' />
                  {ingredient.measurement ? (
                    <Text fontSize='17px'>{`${ingredient.name} (${ingredient?.measurement})`}</Text>
                  ) : (
                    <Text fontSize='17px'>{`${ingredient.name}`}</Text>
                  )}
                </HStack>
              ))}
            </VStack>
            <Box m='20px'>
              <PieChart width={120} height={120}>
                <Pie
                  data={ingredients}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={60}
                  dataKey='value'
                >
                  {ingredients.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </Box>
          </HStack>
          <Text fontSize='17px' mt='30px' mb='20px' mr='20px'>
            {drink?.strInstructions}
          </Text>
        </VStack>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{`Thirsty - (${name})`}</title>
        <meta name='description' content='Thirsty drink finder app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Navbar canGoBack title={name} />
        {content()}
      </main>
    </>
  )
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const id = context.params?.id as string
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['drink', id],
    queryFn: () => fetchDrink(id)
  })

  return {
    props: {
      id
    }
  }
}

export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' }
}

export default HomePage
