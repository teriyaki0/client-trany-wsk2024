import React, { useEffect, useRef, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AddPost = () => {
  const inputFileRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditing = Boolean(id);
  const [imageUrl, setImageUrl] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(
          `https://server-trany-wsk2024-8c487984f960.herokuapp.com/posts/${id}`
        )
        .then(({ data }) => {
          console.log(data);
          setForm({
            title: data.post[0].title,
            description: data.post[0].description,
          });
          setImageUrl(data.post[0].postImage);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const { data } = isEditing
        ? await axios.put(
            `https://server-trany-wsk2024-8c487984f960.herokuapp.com/posts/${id}`,
            {
              title: form.title,
              description: form.description,
              postImage: imageUrl,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
        : await axios.post(
            "https://server-trany-wsk2024-8c487984f960.herokuapp.com/posts",
            {
              title: form.title,
              description: form.description,
              postImage: imageUrl,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
      console.log(data);
      navigate(`/post/${data.id}`);
    } catch (error) {
      console.error("Error submitting post:", error);
      // Optionally, show an error message to the user
    }
  };

  const onChangeFile = async (e) => {
    if (!e.target.files[0]) return; // Ensure a file is selected
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      const { data } = await axios.post(
        "https://server-trany-wsk2024-8c487984f960.herokuapp.com/upload",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setImageUrl(
        `https://server-trany-wsk2024-8c487984f960.herokuapp.com/${data.url}`
      );
      console.log(data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: 600,
        margin: "0 auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <TextField
        label="Заголовок"
        name="title"
        value={form.title}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />

      <TextField
        label="Описание"
        name="description"
        value={form.description}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
        required
        multiline
        rows={4}
      />

      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={() => inputFileRef.current.click()}
      >
        Загрузить Изображение
      </Button>
      <input type="file" hidden onChange={onChangeFile} ref={inputFileRef} />

      {imageUrl && (
        <Box sx={{ mt: 2 }}>
          <img
            src={`${imageUrl}`}
            alt="Uploaded"
            style={{ maxWidth: "100%" }}
          />
        </Box>
      )}

      <Box sx={{ display: "flex", gap: 2, mt: 3, width: "100%" }}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Создать пост
        </Button>
        <Link to="/" style={{ textDecoration: "none", width: "100%" }}>
          <Button variant="outlined" color="secondary" fullWidth>
            Отмена
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default AddPost;
