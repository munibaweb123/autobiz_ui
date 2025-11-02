"use client";

import { useState } from "react";
import { Search, Bell, Sun, Upload, Plus } from "lucide-react";
import Sidebar from "@/components/Sidebar";

type Invoice = {
  id: string;
  client: string;
  date: string;
  dueDate: string;
  amount: number;
  status: string;
};

const dummyInvoices: Invoice[] = [
  { id: "INV-001", client: "ABC Traders", date: "20/10/2025", dueDate: "27/10/2025", amount: 25000, status: "Paid" },
  { id: "INV-002", client: "Best Distributors", date: "21/10/2025", dueDate: "28/10/2025", amount: 48000, status: "Pending" },
];

export default function InvoicesPage() {
  const [search, setSearch] = useState("");

  const filtered = dummyInvoices.filter(
    (i) =>
      i.id.toLowerCase().includes(search.toLowerCase()) ||
      i.client.toLowerCase().includes(search.toLowerCase())
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
              A
            </div>
          </div>
        </header>

        {/* Invoices Header */}
        <div className="p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Invoices</h1>
            <p className="text-gray-600">Manage and track all your invoices</p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Upload className="w-4 h-4" />
              Upload PDF
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Invoice
            </button>
          </div>
        </div>

        {/* Search + AI Parser Section */}
        <div className="px-6 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search invoices..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-10 py-2 rounded-lg w-full bg-white"
            />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-3 flex justify-between items-center">
            <div>
              <h2 className="font-medium text-blue-700">AI Invoice Parser</h2>
              <p className="text-sm text-gray-600">
                Upload PDF invoices to automatically extract data using AI
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm">
              Try Now
            </button>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="px-6 overflow-y-auto">
          <table className="w-full bg-white rounded-lg border">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-3 text-left">Invoice #</th>
                <th className="p-3 text-left">Client</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Due Date</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {filtered.length > 0 ? (
                filtered.map((i, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-3">{i.id}</td>
                    <td className="p-3">{i.client}</td>
                    <td className="p-3">{i.date}</td>
                    <td className="p-3">{i.dueDate}</td>
                    <td className="p-3 text-green-600">Rs {i.amount.toLocaleString()}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          i.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {i.status}
                      </span>
                    </td>
                    <td className="p-3 text-right text-blue-600 cursor-pointer">
                      View
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-gray-500">
                    No invoices found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
