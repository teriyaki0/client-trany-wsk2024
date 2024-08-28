import { Container, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import isAuthCheck from "../../utils/auth";

const Header = () => {
  const isAuth = isAuthCheck();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div className={styles.root}>
        <Container maxWidth="lg">
          <div className={styles.buttons}>
            <Link to="/">
              <Typography
                variant="h5"
                component="h1"
                sx={{ flexGrow: 1, lineHeight: 1 }}
              >
                Home
              </Typography>
            </Link>

            {isAuth ? (
              <div>
                <Link to="/add-post">
                  <Button variant="contained">Написать Статью</Button>
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleLogOut}
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <div>
                <Link to="/login">
                  <Button variant="contained">Войти</Button>
                </Link>
                <Link to="/registration">
                  <Button variant="contained">Создать Аккаунт</Button>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
