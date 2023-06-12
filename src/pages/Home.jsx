import '../css/Home.css';
import HomeFace from "../components/HomeFace";
import HomePopUpBox from "../components/HomePopUpBox";
import HomePopUpBox2 from '../components/HomePopUpBox2';

const Home = () => {
  return (
    <div className="Home-wp">
      <HomeFace />
      <HomePopUpBox/>
      <HomePopUpBox2 />
    </div>
  );
};

export default Home;