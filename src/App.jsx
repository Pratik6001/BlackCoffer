import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/dashboardlayout";
import Dashboard from "./components/DataDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />}></Route>
      </Route>
    </Routes>
  );
}
export default App;
