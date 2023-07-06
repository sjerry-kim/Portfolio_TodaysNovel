import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RecentBox.css";

const RecentBox = () => {
  // detail 페이지에 접속할 때마다 recentbox에 저장된
  const sessionRecentBox = sessionStorage.getItem("recentBox");
  const parseRecentBox = JSON.parse(sessionRecentBox);
  const [sequence, setSequence] = useState(parseInt(parseRecentBox.length));
  const navigate = useNavigate();

  return (
    <div
      className={`DetailRecentBox-wp ${
        parseRecentBox.length > 0 ? "" : "display-none"
      }`}
    >
      <h4>Today view</h4>
      {/* 최근 본 항목은 4개까지만 보여줌 */}
      {sessionRecentBox != null
        ? parseRecentBox.length > 4
          ? parseRecentBox.slice(sequence - 4).map((item, i) => (
              <div
                className="DetailRecentBox-div"
                key={i}
                onClick={() => {
                  navigate(`/shop/${item.itemId}`);
                }}
              >
                <img src={require(`../img/${item.image}`)} alt="" />
                <p>{item.title}</p>
              </div>
            ))
          : parseRecentBox.map((item, i) => (
              <div
                className="DetailRecentBox-div"
                key={i}
                onClick={() => {
                  navigate(`/shop/${item.itemId}`);
                }}
              >
                <img src={require(`../img/${item.image}`)} alt="" />
                <p>{item.title}</p>
              </div>
            ))
        : ""}
    </div>
  );
};

export default RecentBox;
