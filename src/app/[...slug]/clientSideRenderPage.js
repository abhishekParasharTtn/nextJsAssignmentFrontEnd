"use client";
import { useEffect, useState } from "react";
import BlogDetails from "./blogDetailPage";
import { fetchBlogsByName } from "@/helpers/fetchBlogs";

const ClientSideRenderPage = (props) => {
  const [data, setData] = useState([]);
  const getBlogData = async () => {
    const blog = await fetchBlogsByName(props.slug);
    setData(blog?.blogs?.data[0]?.attributes);
  };
  useEffect(() => {
    getBlogData();
  }, []);
  return <BlogDetails data={data} />;
};

export default ClientSideRenderPage;
