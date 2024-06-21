import Card from "./components/card/card";
import { fetchBlogs } from "@/helpers/fetchBlogs";

export default async function Home() {
  const blogs = await fetchBlogs();
  return (
    <>
      <div className="container pb-80">
        {blogs?.blogs?.data?.length === 0 && <p>No Data Found ...</p>}
        {blogs &&
          blogs?.blogs?.data?.map((item) => {
            return (
              <Card key={item?.id} id={item?.id} blog={item?.attributes} />
            );
          })}
      </div>
    </>
  );
}
