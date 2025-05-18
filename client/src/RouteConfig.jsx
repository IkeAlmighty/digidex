import { Route, Routes } from "react-router";
import CalendarPage from "./pages/CalendarPage.jsx";
import ManageSubsPage from "./pages/ManageSubsPage.jsx";
import ManageTagsPage from "./pages/ManageTagsPage.jsx";
import ExploreLocalPage from "./pages/ExploreLocalPage.jsx";
import Login from "./pages/Login.jsx";

export default function RouteConfig() {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
      <Route path="/subscriptions" element={<ManageSubsPage />} />
      <Route path="/permissions" element={<ManageTagsPage />} />
      <Route path="/explore" element={<ExploreLocalPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
