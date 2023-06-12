import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/SignUp.css";
import useInput from "../hooks/useInput";
import { signUp } from "../modules/user";
import PostModal from "../components/PostModal";
import NotFound from "./NotFound";

const SignUp = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionId = sessionStorage.getItem("id");
  const currentUser = user.userList.find((user) => user.id == sessionId);
  const [id, setId] = useInput("");
  const [pw, setPw] = useInput("");
  const [name, setName] = useInput("");
  const [tel, setTel] = useInput("");
  const [email, setEmail] = useInput("");
  const [post, setPost] = useState("");
  const [restAdress, setRestAdress] = useState("");
  const [additionalAdress, setAdditionalAdress] = useInput("");
  const [isActive, setIsActive] = useState(false);
  // Modal
  const [postModal, setPostModal] = useState(false);

  useEffect(() => {
    if (
      id &&
      pw &&
      name &&
      tel &&
      email &&
      post &&
      restAdress &&
      additionalAdress
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [id, pw, name, tel, email, post, restAdress, additionalAdress]);

  const findUser = (newUser) => {
    const sameId = user.userList.find((user) => user.id == id && user.pw == pw);
    const sameEmail = user.userList.find((user) => user.email == email);

    if (sameId) {
      alert("이미 가입한 아이디입니다");
    } else if (sameEmail) {
      alert("이미 사용된 이메일입니다");
    } else {
      dispatch(signUp(newUser));
      navigate("/signin");
    }
  };

  return (
    <>
      {currentUser ? (
        <NotFound />
      ) : (
        <div className="SignUp-wp">
          <h1>회원 가입</h1>
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              const newUser = {
                login: false,
                id: id,
                pw: pw,
                name: name,
                tel: tel,
                email: email,
                post: post,
                restAdress: restAdress,
                additionalAdress: additionalAdress,
                cart: [],
                wishList: [],
                qnaComment: [],
                orderedProducts: [],
              };
              findUser(newUser);
              sessionStorage.removeItem("signPost");
              sessionStorage.removeItem("signAddress");
            }}
          >
            <div className="SignUp-box">
              <label htmlFor="">ID</label>
              <input placeholder="ID" type="text" required onChange={setId} value={id} />
            </div>
            <div className="SignUp-box">
              <label htmlFor="">PW</label>
              <input placeholder="Password" type="password" required onChange={setPw} value={pw} />
            </div>
            <div className="SignUp-box">
              <label htmlFor="">NAME</label>
              <input placeholder="Name" type="text" required onChange={setName} value={name} />
            </div>
            <div className="SignUp-box">
              <label htmlFor="">TEL</label>
              <input placeholder="000-0000-0000" type="tel" required onChange={setTel} value={tel} />
            </div>
            <div className="SignUp-box">
              <label htmlFor="">E-MAIL</label>
              <input placeholder="todaysnovel@todays.com" type="email" required onChange={setEmail} value={email} />
            </div>
            {/* 우편번호 */}
            <div className="SignUp-box-Adress">
              <label htmlFor="">ADDRESS</label>
              <div className="SignUp-box-Adress-input-box">
                <div className="SignUp-box-Adress-post-box">
                  <input
                    type="text"
                    required
                    disabled
                    placeholder="우편 번호"
                    value={post}
                  />
                  <button
                    onClick={() => {
                      setPostModal(true);
                    }}
                  >
                    주소 찾기
                  </button>
                </div>
                <input
                  type="text"
                  required
                  disabled
                  placeholder="기본 주소"
                  value={restAdress}
                />{" "}
                <br />
                <input
                  type="text"
                  required
                  placeholder="추가 주소를 입력해주세요"
                  onChange={setAdditionalAdress}
                  value={additionalAdress}
                />
              </div>
            </div>
            <button
              disabled={isActive ? false : true}
              className={isActive? "activedBtn" : ""}
              onClick={() => {
                setPostModal(false);
              }}
            >
              sign up
            </button>
          </form>
          {postModal ? (
            <PostModal
              postModal={postModal}
              setPostModal={setPostModal}
              setPost={setPost}
              setRestAdress={setRestAdress}
            />
          ) : null}
        </div>
      )}
    </>
  );
};

export default SignUp;
