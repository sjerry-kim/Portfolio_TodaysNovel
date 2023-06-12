import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../css/Layout.css';

const Layout = () => {
  return (  
    <div className="Layout-wp">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;