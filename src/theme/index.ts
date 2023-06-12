import { extendTheme } from '@chakra-ui/react'
import { inputTheme } from './input'
import { buttonTheme } from './button'

export const theme = extendTheme({
  components: { Button: buttonTheme, Input: inputTheme }
})
