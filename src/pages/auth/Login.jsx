import React, { useState, useEffect } from "react";
import "../../assets/styles/common/login.css";
import bgImg from "../../assets/images/login-bg.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      emailId,
      password,
    };
    dispatch(login(userData));
  };
  return (
    <div className="login-page">
        <div className="img-cont">
          <img className="img" src={bgImg} alt="" />
        </div>

        <div className="login-cont-cont">
          <div className="login-cont">
            <h1 className="login-title">Welcome back !</h1>
            <form onSubmit={onSubmit}>
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
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="not-login-cont">
                <span className=" not-login">Already have an account? </span>
                <a href="/auth/register" className="not-login-bold">
                  Sign in
                </a>
              </div>
              <button type="submit" className="login-btn">
                {isLoading ? "Loading..." : "Sign up"}
              </button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default Login;
