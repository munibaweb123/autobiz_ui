"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell, Menu, Search, Plus, Edit3, Trash2, AlertTriangle } from "lucide-react";
import Sidebar, { NavigationContent } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

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
  const [open, setOpen] = useState(false);

  const filtered = dummyProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-y-auto transition-all duration-300 lg:ml-64">
        <header className="border-b bg-card px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SheetHeader className="px-4 py-2 border-b dark:border-gray-800">
                  <SheetTitle>Inventory Navigation</SheetTitle>
                </SheetHeader>
                <NavigationContent setOpen={setOpen} />
              </SheetContent>
            </Sheet>

            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-10 bg-background"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">M</AvatarFallback>
            </Avatar>
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