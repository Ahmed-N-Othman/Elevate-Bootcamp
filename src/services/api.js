import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const postService = {
  getAllPosts: () => api.get("/posts"),

  getPostById: (id) => api.get(`/posts/${id}`),

  getAuthors: () => api.get("/users"),

  createPost: (data) => api.post("/posts", data),
};

export default api;
