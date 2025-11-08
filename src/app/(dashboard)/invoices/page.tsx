"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Bell, Menu, Search, Upload, Plus } from "lucide-react";
import Sidebar, { NavigationContent } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type Invoice = {
  id: string;
  client_id: string;
  invoice_date: string;
  total_amount: number;
  payment_status: string;
};

export default function InvoicesPage() {
  const { theme, toggleTheme } = useTheme();
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/tables/invoices");
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    fetchInvoices();
  }, []);

  const filtered = invoices.filter(
    (i) =>
      i.id.toLowerCase().includes(search.toLowerCase()) ||
      i.client_id.toLowerCase().includes(search.toLowerCase())
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
                  <SheetTitle>Invoices Navigation</SheetTitle>
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

        {/* Invoices Header */}
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Invoices</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Manage and track all your invoices
            </p>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="flex items-center gap-2 border-border border px-3 py-2 rounded-lg text-foreground hover:bg-muted text-sm">
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload PDF</span>
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Create Invoice</span>
            </button>
          </div>
        </div>

        {/* AI Parser Section */}
        <div className="px-4 sm:px-6 pb-3">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="font-medium text-primary">AI Invoice Parser</h2>
              <p className="text-sm text-muted-foreground">
                Upload PDF invoices to automatically extract data using AI
              </p>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-1.5 rounded-md text-sm w-full sm:w-auto">
              Try Now
            </button>
          </div>
        </div>

        {/* Invoice Table / Mobile Cards */}
        <div className="px-4 sm:px-6 overflow-y-auto pb-6 flex-1">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full bg-card rounded-lg border-border border text-sm">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="p-3 text-left">Invoice #</th>
                  <th className="p-3 text-left">Client ID</th>
                  <th className="p-3 text-left">Date</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((i, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted">
                      <td className="p-3">{i.id}</td>
                      <td className="p-3">{i.client_id}</td>
                      <td className="p-3">{new Date(i.invoice_date).toLocaleDateString()}</td>
                      <td className="p-3 text-green-600">
                        Rs {i.total_amount.toLocaleString()}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            i.payment_status === "paid"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {i.payment_status}
                        </span>
                      </td>
                      <td className="p-3 text-right text-blue-600 cursor-pointer">
                        View
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-6 text-center text-muted-foreground">
                      No invoices found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-3 md:hidden">
            {filtered.length > 0 ? (
              filtered.map((i, idx) => (
                <div
                  key={idx}
                  className="bg-card border-border border rounded-lg p-4 shadow-sm flex flex-col gap-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-foreground">{i.id}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        i.payment_status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {i.payment_status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{i.client_id}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Date: {new Date(i.invoice_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium text-green-600">
                      Rs {i.total_amount.toLocaleString()}
                    </span>
                    <button className="text-blue-600 text-sm font-medium">
                      View
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground text-sm">
                No invoices found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}