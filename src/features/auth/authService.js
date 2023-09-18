import axios from "axios";

const API_URL = `${process.env.REACT_APP_BASE_URL}/user`;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "/register", userData);

  return response.data;
};

// Login user
const login = async (userData) => {
  console.log(API_URL + "/login");
  await axios
    .post(API_URL + "/login", userData)
    .then((res) => {
      sessionStorage.setItem("myToken", JSON.stringify(res.data.token));
    })
    .catch((err) => console.log(err));
};

// Logout user
const logout = () => {
  sessionStorage.removeItem("myToken");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
