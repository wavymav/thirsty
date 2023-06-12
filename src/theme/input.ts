import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import {
  createMultiStyleConfigHelpers,
  defineStyle
} from '@chakra-ui/styled-system'

// eslint-disable-next-line @typescript-eslint/unbound-method
const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

// default base style from the Input theme
const baseStyle = definePartsStyle({
  field: {
    width: '100%',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    appearance: 'none',
    transitionProperty: 'common',
    transitionDuration: 'normal',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed'
    }
  }
})

// Defining a custom variant
const variantCustom = definePartsStyle(() => {
  return {
    field: {
      border: '0px solid',
      bg: '#efeff0',
      _dark: {
        bg: 'whiteAlpha.50'
      },

      _hover: {
        bg: '#efeff0',
        _dark: {
          bg: 'whiteAlpha.100'
        }
      },
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all'
      },
      _focusVisible: {
        bg: '#efeff0',
        _dark: {
          bg: 'whiteAlpha.100'
        }
      }
    }
  }
})

const variants = {
  custom: variantCustom
}

const size = {
  md: defineStyle({
    fontSize: '17px',
    px: '4',
    h: '10',
    borderRadius: 'lg'
  })
}

const sizes = {
  md: definePartsStyle({
    field: size.md
  })
}

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    size: 'md',
    variant: 'custom'
  }
})
