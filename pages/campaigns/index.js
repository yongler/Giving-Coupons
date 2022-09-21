import Paper from "@mui/material/Paper";
import CampaignCard from "../../components/CampaignCard";
import styles from "../../styles/Form.module.css";

export default function campaignList({ data }) {
  // list of campaigns, query the backend for the campaign data
  const campaigns = data;
  console.log(data);
  //   [
  //   {
  //     id: 1,
  //     name: "Campaign underprivileged",
  //     donorName: "Big Daddy",
  //     description: "Hi all, this is a campaign for underprivileged people",
  //     timeLeft: "2 days",
  //     image: "../../../images/AutismAssociationSG.png",
  //     link: "https://www.autismlinks.org.sg/",
  //     charities: [],
  //     vouchers: [],
  //   },
  //   {
  //     id: 2,
  //     name: "Campaign special needs",
  //     donorName: "Big Daddy",
  //     description: "Hi all, this is a campaign for people with special needs",
  //     timeLeft: "3 days",
  //     image: "../../../images/Make-A-Wish-SG.png",
  //     link: "https://makeawish.org.sg/",
  //   },
  //   {
  //     id: 3,
  //     name: "Campaign elderlies",
  //     donorName: "Big Daddy",
  //     description: "Hi all, this is a campaign for elderlies",
  //     timeLeft: "4 days",
  //     image: "../../../images/FoodFromTheHeart.png",
  //     link: "https://www.foodfromtheheart.sg/",
  //   },
  // ];

  return (
    <div className={styles.formpage}>
      <Paper className={styles.form} elevation={0}>
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            name={campaign.name}
            description={campaign.description}
            donor={campaign.donor}
            endDate={campaign.endDate}
            // image={campaign.image}
            // link={campaign.link}
          />
        ))}
      </Paper>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(process.env.URL + `/api/campaigns`);
  const data = await res.json();
  return { props: { data } };
}
