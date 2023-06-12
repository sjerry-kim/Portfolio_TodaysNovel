import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/RecentBox.css";

const RecentBox = () => {
  const sessionRecentBox = sessionStorage.getItem("recentBox");
  const parseRecentBox = JSON.parse(sessionRecentBox);
  const [sequence, setSequence] = useState(parseInt(parseRecentBox.length));
  const navigate = useNavigate();

  useEffect(() => {
    console.log(parseRecentBox);
    console.log(sequence);
  }, [sequence]);

  return (
    <div
      className={`DetailRecentBox-wp ${
        parseRecentBox.length > 0 ? "" : "display-none"
      }`}
    >
      <h4>Today view</h4>
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
