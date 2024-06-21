import { fetchBlogsByName } from "@/helpers/fetchBlogs";
import BlogDetails from "./blogDetailPage";

const ServerSideRenderPage = async (props) => {
  const blog = await fetchBlogsByName(props.slug);
  return <BlogDetails data={blog?.blogs?.data[0]?.attributes} />;
};

export default ServerSideRenderPage;
