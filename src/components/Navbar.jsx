import NavbarLists from "./NavbarLists";
import NavbarLogo from "./NavbarLogo";
import NavbarSide from "./NavbarSide";

import "../css/Navbar.css";

const Navbar = () => {
  return (
    <div className="Navbar-wp">
      <NavbarLists />
      <NavbarLogo />
      <NavbarSide />
    </div>
  );
};

export default Navbar;
