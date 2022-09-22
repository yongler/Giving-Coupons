import styles from "../styles/Coupon.module.css"
import Typography from "@mui/material/Typography"
import { Box } from "@mui/system"
import { QRCodeSVG } from "qrcode.react"
import { DateTime } from "luxon"

export default function Coupon({ coupon }) {
  const link = "giving-coupons.vercel.app/redeem/" + coupon.id
  return (
    <Box className={styles.coupon}>
      <Box className={styles.couponLeft}>
        <Typography className={styles.title}>
          ${coupon.campaign.voucherAmount}
        </Typography>
        <Typography className={styles.subtitle}>Giving coupon</Typography>
        <Box className={styles.description}>
          <Typography className={styles.smallText}>
            An anonymous donor has kindly sponsored this free coupon.
          </Typography>
          <Typography className={styles.smallText}>
            It entitles you to send ${coupon.campaign.voucherAmount} to a
            charity of your choice, for free.
          </Typography>
        </Box>
      </Box>
      <Box className={styles.couponRight}>
        <Box className={styles.instructions}>
          <Typography className={styles.instructionPart}>
            Scan this QR code
          </Typography>
          <Typography className={styles.instructionPart}>
            to redeem your free coupon
          </Typography>
        </Box>
        <QRCodeSVG value={"https://" + link} size="112" />
        <Typography className={styles.link}>
          <u>{link}</u>
        </Typography>
        <Typography className={styles.expiry}>
          Expires on:{" "}
          {DateTime.fromISO(coupon.campaign.endDate).toFormat("dd/MM/yy")}
        </Typography>
      </Box>
    </Box>
  )
}
