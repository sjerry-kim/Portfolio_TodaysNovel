import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, modifyReview } from "../modules/mainReview";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import MainReviewModal from "./DetailReviewModal";
import "../css/DetailReview.css";

import ReviewPaging from "./ReviewPaging";

const DetailReview = (props) => {
  const { productsReviews, reviews } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const sessionId = sessionStorage.getItem("id");
  const currentUser = user.userList.find((user) => user.id == sessionId);
  const [text, setText] = useState("");
  const [modifyText, setModifyText] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);

  // Modal
  const [reviewModal, setReviewModal] = useState(false);

  useEffect(() => {
    console.log(reviews);
  }, []);

  return (
    <div className="DetailReview-wp">
      <h1>구매자 감상평</h1>
      <div className="DetailReview-review-box">
        {reviews.length != 0 ? (
          <div className="DetailReview-review-div">
            {reviews.slice(5 * (page - 1), 5 * (page - 1) + 5).map((r, i) => {
              let star = r.rate;
              const showStar = () => {
                switch (star) {
                  case 1:
                    return (
                      <Stars>
                        <FaStar className="yellowStar" />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </Stars>
                    );
                  case 2:
                    return (
                      <Stars>
                        <FaStar className="yellowStar" />
                        <FaStar className="yellowStar" />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </Stars>
                    );
                  case 3:
                    return (
                      <Stars>
                        <FaStar className="yellowStar" />
                        <FaStar className="yellowStar" />
                        <FaStar className="yellowStar" />
                        <FaStar />
                        <FaStar />
                      </Stars>
                    );
                  case 4:
                    return (
                      <Stars>
                        <FaStar className="yellowStar" />
                        <FaStar className="yellowStar" />
                        <FaStar className="yellowStar" />
                        <FaStar className="yellowStar" />
                        <FaStar />
                      </Stars>
                    );
                  case 5:
                    return (
                      <Stars>
                        <FaStar className="yellowStar" />
                        <FaStar className="yellowStar" />
                        <FaStar className="yellowStar" />
                        <FaStar className="yellowStar" />
                        <FaStar className="yellowStar" />
                      </Stars>
                    );
                }
              };
              return (
                <div key={i} className="DetailReview-review-commentbox">
                  <div className="DetailReview-review-user-star">
                    <p>{showStar()}</p>
                    <div>
                      <p>{r.text}</p>
                    </div>
                  </div>
                  <div className="DetailReview-review-user-info">
                  {currentUser ? (
                    currentUser.id == r.userId ? (
                      <button
                        onClick={() => {
                          // dispatch(deleteReview(r));
                          sessionStorage.setItem("reviewId", r.reviewId);
                          setReviewModal(true);
                          dispatch(modifyReview(r));
                        }}
                      >
                        수정하기
                      </button>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                    <p>{r.userName}</p>
                    <p>{r.date}</p>
                  </div>
                  <hr />
                </div>
              );
            })}
            <ReviewPaging reviews={reviews} page={page} setPage={setPage} />
          </div>
        ) : (
          <p>작성된 리뷰가 없습니다.</p>
        )}
      </div>

      {reviewModal ? (
        <MainReviewModal
          reviewModal={reviewModal}
          setReviewModal={setReviewModal}
          text={text}
          setText={setText}
          setModifyText={setModifyText}
        />
      ) : null}
    </div>
  );
};

export default DetailReview;

const Stars = styled.div`
  padding-top: 5px;
  & svg {
    color: gray;
    font-size: 1em;
  }
  .yellowStar {
    color: #fcc419;
  }
`;
