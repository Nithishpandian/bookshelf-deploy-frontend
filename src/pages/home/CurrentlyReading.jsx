import React, { useEffect } from "react";
import ReadingBookcard from "../../components/home/ReadingBookcard";
import "../../assets/styles/home/SearchBook.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllBooksFunc,
  reset,
} from "../../features/bookShelf/bookshelfSlice";

const CurrentlyReading = () => {
  const dispatch = useDispatch();
  const { books, isError, isLoading, message } = useSelector(
    (state) => state.bookshelf
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getAllBooksFunc());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, books]);
  return (
      <div className="search-page">
        <h1 style={{ fontFamily: "sans", color: "rgb(30, 30, 30)" }}>
          Currently Reading Books
        </h1>
        <div className="search-card-page">
          {books.length > 0 ? (
            books.map((book, index) => {
              return (
                book.currentlyReading && (
                  <ReadingBookcard
                    bookId={book._id}
                    key={index}
                    image={book.image}
                    title={book.title}
                    pageCount={book.pageCount}
                    finishedPercentage={book.finishedPercentage}
                    comments={book.comments}
                  />
                )
              );
            })
          ) : (
            <h2>No Books were added to current reading list</h2>
          )}
        </div>
      </div>
  );
};

export default CurrentlyReading;
