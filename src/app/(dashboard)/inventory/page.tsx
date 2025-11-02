"use client";

import { useState } from "react";
import { Search, Bell, Sun, Plus, Edit3, Trash2, AlertTriangle } from "lucide-react";
import Sidebar from "@/components/Sidebar";

type Product = {
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unitPrice: number;
};

const dummyProducts: Product[] = [
  { name: "N/A", sku: "FLOUR-20", category: "N/A", quantity: 200, unitPrice: 0 },
  { name: "N/A", sku: "OIL-5L", category: "N/A", quantity: 80, unitPrice: 0 },
  { name: "N/A", sku: "SUGAR-50", category: "N/A", quantity: 100, unitPrice: 0 },
  { name: "N/A", sku: "RICE-50", category: "N/A", quantity: 150, unitPrice: 0 },
  { name: "N/A", sku: "PULSE-10", category: "N/A", quantity: 15, unitPrice: 0 },
];

export default function InventoryPage() {
  const [search, setSearch] = useState("");

  const filtered = dummyProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
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

        {/* Page Header */}
        <div className="p-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Inventory</h1>
            <p className="text-gray-600">Track and manage your product inventory</p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Low Stock Alert */}
        <div className="mx-6 mb-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          <span className="font-medium">Low Stock Alert</span> — 76 items are running low on stock
        </div>

        {/* Search + Export */}
        <div className="px-6 pb-2 flex justify-between items-center">
          <div className="relative w-1/2">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, SKU, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-10 py-2 rounded-lg w-full bg-white"
            />
          </div>

          <button className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-sm">
            Export
          </button>
        </div>

        {/* Table */}
        <div className="px-6 overflow-y-auto">
          <table className="w-full bg-white rounded-lg border text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-3 text-left">Product Name</th>
                <th className="p-3 text-left">SKU</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3 text-left">Unit Price</th>
                <th className="p-3 text-left">Total Value</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((p, i) => {
                const isLowStock = p.quantity < 20;
                return (
                  <tr
                    key={i}
                    className={`border-b ${
                      isLowStock ? "bg-red-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <td className="p-3">{p.name}</td>
                    <td className="p-3">{p.sku}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">{p.quantity}</td>
                    <td className="p-3">Rs {p.unitPrice}</td>
                    <td className="p-3">
                      Rs {(p.quantity * p.unitPrice).toLocaleString()}
                    </td>
                    <td className="p-3">
                      {isLowStock ? (
                        <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" /> Low Stock
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="p-3 flex justify-end gap-3">
                      <Edit3 className="w-4 h-4 cursor-pointer text-gray-600 hover:text-blue-600" />
                      <Trash2 className="w-4 h-4 cursor-pointer text-gray-600 hover:text-red-600" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
