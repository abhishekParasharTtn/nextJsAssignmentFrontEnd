import { fetchBlogs } from "@/helpers/fetchBlogs";
import ClientSideRenderPage from "./clientSideRenderPage";
import ServerSideRenderPage from "./serverSideRenderPage";
import StaticSiteGenerationPage from "./staticSiteGenerationPage";

export default function BlogDetails(props) {
  const slug = props.params.slug[1];
  const renderType = props.params.slug[0];
  const pageRender = () => {
    if (renderType === "Client_side_Rendering") {
      return <ClientSideRenderPage slug={slug} />;
    } else if (renderType === "Server_side_Rendering") {
      return <ServerSideRenderPage slug={slug} />;
    } else if (renderType === "Static_Site_Generation") {
      return <StaticSiteGenerationPage slug={slug} />;
    }
  };
  return <>{pageRender()}</>;
}
export async function generateStaticParams() {
  const blogs = await fetchBlogs();
  const filterData = blogs?.blogs?.data?.filter(
    (item) => item?.attributes?.ComponentType === "Static_Site_Generation"
  );
  const paths = filterData?.map((page) => ({
    slug: [page.attributes.ComponentType, page.attributes.Slug],
  }));
  return paths;
}
