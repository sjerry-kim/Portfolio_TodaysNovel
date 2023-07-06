import '../css/Home.css';
import HomeFace from "../components/HomeFace";
import HomePopUpBox from "../components/HomePopUpBox";
import HomePopUpBox2 from '../components/HomePopUpBox2';

const Home = () => {
  return (
    <div className="Home-wp">
      {/* Home 화면을 구성하는 컴포넌트*/}
      <HomeFace />
      {/* 팝업창 컴포넌트들 */}
      <HomePopUpBox/>
      <HomePopUpBox2 />
    </div>
  );
};

export default Home;