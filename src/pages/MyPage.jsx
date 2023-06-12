import { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo, setIndex } from "../modules/user";

import "../css/MyPage.css";
import MyPageReview from "../components/MyPageReview";
import { useNavigate } from "react-router-dom";
import PostModal from "../components/PostModal";
import NotFound from "./NotFound";

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const review = useSelector((state) => state.mainReview);
  const sessionId = sessionStorage.getItem("id");
  const currentUser = user.userList.find((user) => user.id == sessionId);
  const [changeInfo, setChageInfo] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [id, setId] = useState(currentUser.id);
  const [pw, setPw] = useState(currentUser.pw);
  const [checkPw, setChecekPw] = useState("");
  const [tel, setTel] = useState(currentUser.tel);
  const [email, setEmail] = useState(currentUser.email);
  const [post, setPost] = useState(currentUser.post);
  const [restAdress, setRestAdress] = useState(currentUser.restAdress);
  const [additionalAdress, setAdditionalAdress] = useState(
    currentUser.additionalAdress
  );
  const [reviewModal, setReviewModal] = useState(false);
  const [postModal, setPostModal] = useState(false);

  useEffect(() => {
    console.log(review[0]);
    console.log(currentUser);
  });

  const changeProfile = () => {
    const profile = {
      name: name,
      id: id,
      pw: pw,
      tel: tel,
      email: email,
      post: post,
      restAdress: restAdress,
      additionalAdress: additionalAdress,
    };
    dispatch(changeUserInfo(profile));
  };

  const myPageInfoKey = [
    {
      keyK: "이름",
      keyE: name,
    },
    {
      keyK: "아이디",
      keyE: id,
    },
    {
      keyK: "비밀번호",
      keyE: pw,
    },
    {
      keyK: "전화번호",
      keyE: tel,
    },
    {
      keyK: "이메일",
      keyE: email,
    },
  ];

  return (
    <div className="MyPage-wp">
      <div className="MyPage-profile">
        <h1>My Page</h1>
        <p>{currentUser.name}님은 '일반회원'이십니다.</p>
        {myPageInfoKey.map((k, i) => (
          <div key={i} className="MyPage-profile-div">
            <label htmlFor="">{k.keyK}</label>
            <input
              type={i == 2 ? "password" : "text"}
              disabled={!changeInfo}
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={k.keyE}
            />
            {i == 2 ? (
              <>
                <input
                  type="password"
                  className="MyPage-check-pw"
                  autoFocus
                  onChange={(e) => {
                    setChecekPw(e.target.value);
                  }}
                  placeholder="패스워드 확인"
                />
                <p>* 비밀번호 확인</p>
              </>
            ) : (
              ""
            )}
          </div>
        ))}

        <div className="MyPage-profile-div">
          <label htmlFor="">주소</label>
          <div className="MyPage-profile-adress-box">
            <div className="MyPage-profile-adress-div">
              <input type="text" disabled value={post} />
              <button
                disabled={!changeInfo}
                onClick={() => {
                  setPostModal(true);
                }}
              >
                주소 찾기
              </button>{" "}
            </div>
            <div className="MyPage-profile-adress-div MyPage-adress-input">
              <input type="text" disabled value={restAdress} />
              <p>* 기본주소</p>
            </div>
            <div className="MyPage-profile-adress-div MyPage-adress-input">
              <input
                type="text"
                disabled={!changeInfo}
                onChange={(e) => {
                  setAdditionalAdress(e.target.value);
                }}
                value={additionalAdress}
              />
              <p>* 나머지주소</p>
            </div>
          </div>
        </div>

        {changeInfo ? (
          <button
            onClick={() => {
              if (checkPw == pw) {
                setChageInfo(false);
                changeProfile();
                alert("수정되었습니다");
              } else if (checkPw == "") {
                alert("패스워드를 입력해주세요");
              } else {
                alert("패스워드가 일치하지 않습니다");
              }
            }}
          >
            저장
          </button>
        ) : (
          <button
            onClick={() => {
              if (checkPw == pw) {
                setChageInfo(true);
              } else if (checkPw == "") {
                alert("패스워드를 확인하세요");
              } else {
                alert("패스워드가 일치하지 않습니다");
              }
            }}
          >
            내 정보 수정
          </button>
        )}
      </div>
      <div className="MyPage-purchasedProducts">
        <h1>주문 내역</h1>
        {currentUser.orderedProducts[0] ? (
          <table className="MyPage-purchasedProducts-table">
            <tr className="MyPage-purchasedProducts-tr MyPage-tr-head">
              <td>상품명</td>
              <td>이미지</td>
              <td>수량</td>
              <td>주문일</td>
              <td>리뷰</td>
            </tr>
            {currentUser.orderedProducts.map((p) => (
              <tr className="MyPage-purchasedProducts-tr MyPage-tr">
                <td>
                  <p>
                    {String(p.title).substring(0, 15)}
                    {String(p.title).length >= 15 ? "..." : ""}
                  </p>
                </td>
                <td>
                  <img
                    onClick={() => {
                      navigate(`/shop/${p.itemId}`);
                      window.scrollTo(0, 0);
                    }}
                    src={require(`../img/${p.image}`)}
                    alt="no image"
                  />
                </td>
                <td>
                  <p>{p.itemTotalCount}</p>
                </td>
                <td>
                  <p>{p.orderDate}</p>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setReviewModal(true);
                      sessionStorage.setItem("myPageId", p.myPageId);
                      navigate(`/mypage/${p.itemId}`);
                    }}
                    disabled={p.isReviewed ? true : false}
                    className={
                      p.isReviewed
                        ? "MyPage-review-btn-disable"
                        : "MyPage-review-btn-able"
                    }
                  >
                    {p.isReviewed ? "리뷰 작성 완료" : "리뷰 작성하기"}
                  </button>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <p>주문한 상품이 없습니다.</p>
        )}
      </div>
      {postModal ? (
        <PostModal
          postModal={postModal}
          setPostModal={setPostModal}
          setPost={setPost}
          setRestAdress={setRestAdress}
        />
      ) : null}
    </div>
  );
};

export default MyPage;
