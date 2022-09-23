import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../styles/Loading.module.css";

export default function Loading() {
  return (
    <Box className={styles.box}>
      <CircularProgress size={100} className={styles.circularProgress} />
    </Box>
  );
}
