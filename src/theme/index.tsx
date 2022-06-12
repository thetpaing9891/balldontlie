import { PropsWithChildren } from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import components from './components'
import foundations from './foundations'

const theme = extendTheme({
  ...foundations,
  components,
})

export function ThemeProvider({ children }: PropsWithChildren<{}>) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default theme
