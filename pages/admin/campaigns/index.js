import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import styles from "../../../styles/CampaignDashboard.module.css";
import Typography from "@mui/material/Typography";

export default function CampaignDashboard({ data }) {
  console.log(data);
  console.log(data[0].name);
  return (
    <div className={styles.dashboard}>
      <Typography className={styles.title} variant="h6" component="div">
        Campaigns Dashboard
      </Typography>
      <Paper className={styles.dashboardpaper} elevation={3}>
        <List>
          {data.map((campaign) => (
            <>
              <ListItem disablePadding key={campaign.id}>
                <ListItemButton href={`/admin/campaigns/${campaign.id}`}>
                  <ListItemText primary={campaign.name} />
                </ListItemButton>
              </ListItem>
              <Divider />
            </>
          ))}
          {/* <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Trash" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <ListItemText primary="Spam" />
          </ListItemButton>
        </ListItem> */}
        </List>
      </Paper>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(process.env.URL + `/api/campaigns`);
  const data = await res.json();
  return { props: { data } };
}
