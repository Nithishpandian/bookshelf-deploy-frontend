import React, { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReadingBookcard = ({
  bookId,
  image,
  title,
  pageCount,
  finishedPercentage,
  comments,
}) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("myToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token.replace(/^"(.+(?="$))"$/, "$1")}`,
    },
  };
  const currentPage = Math.round(pageCount * (finishedPercentage / 100));
  const [percentageTxt, setPercentageTxt] = useState();
  const [commentTxt, setCommentTxt] = useState();
  const [commentArray, setCommentArray] = useState(comments);

  const changeUpdate = () => {
    if (
      percentageTxt !== "" &&
      commentTxt !== "" &&
      Number(percentageTxt) > finishedPercentage &&
      Number(percentageTxt) < 100
    ) {
      setCommentArray((array) => [...array, percentageTxt + "% " + commentTxt]);
    }
  };
  const updateSubmit = async (e) => {
    e.preventDefault();
    if (percentageTxt === "" || commentTxt === "") {
      toast.error("Please fill all the fields");
    } else {
      await axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/book/updatepercentage`,
          {
            bookId,
            finishedPercentage: Number(percentageTxt),
            comments: commentArray,
          },
          config
        )
        .then((res) => {
          toast.info("Updated the data");
          setPercentageTxt("");
          setCommentTxt("");
        })
        .catch((err) => console.log(err));
    }
  };

  const finishedSubmit = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/book/finishedreading`,
        { bookId },
        config
      )
      .then((res) => {
        toast.info("Finished reading");
        navigate("/bookshelf");
      })
      .catch((err) => console.log(err));
  };

  return (
      <div className="bookcard-cont">
        <div className="searchbook-img-cont">
          <img loading="lazy" className="searchbook-img" src={image} alt="" />
        </div>
        <div className="bookcard-info-cont">
          <h2 className="bookcard-title">{title}</h2>
          <p className="bookcard-page">
            <span style={{ fontSize: "14px", color: "rgb(66, 66, 66)" }}>
              <span style={{ fontWeight: "600" }}>Current page : </span>
              {currentPage}
            </span>
            <span
              style={{
                fontSize: "14px",
                color: "rgb(66, 66, 66)",
                marginLeft: "25px",
              }}
            >
              <span style={{ fontWeight: "600" }}>Total page : </span>
              {pageCount}
            </span>
          </p>
          {/* <p className='bookcard-description'>{description.slice(0, 165)}...</p> */}
          <div style={{ margin: "12px 50px 12px 0" }}>
            <ProgressBar
              completed={finishedPercentage}
              labelSize="12px"
              height="15px"
              bgColor="rgb(60,60,60)"
              baseBgColor="rgb(200,200,200)"
            />
          </div>
          <div className="comment-cont-cont">
            {commentArray.map((comment) => {
              return (
                <div className="comment-cont">
                  <span className="comment">{comment}</span>
                </div>
              );
            })}
            {/* <div className='comment-cont'><span className='percentage-text'> ~ 10%</span><span className='comment'>This is a first comment</span></div>
                <div className='comment-cont'><span className='percentage-text'> ~ 10%</span><span className='comment'>This is a first comment</span></div>
                <div className='comment-cont'><span className='percentage-text'> ~ 10%</span><span className='comment'>This is a first comment</span></div> */}
          </div>
          <div className="percentagebtn-cont-cont">
            <form onSubmit={updateSubmit} className="percentagebtn-cont">
              <input
                onChange={(e) => setPercentageTxt(e.target.value)}
                value={percentageTxt}
                min={finishedPercentage + 1}
                max={99}
                type="number"
                placeholder="%"
                className="percentage-input"
                required
              />
              <input
                onChange={(e) => setCommentTxt(e.target.value)}
                value={commentTxt}
                type="text"
                placeholder="Comment..."
                className="comment-input"
                required
              />
              <button className="bookcard-btn" onClick={changeUpdate}>
                Update
              </button>
            </form>
            <button onClick={finishedSubmit} className="bookcard-btn">
              Finished
            </button>
          </div>
        </div>
      </div>
  );
};

export default ReadingBookcard;
