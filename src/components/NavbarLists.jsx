import { useEffect, useRef } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import '../css/NavbarLists.css';

const NavbarLists = () => {
  const [bodyOverflow, setBodyOverflow] = useState(false);
  // 🧡 ↓ overflow : hidden 관련 state → 추후 수정 예정
  // const [navbar, setNavbar] = useState(false);
  const navRef = useRef(null);

  // 🧡 ↓ overflow : hidden 관련 useEffect
  // useEffect(()=>{
  //   if(bodyOverflow){
  //     document.querySelector("body").style.overflow = "hidden"
  //   }else{
  //     document.querySelector("body").style.overflow = "auto"
  //   }
  // },[bodyOverflow])

  useEffect(()=>{
    const handler = (e) => {
      if(navRef.current && !navRef.current.contains(e.target)){
          setBodyOverflow(!bodyOverflow)
        document.querySelector("#NavbarLists-hamburger").checked = false
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  })

  return (  
    <div className="NavbarLists-wp">
      <input type="checkbox" id="NavbarLists-hamburger" />
      <label 
        class="NavbarLists-menuicon" 
        for="NavbarLists-hamburger"
        >
        <span onClick={()=>{
          // 🧡 ↓ overflow : hidden 관련 state set함수
          // setBodyOverflow(!bodyOverflow);
          console.log(bodyOverflow);
        }}
        ref={navRef}
        ></span>
      </label>
      <div className="NavbarLists-menu" >
        <div className="NavbarLists-menu-div">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/newin">New in</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        </div>
      </div>
    </div>
  );
}

export default NavbarLists;