import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../css/Shop.css";
import { addItem } from "../modules/cart";
import { changeCart } from "../modules/user";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { addRecentItem, deleteRecentItem } from "../modules/recentBox";

const Shop = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // mainState.js 셀렉
  const shopItems = useSelector((state) => state.mainState);
  // cart.js 셀렉
  const cart = useSelector((state) => state.cart);
  // user.js 셀렉
  const user = useSelector((state) => state.user);
  // recentBox.js 셀렉
  const recentBox = useSelector((state) => state.recentBox);
  // 로그인 접근제한 리다이렉트용 로그인 유무 확인용 sessionId, currentUser
  const sessionId = sessionStorage.getItem("id");
  const currentUser = user.userList.find((user) => user.id == sessionId);
  //
  const sessionCart = sessionStorage.getItem("cart");
  const [searchWord, setSearchWord] = useState("");
  const [searchedItems, setSearchedItems] = useState("");
  const [category, setCategory] = useState("전체");
  const categoryArray = [
    "전체",
    "국내소설",
    "영미소설",
    "일본소설",
    "로맨스",
    "호러",
    "추리&스릴",
    "힐링",
    "판타지",
  ];
  const [clickedCategory, setClickedCategory] = useState("");
  let newShopItems = shopItems.filter((item) => {
    return item.title
      .replace(" ", "")
      .toLocaleLowerCase()
      .includes(searchWord.toLocaleLowerCase().replace(" ", ""));
  });
  let categoryShopItems = newShopItems.filter((item) =>
    item.tag.includes(`${category}`)
  );

  // 로그인 전후, 장바구니 유무에 따른 확인 및 장바구니 목록 추가하기
  useEffect(() => {
    // cart.js state를 가져와서 json으로 변환
    const stringfyCart = JSON.stringify(cart);
    // 로그인 전과 후
    sessionStorage.setItem("cart", stringfyCart);
    let parseCart = JSON.parse(sessionCart);
    if (parseCart?.[0] == undefined) {
      console.log("장바구니 추가 상품 없음");
    } else if (currentUser && parseCart[0].id != currentUser.id) {
      console.log("로그인 하기 전 장바구니 있음");
      // console.log(cart);
    } else if (currentUser && parseCart[0].id == currentUser.id) {
      // console.log(parseCart[0].id);
      console.log("장바구니 id 변경됨");
      dispatch(changeCart(parseCart));
      // console.log(currentUser.cart);
    }
  }, [cart, sessionCart]);

  // 장바구니 추가하기
  const insertItem = (item) => {
    dispatch(
      addItem({
        id: sessionStorage.getItem("id"),
        title: item.title,
        itemId: item.itemId,
        image: item.image,
        price: item.price,
        effect: item.effect,
        itemCount: 1,
        itemTotalCount: 1,
        isChecked: item.isChecked,
      })
    );
    console.log(cart);
  };

  // 최근 본 항목 추가
  // newIn 페이지와 Shop에서 접속한 아이템 목록이 일치해야하기 때문에 redux와 세션 모두 넣어줌
  // 중복된 아이템은 if문으로 걸러줌
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
    <div className="Shop-wp">
      <div className="Shop-category-div">
        {categoryArray.map((c, i) => (
          <button
            key={i}
            className={clickedCategory == i ? "Shop-category-clicked" : ""}
            onClick={() => {
              setCategory(c);
              setClickedCategory(i);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="Shop-search-box">
        <form
          className="Shop-search-form"
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            setSearchWord(searchedItems);
          }}
        >
          <input
            type="text"
            onChange={(e) => {
              setSearchedItems(e.target.value);
            }}
            placeholder="소설 제목을 검색하세요"
          />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      <div className="Shop-itembox">
        {categoryShopItems.map((item) => (
          <figure className="Shop-itemdiv">
            <img src={require(`../img/${item.image}`)} alt="no image"></img>
            <figcaption>
              <p>{item.title}</p>
              <div className="Shop-fig-div">
                <button
                  title="상세페이지로 이동"
                  onClick={() => {
                    navigate(`/shop/${item.itemId}`);
                    pushRecentBox(item);
                  }}
                >
                  <p>상세 페이지</p>
                </button>
                <button
                  title="장바구니에 추가하기"
                  onClick={() => {
                    const selectedItem = cart.find(
                      (si) => si.itemId == item.itemId
                    );
                    if (selectedItem) {
                      alert("이미 추가된 상품입니다");
                    } else {
                      insertItem(item);
                      if (window.confirm("장바구니를 확인하시겠습니까?")) {
                        navigate("/cart");
                      }
                    }
                  }}
                >
                  <p>장바구니</p>
                  {/* <FontAwesomeIcon icon={faBasketShopping} /> */}
                </button>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
      {/* firefly tags*/}
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
      <div class="firefly"></div>
    </div>
  );
};

export default Shop;
