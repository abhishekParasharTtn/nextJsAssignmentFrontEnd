/* eslint-disable @next/next/no-img-element */
import styles from "./style.module.sass";
import config from "@/config";

export default function BlogDetails({ data }) {
  return (
    <div className="container pb-80">
      <div className={` h6 mb-10 c-orange`}>
        {data?.ComponentType?.replace(/_/g, " ")?.toUpperCase()}
      </div>
      <div className={`h3 mb-10`}>{data?.Title}</div>
      <img
        src={`${config.api}${data && data?.Image?.data?.attributes?.url}`}
        alt=""
        className={`${styles.featuredImage} mb-50`}
        width="1280"
        height="387"
      />
      <p>{data?.Summary}</p>
    </div>
  );
}
