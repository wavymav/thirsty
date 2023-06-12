import { Flex, Text } from '@chakra-ui/react'

interface NotFoundProps {
  search?: string
}

export const NotFound = ({ search }: NotFoundProps) => {
  return (
    <Flex px='4' pt='14' alignItems='center' justifyContent='center'>
      <Text textAlign='center' fontSize='17px'>
        {search ? `No drinks found mating "${search}".` : 'Drink not found.'}
      </Text>
    </Flex>
  )
}
