'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  LogOut,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
  Search,
  Bell,
  Sun,
  Moon,
  LayoutDashboard,
  FileText,
  Package,
  MessageSquare,
  Settings,
  Clock,
  UserPlus,
  Send,
  FileBarChart,
  Box,
} from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  const handleLogout = () => {
    router.push("/signin");
  };

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
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar/>
     

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="border-b bg-card">
          <div className="flex items-center justify-between p-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search clients, invoices, products..."
                className="pl-10 bg-background"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">M</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Welcome Banner */}
          <div className="mb-6 p-8 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 text-white">
            <h1 className="text-4xl font-bold mb-2">Good Morning! 👋</h1>
            <p className="text-lg opacity-90">Welcome back! Here's your business overview for today</p>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-500 text-white border-0 cursor-pointer hover:bg-blue-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">Create Invoice</h3>
                <p className="text-sm opacity-90">Generate new invoice</p>
              </CardContent>
            </Card>

            <Card className="bg-purple-500 text-white border-0 cursor-pointer hover:bg-purple-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <UserPlus className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">Add Client</h3>
                <p className="text-sm opacity-90">Register new client</p>
              </CardContent>
            </Card>

            <Card className="bg-green-500 text-white border-0 cursor-pointer hover:bg-green-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Send className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">Send WhatsApp</h3>
                <p className="text-sm opacity-90">Message customers</p>
              </CardContent>
            </Card>

            <Card className="bg-orange-500 text-white border-0 cursor-pointer hover:bg-orange-600 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <FileBarChart className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">View Reports</h3>
                <p className="text-sm opacity-90">Business analytics</p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <DollarSign className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold mb-1">Rs 0</p>
                <p className="text-xs text-green-600">↑ +12.5%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Pending Payments</p>
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold mb-1">Rs 0</p>
                <p className="text-xs text-red-600">↓ -3.2%</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Active Clients</p>
                  <Users className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold mb-1">237</p>
                <p className="text-xs text-green-600">↑ +5</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Low Stock Items</p>
                  <Box className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold mb-1">78</p>
                <p className="text-xs text-muted-foreground">Items</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Messages Sent</p>
                  <MessageSquare className="h-5 w-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold mb-1">1000</p>
                <p className="text-xs text-green-600">↑ +28</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#000000" strokeWidth={2} dot={{ fill: '#000000', r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="relative">
                  <ResponsiveContainer width={300} height={300}>
                    <PieChart>
                      <Pie
                        data={paymentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {paymentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-4">Paid 65%</p>
                      <p className="text-sm text-muted-foreground mb-4">Overdue 10%</p>
                      <p className="text-sm text-muted-foreground">Pending 25%</p>
                    </div>
                  </div>
                </div>
                <div className="ml-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-black" />
                    <span className="text-sm">Paid</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-500" />
                    <span className="text-sm">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-gray-300" />
                    <span className="text-sm">Overdue</span>
                  </div>
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
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                    <p className="text-sm">{activity.text}</p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
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
