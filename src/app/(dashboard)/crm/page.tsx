'use client';

import { useState, useEffect } from "react";
import { Search, Eye, Pencil, Trash2, Bell, Sun, Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";

type Client = {
  name: string;
  company: string;
  phone: string;
  invoices: number;
  pending: number;
  lastContact: string;
};

const dummyClients: Client[] = [
  {
    name: "XYZ Company",
    company: "xyz",
    phone: "+92 321 7654321",
    invoices: 0,
    pending: 0,
    lastContact: "18/10/2025",
  },
  {
    name: "Best Distributors",
    company: "Best Distributors",
    phone: "+92 333 9876543",
    invoices: 0,
    pending: 0,
    lastContact: "18/10/2025",
  },
  {
    name: "ABC Traders",
    company: "ABC Traders",
    phone: "+92 300 1234567",
    invoices: 0,
    pending: 0,
    lastContact: "18/10/2025",
  },
];

export default function CRMPage() {
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when pressing Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = dummyClients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar (visible on large screens) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Sidebar Drawer (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="w-64 bg-white shadow-lg h-full animate-slideIn"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto transition-all duration-300 lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b px-4 md:px-6 py-3 flex items-center justify-between gap-3 sticky top-0 z-40">
          <div className="flex items-center gap-2 w-full sm:w-1/2">
            {/* Sidebar toggle button (mobile only) */}
            <button
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            <input
              type="text"
              placeholder="Search clients, invoices, products..."
              className="border rounded-lg px-4 py-2 w-full text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <Sun className="w-5 h-5 text-gray-600" />
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
              M
            </div>
          </div>
        </header>

        {/* CRM Title */}
        <div className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">CRM</h1>
            <p className="text-gray-600 text-sm md:text-base">
              Manage your clients and relationships
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2 w-full sm:w-auto justify-center">
            + Add Client
          </button>
        </div>

        {/* Search bar */}
        <div className="px-4 md:px-6 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients by name, company, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-10 py-2 rounded-lg w-full bg-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="px-4 md:px-6 pb-6 overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg border text-sm">
            <thead className="bg-gray-100 text-gray-600 text-xs md:text-sm">
              <tr>
                <th className="p-3 text-left whitespace-nowrap">Name</th>
                <th className="p-3 text-left whitespace-nowrap">Company</th>
                <th className="p-3 text-left whitespace-nowrap">Phone</th>
                <th className="p-3 text-left whitespace-nowrap">Invoices</th>
                <th className="p-3 text-left whitespace-nowrap">Pending</th>
                <th className="p-3 text-left whitespace-nowrap">Last Contact</th>
                <th className="p-3 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((c, i) => (
                <tr
                  key={i}
                  className="border-b hover:bg-gray-50 text-gray-700 transition"
                >
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.company}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{c.invoices}</td>
                  <td className="p-3 text-green-600">Rs {c.pending}</td>
                  <td className="p-3">{c.lastContact}</td>
                  <td className="p-3 flex justify-end gap-2">
                    <Eye className="w-4 h-4 cursor-pointer hover:text-blue-600" />
                    <Pencil className="w-4 h-4 cursor-pointer hover:text-yellow-600" />
                    <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-600" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className="text-center text-gray-500 text-sm mt-6">
              No clients found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
