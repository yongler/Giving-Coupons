import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../styles/CharityCard.module.css";

export default function CharityCard(props) {
  const { id, name, description, image, link } = props;

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const openLink = () => {
    openInNewTab(link);
  };

  return (
    <Card className={styles.charityCard}>
      <CardMedia
        component="img"
        height={140}
        image={"/images/" + image}
        alt={id}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={openLink}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
