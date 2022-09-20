import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import firstIcon from "../images/pair-of-bills.png";
import secondIcon from "../images/ticket.png";
import thirdIcon from "../images/donation.png";
import styles from "../styles/InstructionCards.module.css";
import Grid from "@mui/material/Grid";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: "default",
  color: "secondary.main",
  fontWeight: "medium",
};

const image = {
  height: 55,
  my: 4,
};

function InstructionCards() {
  return (
    <div className={styles.cards}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <div className={styles.card}>
            <div className={styles.featuresItem}>
              <div className="features-icon">
                <h2 className={styles.number}>1</h2>
                <Box
                  component="img"
                  src={firstIcon.src}
                  alt="money"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Donor commits $1000
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={styles.card}>
            <div className={styles.featuresItem}>
              <div className="features-icon">
                <h2 className={styles.number}>2</h2>
                <Box
                  component="img"
                  src={secondIcon.src}
                  alt="split"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  We redistribute 100 $10 coupons
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <div className={styles.card}>
            <div className={styles.featuresItem}>
              <div className="features-icon">
                <h2 className={styles.number}>3</h2>
                <Box
                  component="img"
                  src={thirdIcon.src}
                  alt="donate"
                  sx={image}
                />
                <Typography variant="h5" align="center">
                  Users choose which charities to donate money to
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default InstructionCards;
