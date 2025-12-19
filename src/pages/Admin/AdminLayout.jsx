import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;