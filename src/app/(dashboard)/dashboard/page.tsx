"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Users, DollarSign, Clock, Box, MessageSquare, FileText,
  UserPlus, Send, FileBarChart, Bell, Search, Sun, Moon, Menu
} from "lucide-react";
import {
  LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip
} from "recharts";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => router.push("/signin");

  const revenueData = [
    { month: "Jan", value: 30000 },
    { month: "Feb", value: 45000 },
    { month: "Mar", value: 38000 },
    { month: "Apr", value: 52000 },
    { month: "May", value: 48000 },
    { month: "Jun", value: 65000 },
  ];

  const paymentData = [
    { name: "Paid", value: 65, color: "#000000" },
    { name: "Pending", value: 25, color: "#6B7280" },
    { name: "Overdue", value: 10, color: "#D1D5DB" },
  ];

  const activities = [
    { text: "New invoice created for ABC Traders", time: "5 minutes ago" },
    { text: "Payment received from XYZ Company", time: "1 hour ago" },
    { text: "Low stock alert: Rice Bags", time: "2 hours ago" },
    { text: "WhatsApp message sent to 5 clients", time: "3 hours ago" },
  ];

  return (
    <div className="flex min-h-screen bg-background overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar drawer for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 bg-white shadow-lg h-full">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300 lg:ml-64">
        {/* Header */}
        <header className="border-b bg-card px-4 py-3 flex flex-col sm:flex-row gap-3 sm:gap-0 items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3 w-full sm:w-1/2">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients, invoices, products..."
                className="pl-10 bg-background w-full"
              />
            </div>
          </div>

          {/* Header Icons */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Avatar>
              <AvatarFallback className="bg-primary text-primary-foreground">M</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Welcome Banner */}
          <div className="mb-6 p-6 md:p-8 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-white text-center md:text-left">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Good Morning! 👋</h1>
            <p className="text-sm md:text-lg opacity-90">
              Welcome back! Here's your business overview for today.
            </p>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { title: "Create Invoice", color: "bg-blue-500 hover:bg-blue-600", icon: <FileText className="h-6 w-6" />, desc: "Generate new invoice" },
              { title: "Add Client", color: "bg-purple-500 hover:bg-purple-600", icon: <UserPlus className="h-6 w-6" />, desc: "Register new client" },
              { title: "Send WhatsApp", color: "bg-green-500 hover:bg-green-600", icon: <Send className="h-6 w-6" />, desc: "Message customers" },
              { title: "View Reports", color: "bg-orange-500 hover:bg-orange-600", icon: <FileBarChart className="h-6 w-6" />, desc: "Business analytics" },
            ].map((item, i) => (
              <Card key={i} className={`${item.color} text-white border-0 cursor-pointer transition-colors`}>
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-1">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            {[
              { title: "Total Revenue", value: "Rs 0", change: "↑ +12.5%", color: "text-green-600", icon: <DollarSign className="h-5 w-5 text-blue-500" /> },
              { title: "Pending Payments", value: "Rs 0", change: "↓ -3.2%", color: "text-red-600", icon: <Clock className="h-5 w-5 text-blue-500" /> },
              { title: "Active Clients", value: "237", change: "↑ +5", color: "text-green-600", icon: <Users className="h-5 w-5 text-blue-500" /> },
              { title: "Low Stock Items", value: "78", change: "Items", color: "text-muted-foreground", icon: <Box className="h-5 w-5 text-blue-500" /> },
              { title: "Messages Sent", value: "1000", change: "↑ +28", color: "text-green-600", icon: <MessageSquare className="h-5 w-5 text-blue-500" /> },
            ].map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.title}</p>
                    {stat.icon}
                  </div>
                  <p className="text-lg md:text-2xl font-bold mb-1">{stat.value}</p>
                  <p className={`text-xs ${stat.color}`}>{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Line Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={revenueData}>
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#000"
                      strokeWidth={2}
                      dot={{ fill: "#000", r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <div className="relative">
                  <ResponsiveContainer width={220} height={220}>
                    <PieChart>
                      <Pie
                        data={paymentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {paymentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                    65% Paid
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {paymentData.map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: p.color }} />
                      <span>{p.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((a, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border-b last:border-0 py-3"
                  >
                    <p className="text-sm">{a.text}</p>
                    <span className="text-xs text-muted-foreground">{a.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
