import axios from "axios";

const API_URL = "http://localhost:4000/api/book";

// Search Books
const getAllBooks = async () => {
  const token = sessionStorage.getItem("myToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token.replace(/^"(.+(?="$))"$/, "$1")}`,
    },
  };

  const response = await axios.get(API_URL + "/getallbooks", config);

  return response.data;
};

const bookshelfService = {
  getAllBooks,
};

export default bookshelfService;
