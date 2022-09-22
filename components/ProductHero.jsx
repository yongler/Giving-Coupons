import * as React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import ProductHeroLayout from './ProductHeroLayout'
import Image from '../images/homebackground2.jpg'
import styles from '../styles/Home.module.css'

export default function ProductHero () {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${Image.src})`,
        backgroundColor: '#7fc7d9', // Average color of the background image.
        backgroundPosition: 'center'
      }}
    >
      <Typography
        className={styles.titleMain}
        color='inherit'
        align='center'
        variant='h2'
        marked='center'
      >
        Giving Coupons
      </Typography>
      <Typography
        className={styles.titleSub}
        color='inherit'
        align='center'
        variant='h5'
        sx={{ mb: 4, mt: { sx: 2, sm: 2 } }}
      >
        Giving the gift of giving
      </Typography>
    </ProductHeroLayout>
  )
}
