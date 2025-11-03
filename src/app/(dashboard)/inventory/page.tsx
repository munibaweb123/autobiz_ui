"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import {
  Search,
  Bell,
  Sun,
  Plus,
  Edit3,
  Trash2,
  AlertTriangle,
  Menu,
} from "lucide-react";
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
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");


  const filtered = dummyProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-background">
      <Sidebar />



      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">


            <input
              type="text"
              placeholder="Search clients, invoices, products..."
              className="border rounded-lg px-4 py-2 w-full sm:w-80"
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5" />
                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Page Header */}
        <div className="p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">Inventory</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Track and manage your product inventory
            </p>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Product
          </button>
        </div>

        {/* Low Stock Alert */}
        <div className="mx-4 md:mx-6 mb-4 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-medium">Low Stock Alert</span>
          </div>
          <p className="text-sm">— 76 items are running low on stock</p>
        </div>

        {/* Search + Export */}
        <div className="px-4 md:px-6 pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name, SKU, or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-border border px-10 py-2 rounded-lg w-full bg-card"
            />
          </div>

          <button className="border-border border px-4 py-2 rounded-lg bg-card hover:bg-muted text-sm w-full sm:w-auto">
            Export
          </button>
        </div>

        {/* Table */}
        <div className="px-4 md:px-6 overflow-auto">
          <div className="w-full bg-card rounded-lg border-border border text-sm overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead className="bg-muted text-muted-foreground">
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
                      className={`border-b border-border ${
                        isLowStock ? "bg-destructive/10" : "hover:bg-muted"
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
                        <Edit3 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-primary" />
                        <Trash2 className="w-4 h-4 cursor-pointer text-muted-foreground hover:text-destructive" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
