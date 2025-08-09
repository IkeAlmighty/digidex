import { useState } from "react";
import { signup } from "../api/users.js";
import { useNavigate } from "react-router";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      return setErrorMessage("Your passwords do not match :(");
    }

    (async function () {
      const response = await signup(username, email, password);

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
      <h2 className="text-xl mb-4">Digidex | Create Account</h2>
      <div className="mb-3">
        <label className="block mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-3">
        <label className="block mb-1">Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
      <div className="mb-4">
        <label className="block mb-1">Repeat Password</label>
        <input
          type="password"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Create Account
      </button>

      <div className="text-red-500 text-xs">{errorMessage}</div>
    </form>
  );
}
