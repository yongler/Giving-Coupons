import * as React from "react";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ResponsiveAppBar from "./ResponsiveAppBar";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar() {
  return (
    <div>
      <ResponsiveAppBar>
        {/* <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/premium-themes/onepirate/"
            sx={{ fontSize: 24 }}
          >
            {"GivingCoupons"}
          </Link> */}
        {/* <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                <Link
                color="inherit"
                variant="h6"
                underline="none"
                href="/premium-themes/onepirate/sign-in/"
                sx={rightLink}
                >
                {"Sign In"}
                </Link>
                <Link
                variant="h6"
                underline="none"
                href="/premium-themes/onepirate/sign-up/"
                sx={{ ...rightLink, color: "secondary.main" }}
                >
                {"Sign Up"}
                </Link>
            </Box> */}
        {/* </Toolbar> */}
      </ResponsiveAppBar>
    </div>
  );
}

export default AppAppBar;
