import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../css/Layout.css';

// Layout 컴포넌트에서 react-reouter-dom의 Outlet 사용
const Layout = () => {
  return (  
    <div className="Layout-wp">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;