import React from "react";
import BookImg from "../../assets/images/egoBook.jpg";
import "../../assets/styles/home/SearchBook.css";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { toast } from "react-toastify";

const BookCard = ({
  image,
  title,
  authors,
  pageCount,
  description,
  ratingValue,
  ratingCount,
}) => {
  const onSubmitBook = async (e) => {
    e.preventDefault();
    const bookData = {
      image,
      title,
      authors,
      pageCount,
      description,
    };

    const token = sessionStorage.getItem("myToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token.replace(/^"(.+(?="$))"$/, "$1")}`,
      },
    };
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/book/bookshelf`,
        bookData,
        config
      )
      .then((res) => {
        console.log(res.data);
        toast.info("Book added to bookshelf");
      })
      .catch((err) => console.log(err));
  };
  return (
      <div className="bookcard-cont">
        <div className="searchbook-img-cont">
          <img
            loading="lazy"
            className="searchbook-img"
            src={image}
            alt="Book Image"
          />
        </div>
        <div className="bookcard-info-cont">
          <h2 className="bookcard-title">{title}</h2>
          <span className="bookcard-author-cont">
            <p className="bookcard-author">
              {authors &&
                authors.map((author, index) => {
                  return <p key={index}>{author}</p>;
                })}
            </p>
            <p className="bookcard-page">
              page:{" "}
              <span style={{ fontSize: "14px", color: "rgb(66, 66, 66)" }}>
                {pageCount}
              </span>
            </p>
          </span>
          <p className="bookcard-description">{description.slice(0, 165)}...</p>
          <div className="rating-cont">
            <Rating
              sx={{ "& .MuiRating-iconFilled": { color: "#ff6262" } }}
              name="read-only"
              value={ratingValue}
              size="small"
              readOnly
            />
            <p className="rating-count">({ratingCount})</p>
          </div>
          <div>
            <button onClick={onSubmitBook} className="bookcard-btn">
              Add books
            </button>
          </div>
        </div>
      </div>
  );
};

export default BookCard;
