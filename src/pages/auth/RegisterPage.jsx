import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const Registration = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.password) {
      setError("Все поля обязательны для заполнения.");
      return false;
    }
    if (form.password.length < 6) {
      setError("Пароль должен содержать не менее 6 символов.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "https://server-trany-wsk2024-8c487984f960.herokuapp.com/auth/register",
        form
      );
      console.log("Response:", response);
      // Действия после успешной регистрации (напр. перенаправление)
    } catch (error) {
      console.error("Error:", error);
      setError("Ошибка при регистрации. Пожалуйста, попробуйте снова.");
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
        Регистрация
      </Typography>

      {error && (
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        label="Имя"
        name="name"
        value={form.name}
        onChange={handleChange}
        variant="outlined"
        margin="normal"
        fullWidth
        required
      />

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
        {loading ? <CircularProgress size={24} /> : "Зарегистрироваться"}
      </Button>
    </Box>
  );
};

export default Registration;
