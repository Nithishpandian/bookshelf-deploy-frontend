import React, { useEffect, useState } from "react";
import "../../assets/styles/common/register.css";
import bgImg from "../../assets/images/login-bg.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [userName, setuserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/auth/login");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      toast.error("Password do not match");
    } else {
      const userData = {
        userName,
        emailId,
        password: password1,
      };
      dispatch(register(userData));
    }
  };

  return (
    <div className="register-page">
        <div className="img-cont">
          <img className="img" src={bgImg} alt="" />
        </div>
        <div className="register-cont-cont">
          <div className="register-cont">
            <h1 className="register-title">Get's started</h1>
            <form onSubmit={onSubmit}>
              <div>
                <input
                  onChange={(e) => setuserName(e.target.value)}
                  value={userName}
                  type="text"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <input
                  onChange={(e) => setEmailId(e.target.value)}
                  value={emailId}
                  type="email"
                  placeholder="EmailId"
                  required
                />
              </div>
              <div>
                <input
                  onChange={(e) => setPassword1(e.target.value)}
                  value={password1}
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <input
                  onChange={(e) => setPassword2(e.target.value)}
                  value={password2}
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="not-register-cont">
                <span className=" not-register">Already have an account? </span>
                <a href="/auth/login" className="not-register-bold">
                  Sign in
                </a>
              </div>
              <button type="submit" className="register-btn">
                {isLoading ? "Loading..." : "Sign in"}
              </button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Register;
