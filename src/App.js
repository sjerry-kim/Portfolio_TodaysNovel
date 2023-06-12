import "./App.css";
// Router
import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
// Pages
import Cart from "./pages/Cart";
import Detail from "./pages/Detail";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import MyPageReview from "./components/MyPageReview";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import NewIn from "./pages/NewIn";



function App() {
  return (
    <div className="App">
      <Routes>
        {/* Outlet 사용을 위해 Layout 컴포넌트 라우팅 */}
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<Detail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/newin" element={<NewIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/:id" element={<MyPageReview />} />
        </Route>
        {/* Notfound 경로 설정 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
