import axios from "axios";

// Search Books
const searchedAllBooks = async (bookName) => {
  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${bookName}&key=${process.env.REACT_APP_API_KEY}`
  );
  // console.log(response.data.items);
  if (response) {
    return response.data.items;
  } else {
    return "No Books Available";
  }
};

const searchService = {
  searchedAllBooks,
};

export default searchService;
