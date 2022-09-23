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
import Link from "next/link"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import SwipeableViews from "react-swipeable-views"
import { useTheme } from "@mui/material/styles"
import { auth } from "../../../firebase/firebaseApp"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import Loading from "../../../components/Loading"
import { Button } from "@mui/material"

export default function CampaignDashboard() {
  const [data, setData] = React.useState([])
  const [user] = useAuthState(auth)
  const router = useRouter()

  React.useEffect(() => {
    if (!user) {
      router.push("/admin")
    }

    user?.getIdToken().then((jwt) => {
      fetch("/api/campaigns/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + jwt,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })
    })
  }, [])

  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const handleAddCampaign = () => {}

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
    <>
      {!user ? (
        <Loading />
      ) : (
        <div className={styles.dashboard}>
          <Typography className={styles.title} variant="h4" component="div">
            Campaigns Dashboard
          </Typography>
          <Box
            sx={{
              bgcolor: "background.paper",
              width: "95vw",
              marginLeft: "2.5vw",
            }}
          >
            <AppBar className={styles.tabs} position="static">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab
                  className={styles.tab}
                  label="Ongoing Campaigns"
                  {...a11yProps(0)}
                />
                <Tab
                  className={styles.tab}
                  label="Expired Campaigns"
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            <Link href={"/admin/campaigns/create"}>
              <Button variant="contained" className={styles.tab}>
                Add campaign
              </Button>
            </Link>
            {/* <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
            > */}
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
            {/* </SwipeableViews> */}
          </Box>
        </div>
      )}
    </>
  )
}

function TabPanel(props) {
  const { children, value, index, campaigns, ...other } = props

  function toGMT8(utc_string) {
    let date = new Date(utc_string)
    date.setTime(date.getTime() + 8 * 60 * 60 * 1000)
    const correctTime = date.toUTCString()
    return correctTime.split("GMT")[0]
  }

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
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Donor</TableCell>
                  <TableCell align="right">End Date</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((campaign) => (
                  <Link
                    key={campaign.id}
                    href={`/admin/campaigns/${campaign.id}`}
                    className={styles.link}
                  >
                    <TableRow
                      key={campaign.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{campaign.id}</TableCell>
                      <TableCell align="right">{campaign.name}</TableCell>
                      <TableCell align="right">{campaign.donor}</TableCell>
                      <TableCell align="right">
                        {toGMT8(campaign.endDate)}
                      </TableCell>
                      <TableCell align="right">
                        <Link href={`/admin/campaigns/${campaign.id}`}>
                          <IconButton aria-label="info" size="small">
                            <KeyboardArrowRightIcon />
                          </IconButton>
                        </Link>
                      </TableCell>
                    </TableRow>
                  </Link>
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
