import React, { useRef, useState } from "react";
import "../css/NewIn.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRecentItem, deleteRecentItem } from "../modules/recentBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const NewIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shopItems = useSelector((state) => state.mainState);
  const recentBox = useSelector((state) => state.recentBox);
  const shopItemsLength = shopItems.length;
  const NewInItems = shopItems.slice(shopItemsLength - 5, shopItemsLength);
  const [play, setPlay] = useState(true);
  const slickRef = useRef(null);
  const settings = {
    dots: false,
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "100px",
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplaySpeed: 3500,
    autoplay: true,
    pauseOnHover: false,
  };

  const pushRecentBox = (item) => {
    const sameItem = recentBox.find((i) => i.title == item.title);
    console.log(sameItem);
    if (!sameItem) {
      dispatch(addRecentItem(item));
      let jsonRecentBox = JSON.stringify(recentBox);
      sessionStorage.setItem("recentBox", jsonRecentBox);
    } else {
      dispatch(deleteRecentItem(item));
      dispatch(addRecentItem(item));
      let jsonRecentBox = JSON.stringify(recentBox);
      sessionStorage.setItem("recentBox", jsonRecentBox);
      console.log("중복 삭제");
    }
  };

  return (
    <div className="NewIn-wp">
      <Slider ref={slickRef} {...settings} className="NewIn-slick-box">
        {NewInItems.map((item) => (
          <div
            className="NewIn-book"
            onClick={() => {
              pushRecentBox(item);
              navigate(`/shop/${item.itemId}`);
            }}
          >
            <img src={require(`../img/${item.image}`)} />
          </div>
        ))}
      </Slider>

      <div className="NewIn-book-btn-box">
        <button
          className={play ? "NewIn-book-btn-cursor" :""}
          disabled={play ? false : true}
          onClick={() => {
            console.log("확인");
            setPlay(!play);
            slickRef.current.slickPause();
          }}
        >
          {play ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon
              style={{ color: "rgba(128, 128, 128, 0.585)" }}
              icon={faPause}
            />
          )}
        </button>
        <button
          className={play ? "":"NewIn-book-btn-cursor"}
          disabled={play ? true : false}
          onClick={() => {
            setPlay(!play);
            slickRef.current.slickPlay();
          }}
        >
          {play ? (
            <FontAwesomeIcon
              style={{ color: "rgba(128, 128, 128, 0.585)" }}
              icon={faPlay}
            />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
      </div>
    </div>
  );
};

export default NewIn;
