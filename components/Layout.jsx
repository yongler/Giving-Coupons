import Footer from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { makeStyles } from "@material-ui/core";

import AdbIcon from "@mui/icons-material/Adb";

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
    },
    date: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
    // avatar: {
    //   marginLeft: theme.spacing(2),
    // },
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ResponsiveAppBar />

      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
