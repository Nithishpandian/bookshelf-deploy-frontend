import React, { useEffect, useState } from "react";
import Navbar from "../../components/common/Navbar";
import SocialCard from "../../components/social/SocialCard";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../../components/common/Footer";

const SocialPage = () => {
  const token = sessionStorage.getItem("myToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token.replace(/^"(.+(?="$))"$/, "$1")}`,
    },
  };
  const [postsData, setPostsData] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/post/getallposts`, config)
      .then((res) => {
        setPostsData(res.data);
      })
      .catch((err) => {
        toast.error("unable to fetch the data");
        console.log(err);
      });
  }, [postsData]);
  return (
    <div>
      <Navbar />
      <div className="search-page">
        <div className="search-card-page">
          {
            postsData.length > 0 ? (
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
              <h2>No Posts</h2>
            )
          }
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default SocialPage;
