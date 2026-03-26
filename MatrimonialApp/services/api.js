import axios from "axios";

const API = axios.create({
  baseURL: "http://172.26.0.192:5000/api" // change your IP
});

export default API;