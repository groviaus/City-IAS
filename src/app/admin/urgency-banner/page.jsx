"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, Plus, Save, RefreshCw } from "lucide-react";

const defaultItem = {
  title: "⏰ Don't Wait! Seats Filling Fast",
  subtitle: "Batch starts {date} - Only {seats} seats available",
  batch_start_date: "2025-08-30",
  available_seats: 50,
  active: 1,
};

export default function AdminUrgencyBannerPage() {
  const [item, setItem] = useState(defaultItem);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [previewTime, setPreviewTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const fetchItem = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/urgency-banner");
      if (response.ok) {
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          const banner = data.items[0];
          // Ensure batch_start_date is in YYYY-MM-DD format
          const batchDate = banner.batch_start_date
            ? banner.batch_start_date.split("T")[0]
            : defaultItem.batch_start_date;

          setItem({
            id: banner.id,
            title: banner.title,
            subtitle: banner.subtitle,
            batch_start_date: batchDate,
            available_seats: banner.available_seats,
            active: banner.active,
          });
        }
      }
    } catch (e) {
      console.error("Error fetching urgency banner:", e);
      setError("Failed to fetch current settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  // Calculate preview time whenever batch_start_date changes
  useEffect(() => {
    if (!item.batch_start_date) return;

    const calculatePreviewTime = () => {
      // Ensure we have a clean date string (YYYY-MM-DD format)
      const cleanDateString = item.batch_start_date
        ? item.batch_start_date.split("T")[0]
        : null;

      if (!cleanDateString) {
        setPreviewTime({ days: 0, hours: 0, minutes: 0 });
        return;
      }

      const batchStartDate = new Date(cleanDateString + "T00:00:00");
      const now = new Date();

      const timeDifference = batchStartDate.getTime() - now.getTime();

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );

        setPreviewTime({ days, hours, minutes });
      } else {
        // If batch has already started
        setPreviewTime({ days: 0, hours: 0, minutes: 0 });
      }
    };

    // Calculate initial time
    calculatePreviewTime();

    // Update every minute
    const interval = setInterval(calculatePreviewTime, 60000);

    return () => clearInterval(interval);
  }, [item.batch_start_date]);

  const onSave = async () => {
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);

      // Ensure batch_start_date is in YYYY-MM-DD format
      const cleanBatchDate = item.batch_start_date
        ? item.batch_start_date.split("T")[0]
        : item.batch_start_date;

      const action = item.id ? "update" : "create";
      const response = await fetch("/api/admin/urgency-banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          ...item,
          batch_start_date: cleanBatchDate,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        // Refresh to get the updated item
        await fetchItem();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError("Failed to save settings");
      }
    } catch (e) {
      console.error("Error saving urgency banner:", e);
      setError("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  const onReset = () => {
    setItem(defaultItem);
    setError(null);
    setSuccess(false);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="space-y-4">
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Urgency Banner</h1>
          <p className="text-gray-600 mt-2">
            Manage the content and timing of the urgency banner displayed on the
            website.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={fetchItem}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={onReset}>
            Reset to Default
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Banner Content & Timing</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <label className="grid gap-2">
              <span className="text-sm font-medium text-gray-700">
                Main Title
              </span>
              <Input
                value={item.title}
                onChange={(e) => setItem({ ...item, title: e.target.value })}
                placeholder="⏰ Don't Wait! Seats Filling Fast"
              />
              <p className="text-xs text-gray-500">
                This is the main heading displayed in the banner
              </p>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-gray-700">
                Subtitle
              </span>
              <Input
                value={item.subtitle}
                onChange={(e) => setItem({ ...item, subtitle: e.target.value })}
                placeholder="Batch starts {date} - Only {seats} seats available"
              />
              <p className="text-xs text-gray-500">
                Use {"{date}"} and {"{seats}"} as placeholders. They will be
                automatically replaced.
              </p>
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label className="grid gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Batch Start Date
                </span>
                <Input
                  type="date"
                  value={item.batch_start_date}
                  onChange={(e) =>
                    setItem({ ...item, batch_start_date: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  The date when the new batch starts
                </p>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Available Seats
                </span>
                <Input
                  type="number"
                  min="1"
                  max="999"
                  value={item.available_seats}
                  onChange={(e) =>
                    setItem({
                      ...item,
                      available_seats: Number(e.target.value) || 1,
                    })
                  }
                />
                <p className="text-xs text-gray-500">
                  Number of seats currently available
                </p>
              </label>
            </div>

            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!item.active}
                onChange={(e) =>
                  setItem({ ...item, active: e.target.checked ? 1 : 0 })
                }
                className="rounded border-gray-300"
              />
              <span className="text-sm font-medium text-gray-700">Active</span>
              <p className="text-xs text-gray-500 ml-2">
                Show this banner on the website
              </p>
            </label>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700 text-sm">
              Settings saved successfully!
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onReset}>
              Reset
            </Button>
            <Button onClick={onSave} disabled={saving}>
              {saving ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
              <div className="space-y-1">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-orange-100">
                  {item.subtitle
                    .replace(
                      "{date}",
                      new Date(
                        (item.batch_start_date
                          ? item.batch_start_date.split("T")[0]
                          : "") + "T00:00:00"
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    )
                    .replace("{seats}", item.available_seats)}
                </p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold">{previewTime.days}</div>
                  <div className="text-xs">Days Left</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{previewTime.hours}</div>
                  <div className="text-xs">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {previewTime.minutes}
                  </div>
                  <div className="text-xs">Minutes</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
