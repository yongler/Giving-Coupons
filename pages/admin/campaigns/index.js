import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import styles from "../../../styles/CampaignDashboard.module.css";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Link } from "@mui/material";

export default function CampaignDashboard({ data }) {
  console.log(data);
  console.log(data[0].name);

  return (
    <div className={styles.dashboard}>
      <Typography className={styles.title} variant="h4" component="div">
        Campaigns Dashboard
      </Typography>
      <Typography className={styles.title} variant="h6" component="div">
        Ongoing Campaigns
      </Typography>
      <TableContainer className={styles.table} component={Paper}>
        <Table className={styles.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Donor</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((campaign) => (
              <TableRow
                key={campaign.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{campaign.id}</TableCell>
                <TableCell align="right">{campaign.name}</TableCell>
                <TableCell align="right">{campaign.donor}</TableCell>
                <TableCell>
                  <Link href={`/admin/campaigns/${campaign.id}`}>
                    <IconButton aria-label="info" size="small">
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(process.env.URL + `/api/campaigns`);
  const data = await res.json();
  return { props: { data } };
}
