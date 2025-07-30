"use client";

import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Panel</h1>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Welcome to City IAS/PCS Academy Admin Panel
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-blue-900">Applications</h3>
                <p className="text-blue-700 text-sm mt-1">
                  Manage student applications
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-green-900">Courses</h3>
                <p className="text-green-700 text-sm mt-1">
                  Manage course offerings
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-purple-900">Faculty</h3>
                <p className="text-purple-700 text-sm mt-1">
                  Manage faculty members
                </p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-orange-900">Events</h3>
                <p className="text-orange-700 text-sm mt-1">
                  Manage events and announcements
                </p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-red-900">Settings</h3>
                <p className="text-red-700 text-sm mt-1">
                  Configure system settings
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <h3 className="font-medium text-gray-900">Analytics</h3>
                <p className="text-gray-700 text-sm mt-1">
                  View reports and analytics
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
