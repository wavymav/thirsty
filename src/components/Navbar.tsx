import { Text, Box, HStack, Icon, Grid } from '@chakra-ui/react'
import { TbChevronLeft } from 'react-icons/tb'
import { Link } from '@chakra-ui/next-js'

export const Navbar = ({
  canGoBack,
  title
}: {
  canGoBack?: boolean
  title: string
}) => {
  return (
    <Grid
      zIndex='banner'
      position='sticky'
      top='0'
      h='56px'
      templateColumns={canGoBack ? 'repeat(3, 1fr)' : '1fr'}
      bg='#f6f6f6'
      alignItems='center'
      borderBottom='1px solid #d4d3d4'
    >
      {canGoBack && (
        <HStack as={Link} cursor='pointer' spacing='0' href='/'>
          <Icon as={TbChevronLeft} boxSize='24px' color='#3781f6' />
          <Text fontWeight='medium' color='#3781f6'>
            Thirsty
          </Text>
        </HStack>
      )}
      <Box textAlign='center'>
        <Text fontWeight='bold'>{title}</Text>
      </Box>
    </Grid>
  )
}
