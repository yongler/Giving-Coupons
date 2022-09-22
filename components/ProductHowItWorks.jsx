import * as React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import firstIcon from '../images/pair-of-bills.png'
import secondIcon from '../images/ticket.png'
import thirdIcon from '../images/donation.png'
import offwhiteBackground from '../images/offwhite-background.jpg'
import InstructionCards from './InstructionCards'

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5
}

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium'
}

const image = {
  height: 55,
  my: 4
}

function ProductHowItWorks () {
  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        bgcolor: 'secondary.light',
        overflow: 'hidden',
        backgroundImage: `url(${offwhiteBackground.src})`,
        minHeight: '95vh'
      }}
    >
      <Container
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {/* <Box
          component="img"
          src={offwhiteBackground.src}
          alt="offwhite"
          sx={{
            pointerEvents: "none",
            position: "absolute",
            top: -180,
            // opacity: 0.7,
          }}
        /> */}
        <Typography variant='h4' marked='center' component='h2' sx={{ mb: 5 }}>
          How it works
        </Typography>
        <Typography variant='subtitle1' marked='center' sx={{ mb: 10 }}>
          Giving Coupons leverages the money of donors to raise awareness and
          promote charitable giving
        </Typography>
        <div>
          <InstructionCards />
          {/* <Grid container spacing={5}>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>1.</Box>
                <Box
                  component="img"
                  src={firstIcon.src}
                  alt="money"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Donor commits $1000
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>2.</Box>
                <Box
                  component="img"
                  src={secondIcon.src}
                  alt="split"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  We redistribute 100 $10 coupons
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={item}>
                <Box sx={number}>3.</Box>
                <Box
                  component="img"
                  src={thirdIcon.src}
                  alt="donate"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Users choose which charities to donate money to
                </Typography>
              </Box>
            </Grid> */}
          {/* </Grid> */}
        </div>
      </Container>
    </Box>
  )
}

export default ProductHowItWorks
