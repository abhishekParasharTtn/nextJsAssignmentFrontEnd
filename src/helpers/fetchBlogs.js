import { queries } from "@/graphQl/query";
import { api } from "./api";

const fetchBlogs = async () => {
  const query = queries.getBlogsData();
  const blogsData = await api.get(query);
  return blogsData?.data;
};
const fetchBlogsByName = async (slug) => {
  const query = queries.getDataFromSlug(slug);
  const blogData = await api.get(query);
  return blogData?.data;
};
const deleteBlogsByName = async (id) => {
  const query = queries.deleteBlogById(id);
  const blogData = await api.delete(query);
  return blogData?.data;
};

export { fetchBlogs, fetchBlogsByName, deleteBlogsByName };
