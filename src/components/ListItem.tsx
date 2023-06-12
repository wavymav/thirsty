import { Box, Divider, HStack, Spacer, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { TbChevronRight } from 'react-icons/tb'

interface ListItemProps {
  id: string
  name: string
  imageUrl: string
}

export const ListItem = ({ id, name, imageUrl }: ListItemProps) => {
  return (
    <Box
      as={Link}
      href={`/drink/${id}`}
      cursor='pointer'
      _hover={{
        bg: '#fcfcfc'
      }}
    >
      <HStack spacing='15px' h='60px' pl='10px' pr='20px'>
        <Box rounded='full' overflow='hidden'>
          <Image alt='drink' src={imageUrl} height={40} width={40} />
        </Box>
        <Box>
          <Text fontWeight='medium' color='fg.emphasized'>
            {name}
          </Text>
        </Box>
        <Spacer />
        <TbChevronRight color='#c4c4c7' />
      </HStack>
      <Divider ml='20px' borderColor='#e8e8e8' opacity='1' />
    </Box>
  )
}
