import Typography from "@mui/material/Typography"
import styles from "../styles/Offline.module.css"

export default function Offline() {
  return (
    <div className={styles.offline}>
      <Typography variant="h1">
        Hi! It seems that you are currently offline. Connect to the WiFi and
        stay updated with GivingCoupons!
      </Typography>
    </div>
  )
}
