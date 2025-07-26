import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { me } from "../api/users.js";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // null == loading

  useEffect(() => {
    async function fetchAndSetUser() {
      const response = await me();

      if (response.ok) {
        setUser(await response.json());
      } else if (response.status === 401) {
        navigate("/login");
      } else {
        console.log(await response.json());
      }
    }

    fetchAndSetUser();
  }, []);

  if (user === null) return <div>...Loading</div>;

  // inject user into valid elements:
  return React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { user });
    }

    return child;
  });
}
