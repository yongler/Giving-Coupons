import { useRouter } from 'next/router'
import Paper from '@mui/material/Paper'
import styles from '../../styles/Coupon.module.css'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { QRCodeSVG } from 'qrcode.react'
import { DateTime } from 'luxon'

export default function Coupon ({ data }) {
  var link = 'giving-coupons.sg/voucher/' + data.id
  return (
    <Box className={styles.coupon}>
      <Box className={styles.couponLeft}>
        <Typography className={styles.title}>${data.amount}</Typography>
        <Typography className={styles.subtitle}>Giving coupon</Typography>
        <Box className={styles.description}>
          <Typography className={styles.smallText}>
            An anonymous donor has kindly sponsored this free coupon.
          </Typography>
          <Typography className={styles.smallText}>
            It entitles you to send ${data.amount} to a charity of your choice,
            for free.
          </Typography>
        </Box>
      </Box>
      <Box className={styles.couponRight}>
        <Box className={styles.instructions}>
          <Typography className={styles.instructionPart}>
            Scan this QR code
          </Typography>
          <Typography className={styles.instructionPart}>
            to redeem your coupon
          </Typography>
        </Box>
        <QRCodeSVG value={link} size='112' />
        <Typography className={styles.link}>
          <u>{link}</u>
        </Typography>
        <Typography className={styles.expiry}>
          Expires on: {DateTime.fromISO(data.deadline).toFormat('dd/MM/yy')}
        </Typography>
      </Box>
    </Box>
  )
}

export async function getServerSideProps (context) {
  // Fetch data from external API
  const id = context.params.id
  const res = await fetch(process.env.URL + `/api/vouchers/` + id)
  const voucher = await res.json()
  return { props: { data: voucher } }
}
