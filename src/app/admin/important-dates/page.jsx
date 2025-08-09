"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Calendar, Plus, Trash2, Edit3, RefreshCw } from "lucide-react";

const defaultItem = {
  icon: "Calendar",
  title: "",
  date_text: "",
  year_text: "",
  order_index: 0,
  active: 1,
};

const iconOptions = ["Calendar", "Target", "BookOpen"];

export default function AdminImportantDatesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(defaultItem);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/important-dates");
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      setError("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const onOpenNew = () => {
    setEditingId(null);
    setForm(defaultItem);
    setModalOpen(true);
  };
  const onOpenEdit = (it) => {
    setEditingId(it.id);
    setForm({ ...it });
    setModalOpen(true);
  };

  const onSave = async () => {
    if (!form.title || !form.date_text || !form.year_text) return;
    if (editingId) {
      await fetch(`/api/admin/important-dates/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch("/api/admin/important-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", ...form }),
      });
    }
    setModalOpen(false);
    await fetchItems();
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/admin/important-dates/${id}`, { method: "DELETE" });
    await fetchItems();
  };

  const onBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} item(s)?`)) return;
    await fetch("/api/admin/important-dates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "bulkDelete", ids: selectedIds }),
    });
    setSelectedIds([]);
    await fetchItems();
  };

  const toggleSelect = (id) =>
    setSelectedIds((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );
  const selectAll = () => setSelectedIds(items.map((i) => i.id));
  const clearSel = () => setSelectedIds([]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Important Dates</h1>
          <p className="text-gray-600 mt-2">
            Manage the content shown on the website's Important Dates section.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchItems}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={onOpenNew}>
            <Plus className="h-4 w-4 mr-2" />
            Add Date
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedIds.length} selected
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                onClick={onBulkDelete}
                disabled={selectedIds.length === 0}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
              <Button variant="outline" onClick={selectAll}>
                Select All
              </Button>
              <Button variant="outline" onClick={clearSel}>
                Clear
              </Button>
            </div>
          </div>

          <div className="w-full overflow-auto">
            <table className="min-w-[800px] w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2"></th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Date</th>
                  <th className="p-2 text-left">Year/Meta</th>
                  <th className="p-2 text-left">Icon</th>
                  <th className="p-2 text-left">Order</th>
                  <th className="p-2 text-left">Active</th>
                  <th className="p-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.id} className="border-t">
                    <td className="p-2">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(it.id)}
                        onChange={() => toggleSelect(it.id)}
                      />
                    </td>
                    <td className="p-2 font-medium">{it.title}</td>
                    <td className="p-2">{it.date_text}</td>
                    <td className="p-2">{it.year_text}</td>
                    <td className="p-2">{it.icon}</td>
                    <td className="p-2">{it.order_index}</td>
                    <td className="p-2">{it.active ? "Yes" : "No"}</td>
                    <td className="p-2 flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onOpenEdit(it)}
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(it.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Date" : "Add Date"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3">
            <label className="grid gap-1">
              <span className="text-sm text-gray-700">Title</span>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Admissions Start"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-gray-700">Date Label</span>
              <Input
                value={form.date_text}
                onChange={(e) =>
                  setForm({ ...form, date_text: e.target.value })
                }
                placeholder="1st July"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-gray-700">Year/Meta</span>
              <Input
                value={form.year_text}
                onChange={(e) =>
                  setForm({ ...form, year_text: e.target.value })
                }
                placeholder="2025"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1">
                <span className="text-sm text-gray-700">Icon</span>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="border rounded px-3 py-2"
                >
                  {iconOptions.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1">
                <span className="text-sm text-gray-700">Order</span>
                <Input
                  type="number"
                  value={form.order_index}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      order_index: Number(e.target.value) || 0,
                    })
                  }
                />
              </label>
            </div>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!form.active}
                onChange={(e) =>
                  setForm({ ...form, active: e.target.checked ? 1 : 0 })
                }
              />
              <span className="text-sm">Active</span>
            </label>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={onSave}>{editingId ? "Save" : "Create"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
