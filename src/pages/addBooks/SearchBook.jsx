import React, { useState, useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import "../../assets/styles/home/SearchBook.css";
import BookCard from "../../components/searchBooks/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { reset, searchBookFunc } from "../../features/searchbooks/searchSlice";
import Footer from "../../components/common/Footer";

const SearchBook = () => {
  const dispatch = useDispatch();
  const { searchedBooks, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.searchedBook
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      console.log("successfully loaded");
    }

    dispatch(reset());
  }, [searchedBooks, isError, isSuccess, message, dispatch]);

  const [searchbookName, setSearchbookName] = useState("");
  const [close, setClose] = useState(false);
  const searchBookClick = (e) => {
    if (close === true) {
      setClose(!close);
      window.location.reload();
    } else if (close === false && searchbookName !== "") {
      setClose(!close);
    }

    if (searchbookName !== "") {
      dispatch(searchBookFunc(searchbookName));
    }
  };

  return (
    <>
      <Navbar />
      <div className="search-page">
          <div className="search-cont-cont">
            <div className="search-input-cont">
              <input
                className="search-input"
                onChange={(e) => setSearchbookName(e.target.value)}
                value={searchbookName}
                type="text"
                placeholder="Search a book..."
              />
              <span className="search-icon" onClick={searchBookClick}>
                {close ? "X" : <ion-icon name="search-outline"></ion-icon>}
              </span>
            </div>
          </div>
        <div className="search-card-page">
          {searchedBooks.length > 0 ? (
            searchedBooks.map((items, index) => {
              return (
                <BookCard
                  key={index}
                  image={
                    items.volumeInfo.imageLinks.smallThumbnail
                      ? items.volumeInfo.imageLinks.smallThumbnail
                      : "https://www.google.com"
                  }
                  title={
                    items.volumeInfo.title ? items.volumeInfo.title : "No title"
                  }
                  authors={
                    items.volumeInfo.authors ? items.volumeInfo.authors : []
                  }
                  pageCount={
                    items.volumeInfo.pageCount
                      ? items.volumeInfo.pageCount
                      : "?"
                  }
                  description={
                    items.volumeInfo.description
                      ? items.volumeInfo.description
                      : "No description available"
                  }
                  ratingValue={
                    items.volumeInfo.averageRating
                      ? items.volumeInfo.averageRating
                      : 0
                  }
                  ratingCount={
                    items.volumeInfo.ratingsCount
                      ? items.volumeInfo.ratingsCount
                      : "0"
                  }
                />
              );
            })
          ) : (
            <>
              <h1>No books</h1>
            </>
          )}
        </div>
      </div>
      <div className="footer-place-cont">
        <Footer/>
      </div>
    </>
  );
};

export default SearchBook;
