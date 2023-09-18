import Rating from "@mui/material/Rating";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SocialCard = ({
  postUserId,
  postId,
  image,
  title,
  authors,
  pageCount,
  description,
  rating,
  reviews
}) => {
  const token = sessionStorage.getItem("myToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token.replace(/^"(.+(?="$))"$/, "$1")}`,
    },
  };
  const [ratingValue, setRatingValue] = useState(Number(rating));
  const [userName, setUserName] = useState("");
  const [currentUserId, setCurrentUserId] = useState("")
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/user/${postUserId}`, config)
      .then((res) => {
        setUserName(res.data.userName);
      })
      .catch((err) => console.log(err));

    axios.get(`${process.env.REACT_APP_BASE_URL}/user/data`, config)
      .then((res)=>{
        setCurrentUserId(res.data.id)
      })
      .catch((err)=>console.log(err))
  }, []);
  const wantToReadSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/book/bookshelf`,
        { image, title, authors, pageCount, description, rating },
        config
      )
      .then((res) => {
        toast.info("Added to bookshelf");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Unable to add to bookshelf");
      });
  };

  const deletePostFunc = async(e) => {
    e.preventDefault()
    await axios.delete(`${process.env.REACT_APP_BASE_URL}/post/deletepost/${postId}`, config)
    .then((res)=>{
        toast.info("Deleted the post")
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
          <h2 className="bookcard-title">{title}{postUserId===currentUserId && <div className="post-delete-icon" onClick={deletePostFunc}><ion-icon name="trash"></ion-icon></div>}</h2>
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
          <div className="rating-cont">
            <Rating
              name="simple-controlled"
              sx={{ "& .MuiRating-iconFilled": { color: "#ff6262" } }}
              value={ratingValue}
              size="small"
            />
            <div style={{ fontSize: "14px", color: "rgb(40,40,40)" }}>
              by{" "}
              <span style={{ fontWeight: "600" }}>
                {userName !== "" ? userName : "Unknown"}
              </span>
            </div>
            {/* <button className='currently-reading-btn' onClick={currentlyReadingSubmit} >{currentlyReading ? "Current Read" : finished ? "Finished" : "Add to Read"}</button> */}
          </div>
          <p className="bookcard-description">{description.slice(0, 165)}...</p>

          <div className="review-cont">
            {reviews.length > 0 ? (
              reviews.map((reviewTxt, index) => {
                return (
                  <div key={index} className="reviewtxt-cont">
                    <p className="review">{reviewTxt}</p>
                  </div>
                );
              })
            ) : (
              <h5 className="review">No reviews</h5>
            )}
          </div>

          <div>
            <button
              onClick={wantToReadSubmit}
              className="bookcard-btn"
              style={{ marginTop: "10px" }}
            >
              Want to read
            </button>
          </div>
        </div>
      </div>
  );
};

export default SocialCard;
