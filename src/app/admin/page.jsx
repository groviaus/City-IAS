"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamic import for admin components to reduce initial bundle size
const AdminDashboard = dynamic(() => import("./components/AdminDashboard"), {
  loading: () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Dashboard...
        </h2>
      </div>
    </div>
  ),
  ssr: false, // Disable SSR for admin panel for faster client-side rendering
});

const AdminPanel = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">
              Loading Admin Panel...
            </h2>
          </div>
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
};

export default AdminPanel;
