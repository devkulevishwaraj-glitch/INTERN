import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loggedInUser = await login(email, password);

      alert("Login Successful");

      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else if (loggedInUser.role === "teacher") {
        navigate("/teacher");
      } else if (loggedInUser.role === "student") {
        navigate("/student");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.log("Error:", err);
      console.log("Response:", err.response);
      console.log("Data:", err.response?.data);

      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Login</button>

        <br />
        <br />

        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;