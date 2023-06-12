import { Flex, Spinner } from '@chakra-ui/react'

export const Loading = () => {
  return (
    <Flex pt='14' alignItems='center' justifyContent='center'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='gray.500'
        size='lg'
      />
    </Flex>
  )
}
