import * as yup from "yup";

export const postSchema = yup.object().shape({
  title: yup.string().required("Post title is required"),
  body: yup.string().required("Post body is required"),
  author: yup.string().required("Please select an author for this post"),
});