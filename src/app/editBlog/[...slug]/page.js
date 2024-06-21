/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import styles from "./editBlog.module.sass";
import { fetchBlogsByName } from "@/helpers/fetchBlogs";
import config from "@/config";
import { queries } from "@/graphQl/query";
import Loader from "@/app/components/loader/loader";

const EditBlog = (props) => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState(null);
  const slug = props.params.slug[0];
  const id = props.params.slug[1];

  const getBlogData = async () => {
    const blog = await fetchBlogsByName(slug);
    setSummary(blog?.blogs?.data[0]?.attributes?.Summary);
    setTitle(blog?.blogs?.data[0]?.attributes?.Title);
    setBlog(blog?.blogs?.data[0]?.attributes);
  };

  useEffect(() => {
    getBlogData();
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const response = await fetch(`${config.api}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queries.EditBlogById(),
          variables: {
            id: id,
            data: {
              Title: title,
              Summary: summary,
            },
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        setLoading(false);
        console.error("Error updating blog:", result.errors);
      } else {
        setLoading(false);
        console.log("Blog updated:", result.data.updateBlog.data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating blog:", error);
    }
  };
  return (
    <>
      {loading || !Boolean(blog) ? <Loader /> : null}
      <div className="container pb-80">
        <label>Title</label>
        <input
          type="text"
          className={styles.titleInput}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <div className={styles.summaryContainer}>
          <label className={styles.label}>Summary</label>
          <textarea
            className={styles.summary}
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
          />
        </div>
        <div
          className={styles.saveButton}
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </div>
      </div>
    </>
  );
};

export default EditBlog;
