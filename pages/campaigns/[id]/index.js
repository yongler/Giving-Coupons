import Paper from "@mui/material/Paper";
import CharityCard from "../../../components/CharityCard";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/Form.module.css";

export default function Campaign({ data }) {
  const onSubmit = () => {
    console.log(id);
  };

  console.log(data);
  const campaign = data;

  function getDaysLeft(endDate) {
    return Math.floor(
      (Date.parse(endDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
  }

  return (
    <div className={styles.formpage}>
      <Paper className={styles.form} elevation={0}>
        <Typography gutterBottom variant="h5" component="div">
          {`Campaign Name: ${campaign.name}`}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {`Donor: ${campaign.donor}`}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {`${getDaysLeft(campaign.endDate)} days left`}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Description: ${campaign.description}`}
        </Typography>

        {campaign.charitiesChosenByDonor.map((charity) => (
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

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await fetch(process.env.URL + `/api/campaigns/` + id);
  const data = await res.json();
  return { props: { data } };
}
