import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../styles/CharityCard.module.css";
import Link from "next/link";

export default function CampaignCard(props) {
  const { id, name, donorName, description, images, timeLeft, tags } = props;

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const openLink = () => {
    openInNewTab(link);
  };

  return (  
    <Card className={styles.charityCard}>
      <Link href={"/campaigns/" + id} key={id}>
        {/* <CardMedia component="img" height="140" image={image} alt={id} /> */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {donorName}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {`${timeLeft} left`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </Link>
      <CardActions>
        <Button size="small" onClick={openLink}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
