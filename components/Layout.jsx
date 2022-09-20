import Footer from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { makeStyles } from "@material-ui/core";
import AppAppBar from "./AppAppBar";

const Layout = ({ children }) => {
  return (
    <div>
      <AppAppBar />

      {/* main content */}
      {children}
    </div>
  );
};

export default Layout;
