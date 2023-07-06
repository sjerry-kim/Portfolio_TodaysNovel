import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/DetailReviewModal.css";
import { modifyReview } from "../modules/mainReview";

const DetailReviewModal = (props) => {
  const { reviewModal, setReviewModal, text, setText, setModifyText } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const sessionId = sessionStorage.getItem("id");
  const currentUser = user.userList.find((user) => user.id == sessionId);

  // Modal 창을 useRef로 취득
  const modalRef = useRef(null);

  useEffect(() => {
    // 이벤트 핸들러 함수
    const handler = (event) => {
      // mousedown 이벤트가 발생한 영역이 모달창이 아닐 때, 모달창 제거 처리
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setReviewModal(false);
      }
    };

    // 이벤트 핸들러 등록
    document.addEventListener("mousedown", handler);

    // document.addEventListener('touchstart', handler); // 모바일 대응

    return () => {
      // 이벤트 핸들러 해제
      document.removeEventListener("mousedown", handler);
      // document.removeEventListener('touchstart', handler); // 모바일 대응
    };
  });

  return (
    <div
      ref={modalRef}
      className={`DetailReviewModal-wp ${
        reviewModal ? "DetailReviewModal-open" : ""
      }`}
    >
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="리뷰를 다시 작성해주세요!"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <div className="DetailReviewModal-btndiv">
        <button
          onClick={() => {
            setReviewModal(false);
          }}
        >
          취소
        </button>
        <button
          onClick={() => {
            if (window.confirm("리뷰를 수정하시겠습니까?")) {
              alert("수정 완료되었습니다");
              dispatch(
                modifyReview({
                  userId: currentUser.id,
                  reviewId: sessionStorage.getItem("reviewId"),
                  text: text,
                })
              );
              setModifyText(true);
              setReviewModal(false);
            } else {
              alert("취소하였습니다");
            }
          }}
        >
          수정
        </button>
      </div>
    </div>
  );
};

export default DetailReviewModal;
