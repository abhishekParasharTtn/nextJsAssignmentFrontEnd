"use client";
import Image from "next/image";
import styles from "./card.module.sass";
import Button from "../button/button";
import config from "@/config";
import Link from "next/link";
import { queries } from "@/graphQl/query";
import PopUp from "../popUp/popUp";
import { useState } from "react";

function Card({ blog, id }) {
  const [showPopUp, setShowPopUp] = useState(false);
  function limitWords(text, wordLimit) {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  }
  const onDeleteHandler = async () => {
    try {
      const response = await fetch(`${config.api}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: queries.deleteBlogById(),
          variables: {
            id: id,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        setShowPopUp(false);
        console.error("Error deleting blog:", result.errors);
      } else {
        setShowPopUp(false);
        console.log("Blog deleted:", result.data.deleteBlog.data);
      }
    } catch (error) {
      setShowPopUp(false);
      console.error("Error deleting blog:", error);
    }
  };
  const onCancelClick = () => {
    setShowPopUp(false);
  };
  return (
    <>
      {showPopUp && (
        <PopUp onCancelClick={onCancelClick} onYesClick={onDeleteHandler} />
      )}
      <div className={`${styles.card} mb-20`}>
        <div className={styles.card_imageWrap}>
          <div className={styles.card_image}>
            <Image
              src={`${config.api}${blog?.Image?.data?.attributes?.url}`}
              alt="thumbnail"
              fill={true}
            />
          </div>
        </div>
        <div className={styles.card_content}>
          <div className={`${styles.card_label} h6 mb-10 c-orange`}>
            {blog?.ComponentType.replace(/_/g, " ").toUpperCase()}
            <div className={styles.edit_delete_conatiner}>
              <div
                className={`${styles.delete_btn}`}
                onClick={() => {
                  setShowPopUp(true);
                }}
              >
                X
              </div>
              <Link href={`/editBlog/${blog?.Slug}/${id}`}>
                <div className={styles.edit_btn}>Edit</div>
              </Link>
            </div>
          </div>
          <div className={`${styles.card_title} h3 mb-20`}>{blog?.Title}</div>
          <p className={styles.card_summary}>{limitWords(blog?.Summary, 20)}</p>
          <Button href={`/${blog?.ComponentType}/${blog?.Slug}`}>
            Read More...
          </Button>
        </div>
      </div>
    </>
  );
}

export default Card;
