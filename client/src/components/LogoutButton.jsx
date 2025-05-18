import { useNavigate } from "react-router";
import { logout } from "../api/accounts";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logout();

    if (response.ok) {
      navigate("/login");
    } else {
      //TODO: add toast notification
      console.log(await response.json());
    }
  };

  return (
    <button onClick={handleLogout} className="p-3 cursor-pointer">
      Logout
    </button>
  );
}
