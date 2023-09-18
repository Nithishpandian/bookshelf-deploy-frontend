import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/Index";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectRoute from "./pages/auth/ProtectRoute";
import SearchBook from "./pages/addBooks/SearchBook";
import BookShelf from "./pages/bookshelf/BookShelf";
import SocialPage from "./pages/social/SocialPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route element={<ProtectRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route path="/searchbook" element={<SearchBook />} />
          <Route path="/bookshelf" element={<BookShelf />} />
          <Route path="/posts" element={<SocialPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
