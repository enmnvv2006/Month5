import axios from "axios";
import { API_BASE_URL } from "../../helpers/const";
import { useEffect, useState } from "react";
import styles from "./GetPosts.module.css";

export const GetPosts = () => {
  const [posts, setPosts] = useState([]);

  const GetAllPosts = async () => {
    try {
      const { data } = await axios.get(API_BASE_URL);
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  console.log(posts);

  useEffect(() => {
    GetAllPosts();
  }, []);

  return (
    <div className={styles.postsContainer}>
      <div className={styles.postsGrid}>
        {posts?.map((post) => (
          <div key={post.id} className={styles.postCard}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p className={styles.postBody}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
