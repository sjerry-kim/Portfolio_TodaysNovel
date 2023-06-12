import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/SignIn.css";
import { signIn } from "../modules/user";
import NotFound from "./NotFound";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const sameAccount = user.userList.find(
    (user) => user.id == id && user.pw == pw
  );
  const sessionId = sessionStorage.getItem("id");
  const currentUser = user.userList.find((user) => user.id == sessionId);
  const sameId = user.userList.find((user) => user.id == id);
  const samePw = user.userList.find((user) => user.pw == pw);

  const Login = () => {
    if (sameAccount) {
      navigate("/");
      sessionStorage.setItem("Login", true);
      sessionStorage.setItem("id", id);
      sessionStorage.setItem("name", sameAccount.name);
      dispatch(signIn(sameAccount));
      if (cart) {
        const stringfyCart = JSON.stringify(cart);
        sessionStorage.setItem("cart", stringfyCart);
      }
    } else if (sameId) {
      alert("비밀번호가 올바르지 않습니다");
    } else if (samePw) {
      alert("아이디가 올바르지 않습니다");
    } else if (sameAccount == null) {
      alert("아이디와 비밀번호를 입력하세요");
    }
  };

  return (
    <>
      {currentUser ? (
        <NotFound />
      ) : (
        <div className="SignIn-wp">
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              setTimeout(() => {
                Login();
              }, 1500);
            }}
          >
            <label htmlFor="">ID</label>
            <input
              type="text"
              placeholder=" ID"
              autoFocus
              onChange={(e) => {
                setId(e.target.value);
              }}
            />
            <label htmlFor="">PW</label>
            <input
              type="password"
              placeholder=" Password"
              onChange={(e) => {
                setPw(e.target.value);
              }}
            />
            <input
              className="SignIn-signin-btn"
              type="submit"
              value={"Login"}
            />
          </form>
          <div className="SignIn-signup-div">
            <p>아직도 Today's Novel의 회원이 아니신가요?</p>
            <button
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignIn;
