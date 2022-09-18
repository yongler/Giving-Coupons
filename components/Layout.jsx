import Footer from "./Footer";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { makeStyles } from "@material-ui/core";

const Layout = ({ children }) => {
  return (
    <div>
      <ResponsiveAppBar />

      {/* main content */}
      {children}
    </div>
  );
};

export default Layout;
