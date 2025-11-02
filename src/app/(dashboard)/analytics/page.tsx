"use client";

import { Bell, Sun, DollarSign, Users, Package, MessageSquare } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", clients: 45 },
  { month: "Feb", clients: 52 },
  { month: "Mar", clients: 58 },
  { month: "Apr", clients: 65 },
  { month: "May", clients: 72 },
  { month: "Jun", clients: 80 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="bg-white border-b px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-40 shadow-sm">
          <input
            type="text"
            placeholder="Search clients, invoices, products..."
            className="border rounded-lg px-4 py-2 w-full sm:w-1/2"
          />
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5" />
            <Sun className="w-5 h-5" />
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Analytics Content */}
        <div className="p-4 sm:p-6 overflow-x-hidden">
          <h1 className="text-xl sm:text-2xl font-bold">Analytics & Reports</h1>
          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Comprehensive business insights and performance metrics
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold">Rs 328K</h2>
              <p className="text-green-600 text-sm mt-1">+12.5%</p>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 text-sm">Client Growth</p>
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold">+78</h2>
              <p className="text-green-600 text-sm mt-1">+18.2%</p>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 text-sm">Products Sold</p>
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-semibold">16,500</h2>
              <p className="text-green-600 text-sm mt-1">+8.3%</p>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-500 text-sm">Messages Sent</p>
                <MessageSquare className="w-5 h-5 text-orange-500" />
              </div>
              <h2 className="text-2xl font-semibold">324</h2>
              <p className="text-red-500 text-sm mt-1">-5.4%</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 overflow-x-auto">
            {["Revenue", "Clients", "Products", "Messages"].map((tab, i) => (
              <button
                key={i}
                className={`px-3 sm:px-4 py-2 rounded-full border text-xs sm:text-sm font-medium whitespace-nowrap ${
                  tab === "Clients"
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white border rounded-lg p-4 sm:p-6">
            <h2 className="text-gray-700 font-semibold mb-4 text-sm sm:text-base">
              Client Growth Over Time
            </h2>
            <div className="h-[300px] w-full max-w-full overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis
                    dataKey="month"
                    stroke="#999"
                    fontSize={12}
                    tickMargin={10}
                  />
                  <YAxis stroke="#999" fontSize={12} tickMargin={10} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="clients"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
