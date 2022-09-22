import * as React from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import offwhiteBackgroundFlip from '../images/offwhite-background-flip.jpg'
import Paper from '@mui/material/Paper'

export default function ProductHowItWorks () {
  const faqStyle = { mt: 6, mb: 1, fontWeight: 500, fontSize: '25px' }

  return (
    <Box
      component='section'
      sx={{
        display: 'flex',
        overflow: 'hidden',
        backgroundImage: `url(${offwhiteBackgroundFlip.src})`,
        minHeight: '100vh'
      }}
    >
      <Container
        maxWidth='md'
        sx={{
          mt: 10,
          mb: 15,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper sx={{ p: 4 }}>
          <Typography align='center' sx={{ fontWeight: 700, fontSize: '55px' }}>
            FAQ
          </Typography>
          <Stack spacing={5}>
            <Typography sx={faqStyle}>Why are you doing this?</Typography>
            <Typography>
              In the spirit of giving and generosity, we hope to raise awareness
              about the various worthy causes in the community. Through this
              project, we hope to share the joy of giving and promote a more
              caring society.
            </Typography>
            <Typography sx={faqStyle}>
              Are there any conditions for redeeming the coupons?
            </Typography>
            <Typography>
              No, the coupons are completely free, all you need to do is to
              submit the form before the expiry date on the coupon. We do not
              require you to donate your own money.
            </Typography>
            <Typography sx={faqStyle}>Is this a scam?</Typography>
            <Typography>
              No, we do not handle or collect any money. We only encourage users
              to donate directly to charities via their websites. Contact us at
              <i> giving.coupons.sg@gmail.com </i> to receive proof of our
              donation.
            </Typography>
            <Typography sx={faqStyle}>
              How can I find out more about this project?
            </Typography>
            <Typography>
              Please contact us at <i> giving.coupons.sg@gmail.com</i>, we
              welcome your queries and feedback.
            </Typography>
          </Stack>
        </Paper>
      </Container>
    </Box>
  )
}
