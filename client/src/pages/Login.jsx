import { useState } from "react";
import { login } from "../api/users.js";
import { useNavigate, Link } from "react-router";

export default function Login() {
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("12345");

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
        <label className="block mb-1">
          Email{" "}
          <span className="text-xs italic">(test email is test@test.com)</span>
        </label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">
          Password
          <span className="text-xs italic">(test password is 12345)</span>
        </label>
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

      <div className="mt-10">
        No account?{" "}
        <Link className="text-2xl underline text-blue-500" to="/signup">
          Sign Up &lt;3
        </Link>
      </div>
    </form>
  );
}
