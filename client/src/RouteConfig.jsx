import { Route, Routes } from "react-router";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ContactsPage from "./pages/ContactsPage.jsx";
import Signup from "./pages/Signup.jsx";
import ImportContacts from "./pages/ImportContacts.jsx";

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
      <Route path="/signup" element={<Signup />} />
      <Route path="/import" element={<ImportContacts />} />
    </Routes>
  );
}
