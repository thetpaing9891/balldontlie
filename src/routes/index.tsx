import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/index";
import Dashboard from "../pages/auth/dashboard/index";
import LoginIndex from "./login/index";
import AdminIndex from "./auth/index";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginIndex />}>
        <Route path="" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
      <Route path="/admin" element={<AdminIndex />}>
        <Route path="" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="" replace />} />
      </Route>
    </Routes>
  );
}
