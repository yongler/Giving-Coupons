import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import CharityCard from "../../components/CharityCard";
import Typography from "@mui/material/Typography";
import styles from "../../styles/Form.module.css";

import { auth } from "../../firebase/firebaseApp";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// export default function Campaign({campaign}) {
export default function Campaign() {
  const onSubmit = () => {
    console.log(id);
  };

  const { id } = useRouter().query;
  const [campaign, setCampaign] = useState({
    id: "",
    name: "",
    description: "",
    donor: "",
    voucherAmount: 0,
    numVouchers: 0,
    endDate: "",
    vouchers: [],
    charitiesChosenByDonor: [],
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    user.getIdToken().then((jwt) => {
      fetch("/api/campaigns/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCampaign(data);
        });
    });
  }, []);

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
          {`${campaign.endDate} left`}
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
