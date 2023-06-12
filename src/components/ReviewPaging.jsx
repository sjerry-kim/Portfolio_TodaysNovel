import { useState } from "react";
import Pagination from "react-js-pagination";

import '../css/ReviewPaging.css';

const ReviewPaging = (props) => {
  const {reviews, page, setPage} = props;

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (  
    <Pagination
      activePage={page} // 현재 페이지
      itemsCountPerPage={5} // 한 페이지랑 보여줄 아이템 갯수
      totalItemsCount={reviews.length} // 총 아이템 갯수
      pageRangeDisplayed={5} // paginator의 페이지 범위
      prevPageText={"‹"} // "이전"을 나타낼 텍스트
      nextPageText={"›"} // "다음"을 나타낼 텍스트
      onChange={handlePageChange} // 페이지 변경을 핸들링하는 함수
    />
  );
}

export default ReviewPaging;