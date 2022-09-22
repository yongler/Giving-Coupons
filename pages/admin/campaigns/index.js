import * as React from "react"
import Paper from "@mui/material/Paper"
import styles from "../../../styles/CampaignDashboard.module.css"
import Typography from "@mui/material/Typography"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableContainer from "@mui/material/TableContainer"
import IconButton from "@mui/material/IconButton"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import { Link } from "@mui/material"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import SwipeableViews from "react-swipeable-views"
import { useTheme } from "@mui/material/styles"

export default function CampaignDashboard({ data }) {
  console.log(data)
  console.log(data[0].name)
  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const ongoingCampaigns = []
  const expiredCampaigns = []
  //separate expired and non expired campaigns
  for (let i = 0; i < data.length; i++) {
    const campaign = data[i]
    if (Date.parse(campaign.endDate) - new Date() < 0) {
      expiredCampaigns.push(campaign)
    } else {
      ongoingCampaigns.push(campaign)
    }
  }

  return (
    <div className={styles.dashboard}>
      <Typography className={styles.title} variant="h4" component="div">
        Campaigns Dashboard
      </Typography>
      <Box sx={{ bgcolor: "background.paper", width: "100vw" }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Ongoing Campaigns" {...a11yProps(0)} />
            <Tab label="Expired Campaigns" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel
            value={value}
            index={0}
            dir={theme.direction}
            campaigns={ongoingCampaigns}
          ></TabPanel>
          <TabPanel
            value={value}
            index={1}
            dir={theme.direction}
            campaigns={expiredCampaigns}
          ></TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  )
}

function TabPanel(props) {
  const { children, value, index, campaigns, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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
                {campaigns.map((campaign) => (
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
          {children}
        </Box>
      )}
    </div>
  )
}

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  }
}

export async function getServerSideProps() {
  const res = await fetch(process.env.URL + `/api/campaigns`)
  const data = await res.json()
  return { props: { data } }
}
