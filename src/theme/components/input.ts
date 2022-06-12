import { inputAnatomy as parts } from '@chakra-ui/anatomy'
import { getColor, mode, PartsStyleFunction } from '@chakra-ui/theme-tools'

function getDefaults(props: Record<string, any>) {
  const { focusBorderColor: fc, errorBorderColor: ec } = props
  return {
    focusBorderColor: fc || mode('blue.400', 'blue.300')(props),
    errorBorderColor: ec || mode('red.400', 'red.300')(props),
  }
}

const variantAui: PartsStyleFunction<typeof parts> = (props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: '2px solid',
      borderColor: '#DFE1E6',
      borderRadius: 'base',
      bg: 'inherit',
      height: '48px',
      _hover: {
        borderColor: mode('gray.300', 'whiteAlpha.400')(props),
      },
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all',
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: `0 0 0 0.5px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      border: '1px solid',
      borderColor: mode('inherit', 'whiteAlpha.50')(props),
      bg: mode('gray.100', 'whiteAlpha.300')(props),
    },
  }
}

const variantDisabled: PartsStyleFunction<typeof parts> = (props) => {
  const { theme } = props
  const { focusBorderColor: fc, errorBorderColor: ec } = getDefaults(props)

  return {
    field: {
      border: '1px solid',
      borderColor: '#E0E0E0',
      bg: '#FAFAFA',
      _hover: {
        borderColor: mode('gray.300', 'whiteAlpha.400')(props),
      },
      _readOnly: {
        boxShadow: 'none !important',
        userSelect: 'all',
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
      },
      _invalid: {
        borderColor: getColor(theme, ec),
        boxShadow: `0 0 0 1px ${getColor(theme, ec)}`,
      },
      _focus: {
        zIndex: 1,
        borderColor: getColor(theme, fc),
        boxShadow: `0 0 0 0.5px ${getColor(theme, fc)}`,
      },
    },
    addon: {
      border: '1px solid',
      borderColor: mode('inherit', 'whiteAlpha.50')(props),
      bg: mode('gray.100', 'whiteAlpha.300')(props),
    },
  }
}

export default {
  baseStyle: {
    field: {
      borderRadius: 'lg',
      rounded: 'lg',
    },
  },
  variants: {
    aui: variantAui,
    disabled: variantDisabled,
  },
}
