import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "../css/MyPageReview.css";
import { addReview } from "../modules/mainReview";
import { FaArrowCircleRight, FaStar } from "react-icons/fa";
import styled from "styled-components";
import { limitReview } from "../modules/user";

let reviewId = 7;

const MyPageReview = (props) => {
  const { reviewModal, setReviewModal } = props;
  const { id } = useParams();
  const [imgId, setImgId] = useState(1);
  const user = useSelector((state) => state.user);
  const review = useSelector((state) => state.mainReview);
  const navigate = useNavigate();
  const mainItems = useSelector((state) => state.mainState);
  const reviewItem = mainItems.find((item) => item.itemId == id);
  const dispatch = useDispatch();
  const sessionId = sessionStorage.getItem("id");
  const currentUser = user.userList.find((user) => user.id == sessionId);
  // Modal 창을 useRef로 취득
  const modalRef = useRef(null);
  // Modal 내부 내용
  const [userId, setUserId] = useState(currentUser.id);
  const [userName, setUserName] = useState(currentUser.name);
  const [userRate, setUserRate] = useState("");
  const [userText, setUserText] = useState("");
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const [userDate, setUserDate] = useState(`${year}-${month}-${day}`);
  // 별점
  const starArray = [0, 1, 2, 3, 4];
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [starScore, setStarScore] = useState();

  const handleStarClick = (sIdx) => {
    console.log(sIdx);
    let clickStates = [...clicked];
    // clicked 배열을 수정해주는 for문
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= sIdx ? true : false;
    }
    setClicked(clickStates);
  };

  useEffect(() => {
    sendReview();
    console.log(starScore);
  }, [clicked]);

  const sendReview = () => {
    let score = clicked.filter(Boolean).length;
    setStarScore(score);
  };

  useEffect(() => {
    setImgId(imgId + 1);
    console.log(imgId);
  }, []);

  return (
    <div className="MyPageReview-wp">
      <div className="MyPageReview-review-box">
        <h1>리뷰 작성</h1>
        <div className="MyPageReview-review-div">
          <img src={require(`../img/${reviewItem.image}`)} alt="no image" />
          <div className="MyPageReview-review-text-div">
            <p>
              <span>제목</span>
              {String(reviewItem.title).substring(0, 15)}
              {String(reviewItem.title).length >= 15? "..." : ""}
            </p>
            <div className="MyPageReview-review-star-div">
              <p>
                <span>평가</span>
              </p>
              <Stars>
                {starArray.map((sIdx, i) => {
                  return (
                    <FaStar
                      key={i}
                      size="30"
                      onClick={() => handleStarClick(sIdx)}
                      className={clicked[sIdx] && "yellowStar"}
                    />
                  );
                })}
              </Stars>
            </div>
            <p>
              <span>작성자</span> {userName}
            </p>
            <p>
              <span>작성일</span> {userDate}
            </p>
            {/* <RatingText>평가하기</RatingText> */}
            <textarea
              name=""
              id=""
              placeholder="리뷰를 작성해주세요 :)"
              cols="30"
              rows="10"
              onChange={(e) => {
                setUserText(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
        <div className="MypageReview-review-btn-div">
          <button
            onClick={() => {
              alert("리뷰 작성을 취소합니다");
              navigate("/mypage");
            }}
          >
            취 소
          </button>
          <button
            onClick={() => {
              if (userText) {
                dispatch(
                  addReview({
                    itemId: id,
                    reviewId: reviewId++,
                    userId: userId,
                    userName: userName,
                    rate: userRate,
                    text: userText,
                    date: userDate,
                    rate: starScore,
                  })
                );
                dispatch(
                  limitReview({
                    currentUser: sessionId,
                    myPageId: sessionStorage.getItem("myPageId"),
                  })
                );
                alert("리뷰 작성을 완료하였습니다");
                navigate("/mypage");
              } else {
                alert("리뷰 작성을 완료해주세요");
              }
            }}
          >
            리뷰 남기기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPageReview;

const Stars = styled.div`
  padding-top: 5px;

  & svg {
    color: gray;
    cursor: pointer;
  }

  :hover svg {
    color: #fcc419;
  }

  & svg:hover ~ svg {
    color: gray;
  }

  .yellowStar {
    color: #fcc419;
  }
`;
