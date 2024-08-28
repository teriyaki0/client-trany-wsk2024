import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header.jsx";
import Home from "./pages/Home.jsx";
import Registration from "./pages/auth/RegisterPage.jsx";
import Login from "./pages/auth/LoginPage.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import AddPost from "./pages/AddPost.jsx";

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
