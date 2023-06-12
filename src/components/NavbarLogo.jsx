import { useNavigate } from "react-router-dom";
import "../css/NavbarLogo.css";

const NavbarLogo = () => {
  const navigate = useNavigate();

  return (
    <div className="NavbarLogo-wp">
      <img
        src={require(`../img/logo03.png`)}
        alt="no image"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
};

export default NavbarLogo;
