import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import CampaignCard from "../../components/CampaignCard";
import styles from "../../styles/Form.module.css";

// export const getStaticProps = async () => {
//   const res = await fetch("");
//   const data = await res.json();

//   return {
//     props: { campaigns: data },
//   };
// };

// export default function campaignList({ campaigns }) {
export default function campaignList() {
  // list of campaigns, query the backend for the campaign data
  const campaigns = [
    {
      id: 1,
      name: "Campaign underprivileged",
      donorName: "Big Daddy",
      description: "Hi all, this is a campaign for underprivileged people",
      timeLeft: "2 days",
      image: "../../../images/AutismAssociationSG.png",
      link: "https://www.autismlinks.org.sg/",
    },
    {
      id: 2,
      name: "Campaign special needs",
      donorName: "Big Daddy",
      description: "Hi all, this is a campaign for people with special needs",
      timeLeft: "3 days",
      image: "../../../images/Make-A-Wish-SG.png",
      link: "https://makeawish.org.sg/",
    },
    {
      id: 3,
      name: "Campaign elderlies",
      donorName: "Big Daddy",
      description: "Hi all, this is a campaign for elderlies",
      timeLeft: "4 days",
      image: "../../../images/FoodFromTheHeart.png",
      link: "https://www.foodfromtheheart.sg/",
    },
  ];

  return (
    <div className={styles.formpage}>
      <Paper className={styles.form} elevation={0}>
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            name={campaign.name}
            description={campaign.description}
            timeLeft={campaign.timeLeft}
            image={campaign.image}
            link={campaign.link}
          />
        ))}
      </Paper>
    </div>
  );
}
