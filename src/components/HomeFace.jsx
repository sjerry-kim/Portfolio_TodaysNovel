import React, { useRef, useState } from "react";
import "../css/HomeFace.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
// React Slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeFace = () => {
  const [play, setPlay] = useState(true);
  // React Slick의 Play, Pause 함수 사용을 위해 useRef 사용
  const slickRef = useRef(null);
  // Slick settings
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3300,
    fade: true,
    pauseOnHover: false,
  };

  return (
    <div className="HomeFace-wp">
      {/* Home 배경 Slider */}
      <Slider ref={slickRef} {...settings}>
        <div>
          <img src={require("../img/homeface01.jpg")} alt="" />
        </div>
        <div>
          <img src={require("../img/homeface02.jpg")} alt="" />
        </div>
      </Slider>
      {/* Slider 재생,멈춤 버튼 */}
      <div className="HomeFace-btn-div">
        {play ? (
          <button
            onClick={() => {
              setPlay(!play);
              slickRef.current.slickPause();
            }}
          >
            <FontAwesomeIcon icon={faPause} />
          </button>
        ) : (
          <button
            onClick={() => {
              setPlay(!play);
              slickRef.current.slickPlay();
            }}
          >
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeFace;
