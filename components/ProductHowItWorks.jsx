import * as React from 'react'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import moneyIcon from '../images/pair-of-bills.png'
import couponIcon from '../images/ticket.png'
import giveIcon from '../images/donation.png'
import offwhiteBackground from '../images/offwhite-background.jpg'
import InstructionCard from './InstructionCard'

function ProductHowItWorks () {
  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        overflow: 'hidden',
        backgroundImage: `url(${offwhiteBackground.src})`,
        minHeight: '110vh'
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
        <Typography
          variant='h4'
          marked='center'
          component='h2'
          sx={{ mb: 4, fontWeight: 700, fontSize: '55px' }}
        >
          How it works
        </Typography>
        <Typography
          variant='subtitle1'
          marked='center'
          sx={{ mb: 10, fontWeight: 500, fontSize: '18px' }}
        >
          Giving Coupons leverages the money of donors to raise awareness and
          promote charitable giving.
        </Typography>
        <Grid container spacing={5} justifyContent='center'>
          <InstructionCard
            number={1}
            img={moneyIcon}
            text='A donor commits $1000'
            alt='donate'
          />
          <InstructionCard
            number={2}
            img={couponIcon}
            text='We distribute one hundred $10 coupons to the community '
            alt='coupon'
          />
          <InstructionCard
            number={3}
            img={giveIcon}
            text='You choose which charity receives the money'
            alt='give'
          />
        </Grid>
      </Container>
    </Box>
  )
}

export default ProductHowItWorks
