import { Route, Routes } from "react-router";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";

export default function RouteConfig() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ContactsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
