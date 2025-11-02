"use client";

import { useState } from "react";
import { Search, Eye, Pencil, Trash2, Bell, Sun } from "lucide-react";
import Link from "next/link";
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
  { name: "XYZ Company", company: "xyz", phone: "+92 321 7654321", invoices: 0, pending: 0, lastContact: "18/10/2025" },
  { name: "Best Distributors", company: "Best Distributors", phone: "+92 333 9876543", invoices: 0, pending: 0, lastContact: "18/10/2025" },
  { name: "ABC Traders", company: "ABC Traders", phone: "+92 300 1234567", invoices: 0, pending: 0, lastContact: "18/10/2025" },
];

export default function CRMPage() {
  const [search, setSearch] = useState("");

  const filtered = dummyClients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
          <input
            type="text"
            placeholder="Search clients, invoices, products..."
            className="border rounded-lg px-4 py-2 w-1/2"
          />

          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5" />
            <Sun className="w-5 h-5" />
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
              M
            </div>
          </div>
        </header>

        {/* CRM Title */}
        <div className="p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">CRM</h1>
            <p className="text-gray-600">Manage your clients and relationships</p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg flex items-center gap-2">
            + Add Client
          </button>
        </div>

        {/* Search bar */}
        <div className="px-6 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search clients by name, company, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-10 py-2 rounded-lg w-full bg-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="px-6 overflow-y-auto">
          <table className="w-full bg-white rounded-lg border">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Company</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Total Invoices</th>
                <th className="p-3 text-left">Pending Amount</th>
                <th className="p-3 text-left">Last Contact</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {filtered.map((c, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.company}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{c.invoices}</td>
                  <td className="p-3 text-green-600">Rs {c.pending}</td>
                  <td className="p-3">{c.lastContact}</td>
                  <td className="p-3 flex justify-end gap-3">
                    <Eye className="w-4 h-4 cursor-pointer hover:text-blue-600" />
                    <Pencil className="w-4 h-4 cursor-pointer hover:text-yellow-600" />
                    <Trash2 className="w-4 h-4 cursor-pointer hover:text-red-600" />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
