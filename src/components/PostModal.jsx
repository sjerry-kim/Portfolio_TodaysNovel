import REACT, { useEffect, useRef, useState } from "react";
import DaumPostCode from "react-daum-postcode";
import { useSelector } from "react-redux";
import '../css/PostModal.css';

const PostModal = (props) => {
  const {postModal, setPostModal, setPost, setRestAdress} = props;
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
        setPostModal(false);
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

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let postNumber = data.zonecode;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    //fullAddress -> 전체 주소반환
    // console.log(fullAddress);
    // console.log(postNumber);
    sessionStorage.setItem("signPost",postNumber);
    sessionStorage.setItem("signAdress",fullAddress);
    setPost(postNumber);
    setRestAdress(fullAddress);
  };

  return(
  <div ref={modalRef}
    className={`PostModal-div ${postModal? "PostModal-open" : ""}`}>
    <DaumPostCode 
    onComplete={handleComplete} className="daum-post-code" />
  </div>
  )
};

export default PostModal;
