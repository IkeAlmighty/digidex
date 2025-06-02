import { useState } from "react";
import { login } from "../api/users.js";
import { useNavigate } from "react-router";

export default function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    (async function () {
      const response = await login(email, password);

      if (response.ok) {
        // redirect to dashboard
        navigate("/");
      } else {
        const data = await response.json();
        const { message } = data;

        setErrorMessage(message);
      }
    })();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-4 border rounded"
    >
      <h2 className="text-xl mb-4">Login</h2>
      <div className="mb-3">
        <label className="block mb-1">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Log In
      </button>

      <div className="text-red-500 text-xs">{errorMessage}</div>
    </form>
  );
}
