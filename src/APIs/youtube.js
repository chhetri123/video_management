import axios from "axios";

// const API_KEY = "AIzaSyAjaB9AzQYAQpDgmJSNRQLTe7GzLC4U8xE";
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: 30,
    key: "AIzaSyAjaB9AzQYAQpDgmJSNRQLTe7GzLC4U8xE",
  },
});
