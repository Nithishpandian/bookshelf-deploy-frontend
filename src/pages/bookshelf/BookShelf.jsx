import React, { useEffect } from "react";
import Navbar from "../../components/common/Navbar";
import BookShelfCard from "../../components/searchBooks/BookShelfCard";
import "../../assets/styles/home/SearchBook.css";
import {
  getAllBooksFunc,
  reset,
} from "../../features/bookShelf/bookshelfSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/common/Footer";

const BookShelf = () => {
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
  }, [dispatch]);

  return (
    <div>
      <Navbar />
        <div className="search-page">
          <div className="search-card-page">
            {isLoading ? (
              "Loading..."
            ) : books.length > 0 ? (
              books.map((book, index) => (
                <BookShelfCard
                  key={index}
                  bookId={book._id}
                  image={book.image}
                  title={book.title}
                  authors={book.authors}
                  pageCount={book.pageCount}
                  description={book.description}
                  rating={book.rating}
                  reviews={book.reviews}
                  currentlyReading={book.currentlyReading}
                  finished={book.finished}
                />
              ))
            ) : (
              <h2>No books were added</h2>
            )}
          </div>
        </div>
      <div className="footer-place-cont">
        <Footer/>
      </div>
    </div>
  );
};

export default BookShelf;
