import * as React from "react"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import styles from "../../../../styles/Admin.campaigns.page.module.css"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableContainer from "@mui/material/TableContainer"
import { unredeemed } from "../../../../util/constants/voucherStatus"
import IconButton from "@mui/material/IconButton"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import Collapse from "@mui/material/Collapse"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import { useRouter } from "next/router"
import { auth } from "../../../../firebase/firebaseApp"
import { useAuthState } from "react-firebase-hooks/auth"
import { initialCampaign } from "../../../../util/constants/initialObjects"
import Loading from "../../../../components/Loading"
import { DataGrid } from "@mui/x-data-grid"
import EnhancedTable from "../../../../components/VoucherTable"
import Link from "@mui/material/Link"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

export default function Campaign() {
  const router = useRouter()
  const { id } = router.query
  const [campaign, setCampaign] = React.useState(initialCampaign)
  const [user] = useAuthState(auth)

  React.useEffect(() => {
    if (!user) {
      router.push("/admin")
    }

    user?.getIdToken().then((jwt) => {
      fetch("/api/campaigns/" + id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCampaign(data)
        })
    })
  }, [])

  if (campaign == null || campaign.charitiesChosenByDonor == undefined) {
    return <div className={styles.errorPage}>Invalid campaign link</div>
  }

  const charityMappings = {}
  for (let i = 0; i < campaign.charitiesChosenByDonor.length; i++) {
    charityMappings[campaign.charitiesChosenByDonor[i].id] =
      campaign.charitiesChosenByDonor[i].name
  }

  function toGMT8(utc_string) {
    let date = new Date(utc_string)
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000)
    const correctTime = date.toUTCString()
    return correctTime.split("GMT")[0]
  }

  return (
    <>
      {!user ? (
        <Loading />
      ) : (
        <div className={styles.formpage}>
          <Link href="/admin/campaigns" className={styles.backButtonColor}>
            <ArrowBackIcon className={styles.backButton} />
          </Link>
          <Typography
            className={styles.mainTitle}
            gutterBottom
            variant="h4"
            component="div"
          >
            {`Campaign Name: ${campaign.name}`}
          </Typography>
          {/* </div> */}
          <Paper className={styles.form} elevation={0}>
            <div className={styles.topPortion}>
              <Paper className={styles.campaignCard} elevation={3}>
                <Typography
                  className={styles.title}
                  variant="h6"
                  component="div"
                >
                  Details
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {`Donor:`}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {`${campaign.donor}`}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {"End Date:"}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {toGMT8(campaign.endDate)}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {`Description:`}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {`${campaign.description}`}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {`Voucher Amount:`}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {`$${campaign.voucherAmount}`}
                </Typography>
                <Typography gutterBottom variant="h6" component="div">
                  {`Number of Vouchers:`}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {`${campaign.numVouchers}`}
                </Typography>
              </Paper>
              <Paper className={styles.campaignCard} elevation={3}>
                <Typography
                  className={styles.title}
                  variant="h6"
                  component="div"
                >
                  Charities Selected
                </Typography>
                <TableContainer className={styles.table} component={Paper}>
                  <Table className={styles.table} aria-label="simple table">
                    <TableBody>
                      {campaign.charitiesChosenByDonor.map((charity) => (
                        <TableRow
                          key={charity.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center">{charity.name}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
            <div className={styles.couponsTitle}>
              <Typography
                className={styles.titleCoupons}
                variant="h6"
                component="div"
              >
                Coupons Status
              </Typography>
              <Button
                variant="contained"
                className={styles.couponsButton}
                href={`/admin/campaigns/${campaign.id}/print`}
              >
                View Coupons
              </Button>
            </div>
            <EnhancedTable
              vouchers={campaign.vouchers}
              charityMappings={charityMappings}
            />
            {/* <DataGridDemo
          vouchers={campaign.vouchers}
          charityMappings={charityMappings}
        /> */}
            {/* <TableContainer
            className={styles.table}
            component={Paper}
            sx={{ overflowX: "hidden" }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Charity Selected</TableCell>
                  <TableCell align="right">Amount Added</TableCell>
                  <TableCell align="right">Date Submitted</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaign.vouchers.map((voucher) => (
                  <VoucherRow
                    key={voucher.id}
                    voucher={voucher}
                    charityMappings={charityMappings}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}
          </Paper>
        </div>
      )}
    </>
  )
}

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "status",
    headerName: "Status",
    width: 150,
  },
  {
    field: "charity_selected",
    headerName: "Charity Selected",
    width: 300,
  },
  {
    field: "amount_added",
    headerName: "Amount Added",
    type: "number",
    width: 150,
  },
  {
    field: "date_submitted",
    headerName: "Date Submitted",
    type: "number",
    width: 300,
  },
]

function DataGridDemo(props) {
  const { vouchers, charityMappings } = props
  const voucherData = []
  const numShown = 25

  for (let i = 0; i < vouchers.length; i++) {
    const voucher = vouchers[i]
    voucherData.push({
      id: voucher.id,
      status: voucher.status == unredeemed ? "Unredeemed" : "Redeemed",
      charity_selected: voucher.charityId
        ? charityMappings[voucher.charityId]
        : "",
      amount_added: voucher.amountAdded ? "$" + voucher.amountAdded : "$0",
      date_submitted:
        voucher.status == unredeemed
          ? ""
          : new Date(voucher.timeSubmitted).toUTCString(),
    })
  }

  return (
    <Box sx={{ height: `${(numShown + 2) * 52}px`, width: "95vw" }}>
      <DataGrid
        rows={voucherData}
        columns={columns}
        pageSize={numShown}
        rowsPerPageOptions={[10]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  )
}

function VoucherRow(props) {
  const { voucher, charityMappings } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          {voucher.message && (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          )}
        </TableCell>
        <TableCell component="th" scope="row">
          {voucher.id}
        </TableCell>
        <TableCell align="right">
          {voucher.status == unredeemed ? "Unredeemed" : "Redeemed"}
        </TableCell>
        <TableCell align="right">
          {voucher.charityId ? charityMappings[voucher.charityId] : "-"}
        </TableCell>
        <TableCell align="right">
          {voucher.amountAdded ? "$" + voucher.amountAdded : "$0"}
        </TableCell>
        <TableCell align="right">
          {voucher.status == unredeemed
            ? "-"
            : new Date(voucher.timeSubmitted).toUTCString()}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                variant="body1"
                gutterBottom
                component="div"
                className={styles.messageHeader}
              >
                Message from user:
              </Typography>
              <Typography variant="body2" gutterBottom component="div">
                {voucher.message}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
