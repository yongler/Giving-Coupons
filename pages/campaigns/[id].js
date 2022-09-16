import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import CharityCard from "../../components/CharityCard";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "../../styles/Form.module.css";

export const getStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  // map data to an array of path objects with params (id)
  const paths = data.map((campaign) => {
    return {
      params: { id: campaign.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  const data = await res.json();

  return {
    props: { campaign: data },
  };
};

const campaign = {
  id: 1,
  name: "Campaign underprivileged",
  donorName: "Big Daddy",
  description: "Hi all, this is a campaign for underprivileged people",
  timeLeft: "2 days",
  image: "../../../images/AutismAssociationSG.png",
  link: "https://www.autismlinks.org.sg/",
};

// list of charities, query the backend for the charity data
const charities = [
  {
    id: 1,
    name: "Autism Association (Singapore)",
    description:
      "The Autism Association (Singapore) is a Social Service Organisation in Singapore, dedicated to supporting and serving individuals with autism towards maximising their potential, helping them lead meaningful and quality lives in society.",
    image: "../../../images/AutismAssociationSG.png",
    link: "https://www.autismlinks.org.sg/",
  },
  {
    id: 2,
    name: "Make-A-Wish Singapore",
    description:
      "Make-A-Wish Singapore is a children’s charity organisation that grants the wishes of children ages 3 to 18 years old with critical illnesses. We are a part of the world’s largest wish granting organisation and the only wish granting organisation of its kind in Singapore.",
    image: "../../../images/Make-A-Wish-SG.png",
    link: "https://makeawish.org.sg/",
  },
  {
    id: 3,
    name: "Food from the Heart",
    description:
      "Food from the Heart is a IPC-status food charity that feeds the needy in Singapore. Our food distribution programmes are run with sustainable charity in mind. This means that we are committed to providing continued food security to our beneficiaries for as long as they need it.",
    image: "../../../images/FoodFromTheHeart.png",
    link: "https://www.foodfromtheheart.sg/",
  },
];

// export default function Campaign({campaign}) {
export default function Campaign() {
  const onSubmit = () => {
    console.log(id);
  };

  return (
    <div className={styles.formpage}>
      <Paper className={styles.form} elevation={0}>
        <Typography gutterBottom variant="h5" component="div">
          {`Campaign Name: ${campaign.name}`}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {`Donor: ${campaign.donorName}`}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {`${campaign.timeLeft} left`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Description: ${campaign.description}`}
        </Typography>

        {charities.map((charity) => (
          <CharityCard
            key={charity.id}
            id={charity.id}
            name={charity.name}
            description={charity.description}
            image={charity.image}
            link={charity.link}
          />
        ))}
        <button onClick={onSubmit}>Donate</button>
      </Paper>
    </div>
  );
}
