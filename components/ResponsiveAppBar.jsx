import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Container from "@mui/material/Container"
import { Link } from "@mui/material"
import { getAuth } from "firebase/auth"
import { useRouter } from "next/router"
import icon from "../images/logo-with-name.png"
import styles from "../styles/ResponsiveAppBar.module.css"
import LogoutIcon from "@mui/icons-material/Logout"
import { Fab } from "@mui/material"

const pages = [
  { name: "Campaigns", path: "campaigns" },
  { name: "Form", path: "form" },
  { name: "Donor Form", path: "donor-form" },
  { name: "Pending campaign requests", path: "pending-campaigns" },
]
const settings = ["Profile", "Settings", "Logout"]

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const logout = async (event) => {
    event.preventDefault()
    const auth = getAuth()
    auth.signOut()
    setAnchorElUser(null)
    router.push("/")
  }

  const router = useRouter()
  const path = router.pathname
  if (
    path != "/coupon/[id]" &&
    path != "/admin/campaigns/[id]/print" &&
    path != "/"
  )
    return (
      // Hide app bar for coupon view
      router.pathname != "/coupon/[id]" &&
      router.pathname != "/admin/campaigns/[id]/print" && (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters className={styles.toolbar}>
              <Link href="/">
                <Box
                  className={styles.icon}
                  component="img"
                  src={icon.src}
                  alt="split"
                />
              </Link>

              {router.pathname.startsWith("/admin/") && (
                <Box>
                  <Fab
                    size="small"
                    color="warning"
                    variant="extended"
                    onClick={logout}
                    className={styles.logoutButton}
                  >
                    <LogoutIcon
                      className={styles.logoutButtonContent}
                      fontSize="small"
                    />
                    <h6 className={styles.logoutButtonContent}> Log Out </h6>
                  </Fab>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      )
    )
}
export default ResponsiveAppBar
