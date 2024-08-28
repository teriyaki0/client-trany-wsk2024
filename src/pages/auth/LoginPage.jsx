import React, { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(
        "https://server-trany-wsk2024-8c487984f960.herokuapp.com/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      console.log("Response:", res);

      // Сохранение токена в localStorage
      localStorage.setItem("token", res.data.token);

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setError("Неправильный email или пароль");
    } finally {
      setLoading(false);
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
        maxWidth: 400,
        margin: "0 auto",
        mt: 5,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Вход
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />

      <TextField
        label="Пароль"
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        fullWidth
        disabled={loading}
      >
        {loading ? "Загрузка..." : "Войти"}
      </Button>
    </Box>
  );
};

export default Login;
