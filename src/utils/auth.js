import { jwtDecode } from "jwt-decode";

const isAuthCheck = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

export default isAuthCheck;
