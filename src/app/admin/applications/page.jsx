"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("cards");
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusDraft, setStatusDraft] = useState({});

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/admin/applications");
      if (response.ok) {
        const data = await response.json();
        setApplications(data.applications || []);
      } else {
        throw new Error(`Failed to fetch applications: ${response.status}`);
      }
    } catch (error) {
      setError(`Failed to load applications: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        text: "Pending",
        icon: Clock,
      },
      approved: {
        color: "bg-green-100 text-green-800",
        text: "Approved",
        icon: GraduationCap,
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        text: "Rejected",
        icon: GraduationCap,
      },
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    return (
      <Badge className={config.color}>
        <Icon className="h-3 w-3 mr-1" />
        {config.text}
      </Badge>
    );
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.city_state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || (app.status || "pending") === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    const currentIds = filteredApplications.map((a) => a.id);
    const allSelected = currentIds.every((id) => selectedIds.includes(id));
    setSelectedIds(
      allSelected
        ? selectedIds.filter((id) => !currentIds.includes(id))
        : Array.from(new Set([...selectedIds, ...currentIds]))
    );
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} selected application(s)?`))
      return;
    const res = await fetch("/api/admin/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "delete", ids: selectedIds }),
    });
    if (res.ok) {
      setSelectedIds([]);
      await fetchApplications();
    }
  };

  const handleBulkStatus = async (status) => {
    if (selectedIds.length === 0) return;
    const res = await fetch("/api/admin/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "status", ids: selectedIds, status }),
    });
    if (res.ok) {
      setSelectedIds([]);
      await fetchApplications();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this application?")) return;
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "DELETE",
    });
    if (res.ok) await fetchApplications();
  };

  const handleUpdateStatus = async (id, status) => {
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) await fetchApplications();
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="text-center py-12">
            <GraduationCap className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Error Loading Applications
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <Button onClick={fetchApplications}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Student Applications
          </h1>
          <p className="text-gray-600 mt-2">
            Manage and review student applications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchApplications}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              setViewMode(viewMode === "cards" ? "table" : "cards")
            }
          >
            {viewMode === "cards" ? "Table View" : "Card View"}
          </Button>
        </div>
      </div>

      {/* Search / Filter / Bulk actions */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={
                  filteredApplications.length > 0 &&
                  filteredApplications.every((a) => selectedIds.includes(a.id))
                }
                onChange={toggleSelectAll}
              />
              <span className="text-sm text-gray-600">Select all in view</span>
              {selectedIds.length > 0 && (
                <span className="text-sm text-gray-500">
                  ({selectedIds.length} selected)
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                disabled={selectedIds.length === 0}
              >
                Delete Selected
              </Button>
              <select
                onChange={(e) =>
                  e.target.value && handleBulkStatus(e.target.value)
                }
                defaultValue=""
                className="border border-gray-300 rounded-lg px-3 py-2"
                disabled={selectedIds.length === 0}
              >
                <option value="" disabled>
                  Set status for selected…
                </option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {viewMode === "cards" ? (
        filteredApplications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApplications.map((app) => {
              const draft = statusDraft[app.id] ?? app.status ?? "pending";
              return (
                <Card
                  key={app.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {getStatusBadge(app.status || "pending")}
                        </div>
                        <CardTitle className="text-lg text-gray-900">
                          {app.name}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {app.course}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="mt-1"
                        checked={selectedIds.includes(app.id)}
                        onChange={() => toggleSelect(app.id)}
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{app.city_state}</span>
                      </div>
                      {app.email && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{app.email}</span>
                        </div>
                      )}
                      {app.phone && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{app.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {new Date(app.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <select
                        value={draft}
                        onChange={(e) =>
                          setStatusDraft((s) => ({
                            ...s,
                            [app.id]: e.target.value,
                          }))
                        }
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleUpdateStatus(
                            app.id,
                            statusDraft[app.id] ?? app.status ?? "pending"
                          )
                        }
                      >
                        Update
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(app.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                        className="ml-auto"
                      >
                        <Link href={`/admin/applications/${app.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <GraduationCap className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterStatus !== "all"
                  ? "No applications found"
                  : "No applications yet"}
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Applications will appear here once students start applying"}
              </p>
            </CardContent>
          </Card>
        )
      ) : (
        // Table view
        <div className="w-full overflow-auto">
          <table className="min-w-[800px] w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 text-left">
                  <input
                    type="checkbox"
                    checked={
                      filteredApplications.length > 0 &&
                      filteredApplications.every((a) =>
                        selectedIds.includes(a.id)
                      )
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Course</th>
                <th className="p-2 text-left">City/State</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Created</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => {
                const draft = statusDraft[app.id] ?? app.status ?? "pending";
                return (
                  <tr key={app.id} className="border-t">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(app.id)}
                        onChange={() => toggleSelect(app.id)}
                      />
                    </td>
                    <td className="p-2 font-medium">{app.name}</td>
                    <td className="p-2">{app.course}</td>
                    <td className="p-2">{app.city_state}</td>
                    <td className="p-2">{app.email}</td>
                    <td className="p-2">{app.phone}</td>
                    <td className="p-2">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-2">
                      <select
                        value={draft}
                        onChange={(e) =>
                          setStatusDraft((s) => ({
                            ...s,
                            [app.id]: e.target.value,
                          }))
                        }
                        className="border border-gray-300 rounded-lg px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="p-2 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleUpdateStatus(
                            app.id,
                            statusDraft[app.id] ?? app.status ?? "pending"
                          )
                        }
                      >
                        Update
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(app.id)}
                      >
                        Delete
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/admin/applications/${app.id}`}>View</Link>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary */}
      <div className="text-center text-sm text-gray-500">
        Showing {filteredApplications.length} of {applications.length} total
        applications
      </div>
    </div>
  );
};

export default AdminApplications;
