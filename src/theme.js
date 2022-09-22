import { createTheme } from '@mui/material/styles'
import { green, red, purple } from '@mui/material/colors'

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#ec8413',
    },
    secondary: {
      main: '#f44336',
    },
  },
})

export default theme
