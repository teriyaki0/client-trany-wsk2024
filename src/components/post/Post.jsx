import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Skeleton from "./Skeleton";
import isAuthCheck from "../../utils/auth";

const Post = ({ id, title, description, imageUrl, userId, loading }) => {
  const [userCreating, setUserCreating] = useState([]);
  const [user, setUser] = useState([]);

  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingUser(true);
      try {
        const res = await axios.get(
          `https://server-trany-wsk2024-8c487984f960.herokuapp.com/auth/${userId}`
        );
        setUserCreating(res.data.user[0]);
        const user = await axios.get(
          `https://server-trany-wsk2024-8c487984f960.herokuapp.com/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUser(user.data.user[0]);
        setUserCreating(res.data.user[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleEdit = () => {
    navigate(`/post/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://server-trany-wsk2024-8c487984f960.herokuapp.com/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Post deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading && loadingUser) {
    return <Skeleton />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "30px",
        marginBottom: "30px",
      }}
    >
      <Card
        sx={{
          maxWidth: "700px",
          width: "100%",
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              src={userCreating.avatarImage}
              alt={userCreating.username}
            />
          }
          action={
            isAuthCheck &&
            userId == user.id && (
              <Box>
                <IconButton aria-label="edit" onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )
          }
          title={userCreating.username}
        />

        <Link to={`/post/${id}`}>
          <CardMedia
            component="img"
            height="400"
            image={imageUrl}
            alt={title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </Box>
  );
};

export default Post;
