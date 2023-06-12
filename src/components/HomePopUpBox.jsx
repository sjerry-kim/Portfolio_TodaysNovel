import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/HomePopUpBox.css";

const HomePopUpBox = () => {
  const navigate = useNavigate();
  // PopUp창을 보이지 않게 해 줄 state -> false일 때 display:none
  const [popUpBoxBtn, setPopUpBoxBtn] = useState(true);
  const newDate = new Date();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const todayDate = localStorage.getItem("PopUpDate");

  // LocalStorage에 저장된 날짜와 현재 날짜를 비교하여 팝업창 유무 결정
  // Home 컴포넌트의 첫 랜딩 때만 작동
  useEffect(() => {
    if (todayDate == date) {
      setPopUpBoxBtn(false);
    } else {
      setPopUpBoxBtn(true);
    }
  }, []);

  return (
    <div
      className={` HomePopUpBox-wp ${
        popUpBoxBtn ? "" : "HomePopUpBox-display-none"
      }`}
    >
      <div className="HomePopUpBox-post-box">
        <h2>{month}월 신간 소설</h2>
        <button
          title="이동 하기"
          onClick={() => {
            navigate("/newin");
          }}
        >
          구경 하기
        </button>
      </div>
      <div className="HomePopUpBox-Btn-box">
        <button
          onClick={() => {
            // 해당 버튼을 클릭했을 때, localStorage에 버튼을 클릭한 현재 날짜를 저장 -> 추후 useEffect에서 비교
            localStorage.setItem("PopUpDate", date);
            // 팝업창 닫기
            setPopUpBoxBtn(!popUpBoxBtn);
          }}
        >
          오늘 하루 닫기
        </button>
        <button
          onClick={() => {
            // 팝업창 닫기
            setPopUpBoxBtn(!popUpBoxBtn);
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default HomePopUpBox;
