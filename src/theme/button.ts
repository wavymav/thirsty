import { defineStyle, defineStyleConfig } from '@chakra-ui/react'

const customIconButton = defineStyle({
  borderRadius: 'full',
  background: '#8e8e93',
  height: '17px',
  width: '17px',
  color: 'white',
  minW: '17px'
})

export const buttonTheme = defineStyleConfig({
  variants: { customIconButton }
})
