import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import styles from "../../../styles/Admin.campaigns.page.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";

export default function Campaign({ data }) {
  const campaign = data;

  console.log(campaign);
  const charityMappings = {};
  for (let i = 0; i < campaign.charitiesChosenByDonor.length; i++) {
    charityMappings[campaign.charitiesChosenByDonor[i].id] =
      campaign.charitiesChosenByDonor[i].name;
  }

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
        <Typography className={styles.title} variant="h6" component="div">
          Charities Selected
        </Typography>
        {/* <List dense={true}>
          {campaign.charitiesChosenByDonor.map((charity) => (
            <ListItem key={charity.id}>
              <ListItemText primary={charity.name} />
            </ListItem>
          ))}
        </List> */}
        <TableContainer component={Paper}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <TableCell align="center">Name</TableCell>
                {/* <TableCell align="right">Description</TableCell> */}
                {/* <TableCell align="right">Link</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {campaign.charitiesChosenByDonor.map((charity) => (
                <TableRow
                  key={charity.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell component="th" scope="row">
                  {charity.id}
                </TableCell> */}
                  <TableCell align="center">{charity.name}</TableCell>
                  {/* <TableCell align="right">{charity.description}</TableCell> */}
                  {/* <TableCell align="right">{charity.link}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography className={styles.title} variant="h6" component="div">
          Vouchers Status
        </Typography>
        <TableContainer component={Paper}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Charity Selected</TableCell>
                <TableCell align="right">Amount Added</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaign.vouchers.map((voucher) => (
                <TableRow
                  key={voucher.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {voucher.id}
                  </TableCell>
                  <TableCell align="right">
                    {voucher.status == 0
                      ? "Unredeemed"
                      : voucher.status == 1
                      ? "Redeemed"
                      : "Expired"}
                  </TableCell>
                  <TableCell align="right">
                    {voucher.charityId
                      ? charityMappings[voucher.charityId]
                      : "-"}
                  </TableCell>
                  <TableCell align="right">
                    {voucher.amountAdded ? "$" + voucher.amountAdded : "$0"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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
