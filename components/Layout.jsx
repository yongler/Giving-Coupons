import ResponsiveAppBar from "./ResponsiveAppBar"

const Layout = ({ children }) => {
  return (
    <div>
      <ResponsiveAppBar />
      {children}
    </div>
  )
}

export default Layout
