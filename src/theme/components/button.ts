import {
  mode,
  SystemStyleFunction,
  transparentize,
} from '@chakra-ui/theme-tools'

const schemaFocus = (c: string = 'blue', theme: any) => {
  const color = transparentize(`${c}.400`, 0.6)(theme)
  return { boxShadow: `0 0 0 2px ${color}` }
}

const variantGhost: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props

  if (c === 'gray') {
    return {
      color: mode(`inherit`, `whiteAlpha.900`)(props),
      _hover: {
        bg: mode(`gray.100`, `whiteAlpha.200`)(props),
      },
      _active: { bg: mode(`gray.200`, `whiteAlpha.300`)(props) },
    }
  }

  const darkHoverBg = transparentize(`${c}.200`, 0.12)(theme)
  const darkActiveBg = transparentize(`${c}.200`, 0.24)(theme)

  return {
    color:
      c === 'brand'
        ? mode(`brand.400`, `blue.300`)(props)
        : mode(`${c}.600`, `${c}.200`)(props),
    bg: 'transparent',
    _hover: {
      bg: mode(`${c}.50`, darkHoverBg)(props),
    },
    _active: {
      bg: mode(`${c}.100`, darkActiveBg)(props),
    },
    _focus: schemaFocus(c, theme),
  }
}

const variantOutline: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props
  const borderColor = mode(`gray.200`, `whiteAlpha.300`)(props)
  return {
    border: '1px solid',
    borderColor: c === 'gray' ? borderColor : 'currentColor',
    ...variantGhost(props),
    _focus: schemaFocus(c, theme),
  }
}

type AccessibleColor = {
  bg?: string
  color?: string
  hoverBg?: string
  activeBg?: string
}

/** Accessible color overrides for less accessible colors. */
const accessibleColorMap: { [key: string]: AccessibleColor } = {
  yellow: {
    bg: 'yellow.400',
    color: 'black',
    hoverBg: 'yellow.500',
    activeBg: 'yellow.600',
  },
  cyan: {
    bg: 'cyan.400',
    color: 'black',
    hoverBg: 'cyan.500',
    activeBg: 'cyan.600',
  },
  brand: {
    bg: 'brand.400',
    color: 'white',
    hoverBg: 'brand.300',
    activeBg: 'brand.400',
  },
}

const variantSolid: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props

  if (c === 'gray') {
    const bg = mode(`gray.100`, `whiteAlpha.200`)(props)

    return {
      bg,
      _hover: {
        bg: mode(`gray.200`, `whiteAlpha.300`)(props),
        _disabled: {
          bg,
        },
      },
      _active: { bg: mode(`gray.300`, `whiteAlpha.400`)(props) },
    }
  }

  const {
    bg = `${c}.500`,
    color = 'white',
    hoverBg = `${c}.600`,
    activeBg = `${c}.700`,
  } = accessibleColorMap[c] ?? {}

  const background = mode(bg, `${c}.200`)(props)

  return {
    bg: background,
    color: mode(color, `gray.800`)(props),
    _hover: {
      bg: mode(hoverBg, `${c}.300`)(props),
      _disabled: {
        bg: background,
      },
    },
    _active: { bg: mode(activeBg, `${c}.400`)(props) },
    _focus: schemaFocus(c, theme),
  }
}

const variantLink: SystemStyleFunction = (props) => {
  const { colorScheme: c, theme } = props
  return {
    padding: 0,
    height: 'auto',
    lineHeight: 'normal',
    verticalAlign: 'baseline',
    color:
      c === 'brand'
        ? mode('brand.400', 'brand.300')(props)
        : mode(`${c}.500`, `${c}.200`)(props),
    _hover: {
      textDecoration: 'underline',
      _disabled: {
        textDecoration: 'none',
      },
    },
    _active: {
      color:
        c === 'brand'
          ? mode(`$brand.400`, `brand.300`)(props)
          : mode(`${c}.700`, `${c}.500`)(props),
    },
    _focus: schemaFocus(c, theme),
  }
}

export default {
  baseStyle: {
    fontWeight: '600',
    borderRadius: 'lg',
  },
  variants: {
    solid: variantSolid,
    outline: variantOutline,
    ghost: variantGhost,
    link: variantLink,
  },
}
