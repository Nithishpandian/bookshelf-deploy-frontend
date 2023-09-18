import React, { useState } from "react";
import "../../assets/styles/common/Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem("myToken");
    navigate("/auth/login");
  };
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="navbar-cont">
        <h1 className="logo">Bookshelf</h1>

          <div className={`${open ? "link-cont-res" : "link-cont"}`}>
            <a href="/">Dashboard</a>
            <a href="/searchbook">Add Books</a>
            <a href="/posts">Social</a>
            <a href="/bookshelf">Bookshelf</a>
          </div>

        <div className="logout-cont">
          <button onClick={logOut} className="logout">
            Logout
          </button>
        </div>
        <div className="menu-cont" onClick={() => setOpen(!open)}>
          <ion-icon name="menu-outline" size="large"></ion-icon>
        </div>
      </div>
    </>
  );
};

export default Navbar;
