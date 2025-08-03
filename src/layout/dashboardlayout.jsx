import React from "react";
import Sidebar from "../components/Sidebars";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="relative min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-16 md:ml-64">
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
