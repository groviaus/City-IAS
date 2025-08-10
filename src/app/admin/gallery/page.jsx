"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Image as ImageIcon,
  Upload,
  Trash2,
  Edit3,
  RefreshCw,
  Plus,
  Search,
  GripVertical,
} from "lucide-react";

const categories = [
  { id: "all", label: "All" },
  { id: "facilities", label: "Facilities" },
  { id: "hostel", label: "Hostel" },
  { id: "events", label: "Events" },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filterCat, setFilterCat] = useState("all");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    alt: "",
    category: "facilities",
    order_index: 0,
    files: [],
  });

  const fileInputRef = useRef(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      setItems(data.items || []);
    } catch (e) {
      setError("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const filtered = useMemo(() => {
    return (items || [])
      .filter((it) => (filterCat === "all" ? true : it.category === filterCat))
      .filter(
        (it) =>
          (it.title || "").toLowerCase().includes(search.toLowerCase()) ||
          (it.alt || "").toLowerCase().includes(search.toLowerCase())
      );
  }, [items, filterCat, search]);

  const onOpenNew = () => {
    setEditing(null);
    setForm({
      title: "",
      alt: "",
      category: "facilities",
      order_index: 0,
      files: [],
    });
    setModalOpen(true);
  };

  const onOpenEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title || "",
      alt: item.alt || "",
      category: item.category || "facilities",
      order_index: item.order_index || 0,
      files: [],
    });
    setModalOpen(true);
  };

  const onSave = async () => {
    if (!editing) {
      // create (multipart, multiple files allowed)
      if (!form.files || form.files.length === 0) return;
      const fd = new FormData();
      fd.append("title", form.title || "");
      fd.append("alt", form.alt || "Gallery Image");
      fd.append("category", form.category || "facilities");
      fd.append("order_index", String(form.order_index || 0));
      for (const f of form.files) fd.append("files", f);
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: fd,
      });
      if (res.ok) {
        setModalOpen(false);
        await fetchItems();
      }
    } else {
      // update meta, and optionally replace image if a file was chosen
      if (form.files && form.files.length > 0) {
        const fd = new FormData();
        fd.append("title", form.title || "");
        fd.append("alt", form.alt || "Gallery Image");
        fd.append("category", form.category || "facilities");
        fd.append("order_index", String(form.order_index || 0));
        fd.append("file", form.files[0]);
        const res = await fetch(`/api/admin/gallery/${editing.id}`, {
          method: "PATCH",
          body: fd,
        });
        if (res.ok) {
          setModalOpen(false);
          await fetchItems();
        }
      } else {
        const res = await fetch(`/api/admin/gallery/${editing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title || null,
            alt: form.alt || null,
            category: form.category || null,
            order_index: form.order_index,
          }),
        });
        if (res.ok) {
          setModalOpen(false);
          await fetchItems();
        }
      }
    }
  };

  const onDelete = async (id) => {
    if (!confirm("Delete this image?")) return;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: "DELETE" });
    if (res.ok) await fetchItems();
  };

  const onBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!confirm(`Delete ${selectedIds.length} item(s)?`)) return;
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "bulkDelete", ids: selectedIds }),
    });
    if (res.ok) {
      setSelectedIds([]);
      await fetchItems();
    }
  };

  const onReorder = async () => {
    // simple sequential order by current filtered index
    const itemsToOrder = filtered.map((it, idx) => ({
      id: it.id,
      order_index: idx,
    }));
    const res = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "reorder", items: itemsToOrder }),
    });
    if (res.ok) await fetchItems();
  };

  const toggleSelect = (id) =>
    setSelectedIds((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id]
    );

  const selectAll = () => setSelectedIds(filtered.map((i) => i.id));
  const clearSel = () => setSelectedIds([]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-600 mt-2">
            Manage gallery images, uploads and ordering.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchItems}>
            <RefreshCw className="h-4 w-4 mr-2" /> Refresh
          </Button>
          <Button onClick={onOpenNew}>
            <Plus className="h-4 w-4 mr-2" /> Add Images
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or alt..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={filterCat}
                onChange={(e) => setFilterCat(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              <Button variant="outline" onClick={onReorder}>
                <GripVertical className="h-4 w-4 mr-2" />
                Reorder (Auto)
              </Button>
            </div>
          </div>

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
                <Trash2 className="h-4 w-4 mr-2" /> Delete Selected
              </Button>
              <Button variant="outline" onClick={selectAll}>
                Select All
              </Button>
              <Button variant="outline" onClick={clearSel}>
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
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
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((it) => (
            <Card key={it.id} className="overflow-hidden">
              <div className="relative h-56 bg-gray-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={it.src}
                  alt={it.alt}
                  className="w-full h-full object-cover"
                />
                <input
                  type="checkbox"
                  className="absolute top-3 left-3 h-4 w-4 rounded"
                  checked={selectedIds.includes(it.id)}
                  onChange={() => toggleSelect(it.id)}
                />
                <Badge className="absolute top-3 right-3 bg-white text-gray-800">
                  {it.category}
                </Badge>
              </div>
              <CardContent className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900 line-clamp-1">
                    {it.title || "Untitled"}
                  </div>
                  <div className="text-xs text-gray-500">#{it.order_index}</div>
                </div>
                <div className="text-sm text-gray-600 line-clamp-1">
                  {it.alt}
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onOpenEdit(it)}
                  >
                    <Edit3 className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(it.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <ImageIcon className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No images yet
            </h3>
            <p className="text-gray-600 mb-4">
              Upload images to populate your gallery
            </p>
            <Button onClick={onOpenNew}>
              <Plus className="h-4 w-4 mr-2" /> Add Images
            </Button>
          </CardContent>
        </Card>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Image" : "Upload Images"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3">
            <label className="grid gap-1">
              <span className="text-sm text-gray-700">Title</span>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Optional title"
              />
            </label>
            <label className="grid gap-1">
              <span className="text-sm text-gray-700">Alt text</span>
              <Input
                value={form.alt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, alt: e.target.value }))
                }
                placeholder="Describe the image"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="grid gap-1">
                <span className="text-sm text-gray-700">Category</span>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="border rounded px-3 py-2"
                >
                  {categories
                    .filter((c) => c.id !== "all")
                    .map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.label}
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
                    setForm((f) => ({
                      ...f,
                      order_index: Number(e.target.value) || 0,
                    }))
                  }
                />
              </label>
            </div>

            <div className="grid gap-1">
              <span className="text-sm text-gray-700">
                {editing ? "Replace image (optional)" : "Select images"}
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple={!editing}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    files: Array.from(e.target.files || []),
                  }))
                }
                className="block w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={onSave}>
                <Upload className="h-4 w-4 mr-2" />{" "}
                {editing ? "Save" : "Upload"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
