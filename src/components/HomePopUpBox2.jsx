import { useEffect } from "react";
import { useState } from "react";
import '../css/HomePopUpBox2.css';

const HomePopUpBox2 = () => {
  const [popUpBoxBtn, setPopUpBoxBtn] = useState(true);
  const newDate = new Date();
  const date = newDate.getDate();
  const todayDate = localStorage.getItem("PopUpDate2");

  useEffect(() => {
    if (todayDate == date) {
      setPopUpBoxBtn(false);
    } else {
      setPopUpBoxBtn(true);
    }
  }, []);

  return (  
    <div
      className={` HomePopUpBox2-wp ${
        popUpBoxBtn ? "" : "HomePopUpBox2-display-none"
      }`}
    >
      <div className="HomePopUpBox2-post-box">
        <h2>Review Event</h2>
      </div>

      <div className="HomePopUpBox2-Btn-box">
        <button
          onClick={() => {
            localStorage.setItem("PopUpDate2", date);
            setPopUpBoxBtn(!popUpBoxBtn);
          }}
        >
          오늘 하루 닫기
        </button>
        <button
          onClick={() => {
            setPopUpBoxBtn(!popUpBoxBtn);
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}

export default HomePopUpBox2;