import * as React from 'react'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import styles from '../../../../styles/Admin.campaigns.page.module.css'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableContainer from '@mui/material/TableContainer'
import { unredeemed } from '../../../../util/constants/voucherStatus'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export default function Campaign({ data }) {
  const campaign = data

  if (campaign == null || campaign.charitiesChosenByDonor == undefined) {
    return <div className={styles.errorPage}>Invalid campaign link</div>
  }

  console.log(campaign)
  const charityMappings = {}
  for (let i = 0; i < campaign.charitiesChosenByDonor.length; i++) {
    charityMappings[campaign.charitiesChosenByDonor[i].id] =
      campaign.charitiesChosenByDonor[i].name
  }

  function getDaysLeft(endDate) {
    return Math.floor(
      (Date.parse(endDate) - new Date()) / (1000 * 60 * 60 * 24)
    )
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
          {getDaysLeft(campaign.endDate) > 0
            ? `${getDaysLeft(campaign.endDate)} days left`
            : 'Campaign has ended'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`Description: ${campaign.description}`}
        </Typography>
        <Typography className={styles.title} variant="h6" component="div">
          Charities Selected
        </Typography>
        <TableContainer className={styles.table} component={Paper}>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {campaign.charitiesChosenByDonor.map((charity) => (
                <TableRow
                  key={charity.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{charity.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className={styles.couponsTitle}>
          <Typography className={styles.title} variant="h6" component="div">
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
        <TableContainer
          className={styles.table}
          component={Paper}
          sx={{ overflowX: 'hidden' }}
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
        </TableContainer>
      </Paper>
    </div>
  )
}

function VoucherRow(props) {
  const { voucher, charityMappings } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
          {voucher.status == unredeemed ? 'Unredeemed' : 'Redeemed'}
        </TableCell>
        <TableCell align="right">
          {voucher.charityId ? charityMappings[voucher.charityId] : '-'}
        </TableCell>
        <TableCell align="right">
          {voucher.amountAdded ? '$' + voucher.amountAdded : '$0'}
        </TableCell>
        <TableCell align="right">
          {voucher.status == unredeemed
            ? '-'
            : new Date(voucher.timeSubmitted).toDateString()}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Message from user:
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                {voucher.message}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  const id = context.params.id
  const res = await fetch(process.env.URL + `/api/campaigns/` + id)
  const data = await res.json()
  return { props: { data } }
}
