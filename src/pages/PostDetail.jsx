import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://server-trany-wsk2024-8c487984f960.herokuapp.com/posts/${id}`
        );
        setPost(data.post[0]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [id]);

  return post ? (
    <Box
      sx={{
        display: "flex",
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      <Card
        sx={{
          maxWidth: "900px",
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          height="500"
          image={post.postImage}
          alt={post.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  ) : (
    <Typography>Loading...</Typography> // Fallback content while loading
  );
};

export default Post;
