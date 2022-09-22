import Paper from "@mui/material/Paper";
import CampaignCard from "../../components/CampaignCard";
import styles from "../../styles/Form.module.css";
import { auth } from "../../firebase/firebaseApp";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function campaignList({ data }) {
  // list of campaigns, query the backend for the campaign data
  const campaigns = data;

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
