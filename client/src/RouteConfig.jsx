import { Route, Routes } from "react-router";
import CalendarPage from "./pages/CalendarPage.jsx";
import ManageSubsPage from "./pages/ManageSubsPage.jsx";
import ManageTagsPage from "./pages/ManageTagsPage.jsx";
import ExploreLocalPage from "./pages/ExploreLocalPage.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function RouteConfig() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscriptions"
        element={
          <ProtectedRoute>
            <ManageSubsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/permissions"
        element={
          <ProtectedRoute>
            <ManageTagsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/explore" element={<ExploreLocalPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
