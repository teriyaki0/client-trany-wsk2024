import { useEffect, useState } from "react";
import Post from "../components/post/Post";
import axios from "axios";
import SkeletonPost from "../components/post/Skeleton";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://server-trany-wsk2024-8c487984f960.herokuapp.com/posts"
        );
        setPosts(res.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading
        ? Array.from({ length: 10 }).map((_, index) => (
            <SkeletonPost key={index} />
          ))
        : posts.map((item, index) => (
            <Post
              key={index}
              id={item.id}
              title={item.title}
              description={item.description}
              userId={item.userId}
              imageUrl={item.postImage}
              loading={loading}
            />
          ))}
    </>
  );
};

export default Home;
