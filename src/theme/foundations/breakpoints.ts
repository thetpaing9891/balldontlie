import { createBreakpoints } from '@chakra-ui/theme-tools'

export const breakpointValues = {
  /** mobile */
  sm: '320px',
  /** large-mobile */
  md: '620px',
  /** tablet */
  lg: '920px',
  /** large-tablet and small laptop */
  xl: '1200px',
  /** laptop (HD) */
  '2xl': '1440px',
  /** desktop (FHD) */
  '3xl': '1920px',
  /** large-desktop (2K) */
  '4xl': '3840px',
}

export default createBreakpoints(breakpointValues)
