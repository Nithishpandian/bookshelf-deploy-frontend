import React from "react";
import egoBook from "../../assets/images/egoBook.jpg";
import hooked from "../../assets/images/hooked.jpg";
import zeroToOne from "../../assets/images/zeroToOne.jpg";
import "../../assets/styles/home/HomePage.css";
import Navbar from "../../components/common/Navbar";
import CurrentlyReading from "./CurrentlyReading";
import SocialHome from "./SocialHome";
import Footer from "../../components/common/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="hero-cont">
          <div className=" hero1">
            <h1 className=" hero-title">TO SUCCEED YOU MUST READ</h1>
            <p className=" hero-para">
              <a href="/posts" className=" hero-para-underline">
                Not sure what to read next?{" "}
              </a>{" "}
              Explore our catalog of public domain books with our editor
            </p>
            <button className="hero-btn">Explore Now</button>
          </div>
          <div className="hero2">
            <div className="hero2-img1-cont">
              <img className=" hero2-img1" src={zeroToOne} alt="" />
            </div>
            <div className="hero2-img2-cont">
              <img className=" hero2-img2" src={hooked} alt="" />
            </div>
            <div className="hero2-img3-cont">
              <h1 className="hero2-h1-cont">
                <span className=" hero2-h1">1k+</span>
                <span className=" hero2-p">Books</span>
              </h1>
              <img className=" hero2-img3" src={egoBook} alt="" />
            </div>
          </div>
      </div>
      <CurrentlyReading />
        <div className="line-cont">
          <div className="line"></div>
        </div>
      <SocialHome />
      <Footer/>
    </>
  );
};

export default Home;
