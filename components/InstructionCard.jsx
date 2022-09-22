import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"

import Grid from "@mui/material/Grid"
import Card from "@mui/material/Card"

import styles from "../styles/InstructionCard.module.css"

function InstructionCards({ number, img, alt, text }) {
  return (
    <Grid item xs={12} md={4}>
      <Card className={styles.featuresItem}>
        <Box component="img" src={img.src} alt={alt} className={styles.icon} />
        <h2 className={styles.number}>{number}</h2>
        <Typography variant="h5" align="center" className={styles.text}>
          {text}
        </Typography>
      </Card>
    </Grid>
  )
}

export default InstructionCards
