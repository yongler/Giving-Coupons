import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
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
              {/* <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GivingCoupons
            </Typography> */}
              <Link href="/">
                <Box
                  className={styles.icon}
                  component="img"
                  src={icon.src}
                  alt="split"
                />
              </Link>

              {router.pathname.startsWith("/admin") &&
                router.pathname != "/admin/login" && (
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

              {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Link href={page.path} key={page.name}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box> */}
              {/* <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Coupons
            </Typography> */}
              {/* <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link href={page.path}>{page.name}</Link>
                </Button>
              ))}
            </Box> */}

              {/* <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
            </Toolbar>
          </Container>
        </AppBar>
      )
    )
}
export default ResponsiveAppBar
