import React, { useEffect, useState } from "react";
import BookImg from "../../assets/images/egoBook.jpg";
import Rating from "@mui/material/Rating";
import { toast } from "react-toastify";
import axios from "axios";

const BookShelfCard = ({
  bookId,
  image,
  title,
  authors,
  pageCount,
  description,
  rating,
  reviews,
  currentlyReading,
  finished,
}) => {
  const token = sessionStorage.getItem("myToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token.replace(/^"(.+(?="$))"$/, "$1")}`,
    },
  };

  const [value, setValue] = useState(rating);
  const [review, setReview] = useState("");
  const [reviewsArray, setReviewsArray] = useState(reviews);

  useEffect(() => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/book/updatebook`,
        { bookId, rating: value },
        config
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  }, [value]);

  const changeReviewArray = () => {
    if (review !== "") {
      setReviewsArray((array) => [...array, review]);
    } else {
      toast.error("Review can't be empty");
    }
  };

  const onSubmitReview = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/book/updatebook`,
        { bookId, reviews: reviewsArray },
        config
      )
      .then((res) => {
        setReview("");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  };

  const deleteReview = async (index) => {
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/book/deletereview`,
        { bookId, index },
        config
      )
      .then((res) => {
        console.log(res.data);
        toast.info("review deleted!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to delete the review!");
      });
  };

  const currentlyReadingSubmit = async (e) => {
    e.preventDefault();
    if (currentlyReading === true) {
      toast.info("Already in current reading list");
    } else if (finished === true) {
      toast.info("Already Finished the book");
    } else {
      await axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/book/currentlyReading`,
          { bookId },
          config
        )
        .then((res) => {
          console.log(res.data);
          toast.info("Added to currently reading list");
          window.location.reload()
        })
        .catch((err) => {
          console.log(err);
          toast.error("Unable to add to currently reading list");
        });
    }
  };

  const setPost = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/post/setpost`,
        { image, title, authors, pageCount, description, rating: rating, reviews: reviewsArray },
        config
      )
      .then((res) => {
        toast.info("Posted the book");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to post");
      });
  };

  const deleteBookFunc = async(e) => {
    e.preventDefault()
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/book/deletebook/${bookId}`, config)
    .then((res)=>{
        toast.info("Deleted the book")
        window.location.reload()
      })
      .catch(err=>{
        console.log(err);
      })
  }

  return (
      <div className="bookcard-cont">
        <div className="searchbook-img-cont">
          <img loading="lazy" className="searchbook-img" src={image} alt="" />
        </div>
        <div className="bookcard-info-cont">
          <h2 className="bookcard-title">{title}
            <div className="post-delete-icon" onClick={deleteBookFunc}><ion-icon name="trash"></ion-icon></div>
          </h2>
          <span className="bookcard-author-cont">
            <p className="bookcard-author">
              {authors.map((author, index) => {
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
              name="simple-controlled"
              sx={{ "& .MuiRating-iconFilled": { color: "#ff6262" } }}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              size="small"
            />
            <button
              className="currently-reading-btn"
              onClick={currentlyReadingSubmit}
            >
              {currentlyReading
                ? "Current Read"
                : finished
                ? "Finished"
                : "Add to Read"}
            </button>
          </div>
          <div className="review-cont">
            {reviewsArray.length > 0 ? (
              reviewsArray.map((reviewTxt, index) => {
                return (
                  <div key={index} className="reviewtxt-cont">
                    <p className="review">{reviewTxt}</p>
                    {/* <span><ion-icon name="create-outline"></ion-icon></span> */}
                    <span
                      onClick={() => {
                        deleteReview(index);
                        window.location.reload();
                      }}
                    >
                      <ion-icon name="trash-outline"></ion-icon>
                    </span>
                  </div>
                );
              })
            ) : (
              <h5 className="review">No reviews</h5>
            )}
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <form onSubmit={onSubmitReview}>
              <input
                type="text"
                className="review-input"
                onChange={(e) => setReview(e.target.value)}
                value={review}
                placeholder="Review the book..."
              />
              <button
                type="submit"
                onClick={changeReviewArray}
                className="bookcard-btn"
              >
                Add review
              </button>
            </form>
            <button onClick={setPost} className="bookcard-btn">
              Post
            </button>
          </div>
        </div>
      </div>
  );
};

export default BookShelfCard;
