import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/DetailProductsComment.css";
import { addComment, deleteComment } from "../modules/mainComment";

let commentId = 3;

const DetailProductsComment = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const sessionId = sessionStorage.getItem("id");
  const currentUser = user.userList.find((user) => user.id == sessionId);
  const mainComment = useSelector((state) => state.mainComment);
  const mainCommentId = mainComment.filter((c) => c.productId == id);
  const [comment, setComment] = useState("");

  const InsertComment = () => {
    dispatch(
      addComment({
        productId: id,
        commentId: commentId++,
        commentText: comment,
        userName: currentUser.name,
        userId: currentUser.id,
      })
    );
    setComment("");
  };

  return (
    <div className="DetailProductsComment-wp">
      <h1>Q&A</h1>
      <div className="DetailProductsComment-typingdiv">
        <textarea
          disabled={currentUser ? false : true}
          type="text"
          value={comment}
          placeholder={
            currentUser
              ? "문의사항을 입력하세요 :)"
              : "QnA 입력은 로그인 후 가능합니다"
          }
          onChange={(e) => {
            setComment(e.target.value);
          }}
        />
        <button
          onClick={() => {
            if (comment) {
              InsertComment();
            } else {
              alert("문의사항을 입력하세요");
            }
          }}
        >
          등록하기
        </button>
      </div>
      <div className="DetailProductsComment-printdiv">
        {mainCommentId.map((c, i) => (
          <div
            key={i}
            className={`DetailProductsComment-qna ${
              currentUser && currentUser.id == c.userId ? "user-qna" : ""
            }`}
          >
            {currentUser && currentUser.id == c.userId ? (
              <div className="DetailProductsComment-qna-comment public-div">
                <p>{c.commentText}</p>
              </div>
            ) : (
              <div className="DetailProductsComment-qna-comment secret-div">
                <img src={require(`../img/secretpost.jpg`)} alt="" />
                <p>비밀글</p>
              </div>
            )}
            <div className="DetailProductsComment-qna-username">
              {currentUser && currentUser.id == c.userId ? (
                <button
                  onClick={() => {
                    dispatch(deleteComment(c));
                    alert("문의사항을 삭제하였습니다");
                  }}
                >
                  X
                </button>
              ) : (
                ""
              )}
              <p
                className={
                  currentUser && currentUser.id == c.userId ? "" : "other-user"
                }
              >
                {c.userName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailProductsComment;
