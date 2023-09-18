import React, { useEffect, useState } from "react";
import SocialCard from "../../components/social/SocialCard";
import axios from "axios";
import { toast } from "react-toastify";

const SocialHome = () => {
  const token = sessionStorage.getItem("myToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token.replace(/^"(.+(?="$))"$/, "$1")}`,
    },
  };
  const [postsData, setPostsData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/post/userposts`, config)
      .then((res) => {
        setPostsData(res.data);
      })
      .catch((err) => {
        toast.error("unable to fetch the data");
        console.log(err);
      });
  }, [postsData]);
  return (
      <div className="search-page">
        <h1 style={{ fontFamily: "sans", color: "rgb(30, 30, 30)" }}>
          Your posts
        </h1>
        <div className="search-card-page">
          {postsData.length > 0 ? (
            postsData.map((post, index) => {
              return (
                <SocialCard
                  key={index}
                  postId={post._id}
                  postUserId={post.user}
                  image={post.image}
                  title={post.title}
                  authors={post.authors}
                  pageCount={post.pageCount}
                  description={post.description}
                  rating={post.rating}
                  reviews = {post.reviews}
                />
              );
            })
          ) : (
            <h2>You have not posted any posts</h2>
          )}
        </div>
      </div>
  );
};

export default SocialHome;
