import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../css/NavbarSide.css";
import { EmptyCart } from "../modules/cart";
// import { signOut } from "../modules/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
// import { faUser, faBasketShopping } from "@fortawesome/free-regular-svg-icons";

const NavbarSide = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const review = useSelector((state) => state.mainReview);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionId = sessionStorage.getItem("id");
  const currentUser = user.userList.find((user) => user.id == sessionId);

  return (
    <div className="NavbarSide-wp">
      {
        sessionStorage.getItem("Login") !== "true" ? (
          <Link to="/signin">Sign in</Link>
        ) : (
          <div className="NavbarSide-wp-div">
            <p>반가워요, {currentUser.name}님 :)</p>
            <button
              onClick={() => {
                sessionStorage.setItem("id", null);
                sessionStorage.setItem("name", null);
                sessionStorage.setItem("Login", false);
                dispatch(EmptyCart());
                navigate('/');
              }}
            >
              Sign out
            </button>
            <Link to="/mypage"><FontAwesomeIcon icon={faUser}/></Link>
          </div>
        )
      }
      <Link to="/cart">
        <FontAwesomeIcon icon={faBasketShopping} />
      </Link>
        {
          cart.length > 0 ? 
          <span className="NavbarSide-cartbadge">{cart.length}</span>
          : ""
        }
    </div>
  );
};

export default NavbarSide;