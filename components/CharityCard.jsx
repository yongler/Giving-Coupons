import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import styles from "../styles/CharityCard.module.css"
import * as ga from "../lib/ga"

export default function CharityCard(props) {
  const { id, name, description, image, link } = props

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer")
    if (newWindow) newWindow.opener = null
  }

  const openLink = () => {
    ga.event({
      action: "clicked to learn more about chairities",
      params: {
        link: link,
      },
    })
    openInNewTab(link)
  }

  return (
    <Card className={styles.charityCard}>
      <CardMedia
        component="img"
        height={140}
        image={"/images/" + image}
        alt={name}
        className={styles.image}
      />
      <CardContent>
        <Typography className={styles.name}>{name}</Typography>
        <Typography className={styles.description} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={styles.button}>
        <Button size="small" onClick={openLink}>
          Visit website
        </Button>
      </CardActions>
    </Card>
  )
}
