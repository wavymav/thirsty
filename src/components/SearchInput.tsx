import type { ChangeEvent } from 'react'
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement
} from '@chakra-ui/react'
import { TbSearch, TbX } from 'react-icons/tb'

export const SearchInput = ({
  handleOnChange,
  handleOnClear,
  search
}: {
  handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleOnClear: () => void
  search: string
}) => {
  return (
    <Box
      bg='white'
      zIndex='banner'
      position='sticky'
      top='56px'
      borderBottom='1px solid #e8e8e8'
      p='2.5'
    >
      <InputGroup size='md'>
        <InputLeftElement pointerEvents='none'>
          <TbSearch color='#89898d' size='20px' />
        </InputLeftElement>

        <Input
          pr='40px'
          type='text'
          placeholder='Find a drink'
          onChange={handleOnChange}
          value={search}
        />
        <InputRightElement>
          <IconButton
            variant='customIconButton'
            aria-label='Clear search input button'
            icon={<TbX color='white' size='12px' />}
            onClick={handleOnClear}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}
