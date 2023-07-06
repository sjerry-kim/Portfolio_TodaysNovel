import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import RecentBox from "../components/RecentBox";
import DetailProductsComment from "../components/DetailProductsComment";
import DetailReview from "../components/DetailReview";
import "../css/Detail.css";
import { addItem } from "../modules/cart";
import { useState } from "react";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useParams로 아이디를 구분해서 상세페이지 구현
  const { id } = useParams();
  // mainState.js 셀렉
  const mainItems = useSelector((state) => state.mainState);
  // cart.js 셀렉
  const cart = useSelector((state) => state.cart);
  // mainState의 상품 목록 중 useParams id와 동일한 id를 가진 동일한 상품을 찾아줌
  const products = mainItems.find((p) => p.itemId == id);
  // 해당 상품의 리뷰를 가져옴
  const productsReviews = products.reviews;
  // mainReview.js 셀렉
  const mainReviews = useSelector((state) => state.mainReview);
  // useParams id와 동일한 id를 가진 동일한 상품의 리뷰를 찾아줌
  const reviews = mainReviews.filter((r) => r.itemId == id);
  // 상품 구매 갯수 state
  const [itemTotalCount, setItemTotalCount] = useState(1);
  // 장르 태그 가져오기
  const productTag = products.tag.filter((t) => t != "전체");

  // 장바구니 추가
  const insertItem = (item) => {
    dispatch(
      addItem({
        id: sessionStorage.getItem("id"),
        title: item.title,
        itemId: item.itemId,
        image: item.image,
        price: item.price,
        effect: item.effect,
        itemTotalCount: itemTotalCount,
        isChecked: item.isChecked,
      })
    );
  };

  return (
    <div className="Detail-wp">
      <div className="Detail-product-div">
        <h1>{products.title}</h1>
        <div className="Detail-product-box">
          <img src={require(`../img/${products.image}`)} alt="no image" />
          <div className="Detail-product-detaildiv">
            <div className="Detail-product-creatordiv">
              <p>
                발행 <span>|</span> {products.releaseDate}
              </p>
              <p>
                출판 <span>|</span> {products.publisher}
              </p>
              <p>
                쪽수 <span>|</span> {products.pages}
              </p>
              <p>
                ISBN <span>|</span> {products.ISBN}
              </p>
            </div>
            <div className="Detail-product-writerdiv">
              <p>저자 : {products.author}</p>
              {products.translator == "" ? (
                ""
              ) : (
                <p>역자 : {products.translator}</p>
              )}
            </div>
            <p>
              정가 :{" "}
              {products.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </p>
            <p>
              장르 :
              {productTag.map((tag) => (
                <span> {tag} </span>
              ))}
            </p>
            <div
              className="Detail-product-coupondiv"
              onClick={() => {
                alert("현재 받을 수 있는 할인쿠폰이 없습니다.");
              }}
            >
              할인 쿠폰 받으러 가기 !
            </div>
            <div className="Detail-product-cart-div">
              <div className="Detail-product-modifynum">
                <button
                  onClick={() => {
                    setItemTotalCount(itemTotalCount - 1);
                  }}
                >
                  {" "}
                  -{" "}
                </button>
                <p>{itemTotalCount}</p>
                <button
                  onClick={() => {
                    setItemTotalCount(itemTotalCount + 1);
                  }}
                >
                  {" "}
                  +{" "}
                </button>
              </div>

              <button
                onClick={() => {
                  const selectedItem = cart.find(
                    (si) => si.itemId == products.itemId
                  );
                  if (selectedItem) {
                    alert("이미 추가된 상품입니다");
                  } else {
                    insertItem(products);
                    if (window.confirm("장바구니를 확인하시겠습니까?")) {
                      navigate("/cart");
                    }
                  }
                }}
              >
                장바구니 담기
              </button>
            </div>
          </div>
        </div>
      </div>
      <DetailReview reviews={reviews} productsReviews={productsReviews} />
      <DetailProductsComment
        id={id}
        mainItems={mainItems}
        products={products}
      />
      <RecentBox />
    </div>
  );
};

export default Detail;
