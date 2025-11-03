"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
import {
  Bell,
  Sun,
  User,
  Mail,
  Phone,
  Building,
  Menu,
  Lock,
  Monitor,
  Key,
  MessageSquare,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: "Ahmed",
    phone: "+92 300 1234567",
    email: "ahmed123@company.com",
    company: "",
  });

  const [activeTab, setActiveTab] = useState("Profile");


  // Security
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    clientRegistration: true,
    paymentReceived: true,
    lowStock: true,
    overdueInvoices: true,
    whatsappMessage: false,
  });

  // Integrations
  const [integrations, setIntegrations] = useState({
    whatsappApi: "",
    gmailApi: "",
    whatsappConnected: true,
    gmailConnected: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => alert("Profile saved successfully!");

  const handlePasswordChange = () => {
    if (passwords.new !== passwords.confirm) return alert("Passwords do not match!");
    alert("Password changed successfully!");
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = () => alert("Notification preferences saved!");

  const handleIntegrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIntegrations((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveApiKeys = () => alert("API Keys saved successfully!");

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />



      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between">


          <input
            type="text"
            placeholder="Search clients, invoices, products..."
            className="hidden sm:block border rounded-lg px-4 py-2 w-1/2 text-sm"
          />

          <div className="flex items-center gap-3 sm:gap-4">
            <Bell className="w-5 h-5 text-gray-600" />
                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground mb-6 text-sm sm:text-base">
            Manage your account settings and preferences
          </p>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
            {["Profile", "Security", "Notifications", "Integrations"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium border-border border transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

         {/* ==================== PROFILE TAB ==================== */}
{activeTab === "Profile" && (
  <div className="bg-card border-border border rounded-lg p-6 shadow-sm">
    <h2 className="text-lg font-semibold mb-4 text-foreground">Profile</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {([
        ["fullName", "Full Name", User],
        ["phone", "Phone Number", Phone],
        ["email", "Email Address", Mail],
        ["company", "Company Name", Building],
      ] as const).map(([key, label, Icon]) => (
        <div key={key}>
          <label className="text-sm text-foreground mb-1 block">{label}</label>
          <div className="relative">
            <Icon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              name={key}
              value={formData[key]}
              onChange={handleChange}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="w-full border-border border rounded-lg pl-9 pr-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none bg-card"
            />
          </div>
        </div>
      ))}
    </div>

    <div className="mt-8 flex justify-end">
      <button
        onClick={handleSaveProfile}
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
      >
        Save Changes
      </button>
    </div>
  </div>
)}


          {/* ==================== SECURITY TAB ==================== */}
          {activeTab === "Security" && (
            <div className="bg-card border-border border rounded-lg p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-semibold text-foreground mb-2">
                Security Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["current", "new", "confirm"].map((field) => (
                  <div key={field}>
                    <label className="text-sm text-foreground capitalize">
                      {field} Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="password"
                        name={field}
                        value={(passwords as any)[field]}
                        onChange={(e) =>
                          setPasswords({ ...passwords, [field]: e.target.value })
                        }
                        className="w-full border-border border rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-primary outline-none bg-card"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handlePasswordChange}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
              >
                Change Password
              </button>
              <div className="flex items-center justify-between border-border border rounded-lg p-4 mt-4">
                <div>
                  <p className="text-sm font-medium text-foreground">Enable Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">
                    Adds an extra layer of security to your account
                  </p>
                </div>
                <button
                  onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    twoFactorEnabled ? "bg-green-500" : "bg-muted"
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      twoFactorEnabled ? "translate-x-6" : ""
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          )}

          {/* ==================== NOTIFICATIONS TAB ==================== */}
          {activeTab === "Notifications" && (
            <div className="bg-card border-border border rounded-lg p-6 shadow-sm space-y-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Notification Preferences
              </h2>

              {[
                {
                  key: "push",
                  title: "Push Notifications",
                  desc: "Receive push notifications for important updates",
                },
                {
                  key: "email",
                  title: "Email Notifications",
                  desc: "Get email updates about your account activity",
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className="flex items-center justify-between border-border border rounded-lg p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      handleNotificationChange(item.key as keyof typeof notifications)
                    }
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      notifications[item.key as keyof typeof notifications]
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  >
                    <span
                      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        notifications[item.key as keyof typeof notifications]
                          ? "translate-x-6"
                          : ""
                      }`}
                    ></span>
                  </button>
                </div>
              ))}

              <div>
                <h3 className="text-sm font-semibold mb-3 text-foreground">
                  Email me about…
                </h3>
                {[
                  ["clientRegistration", "New client registrations"],
                  ["paymentReceived", "Payment received"],
                  ["lowStock", "Low stock alerts"],
                  ["overdueInvoices", "Overdue invoices"],
                  ["whatsappMessage", "WhatsApp message received"],
                ].map(([key, label]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between border-b border-border py-2 text-sm"
                  >
                    <span className="text-foreground">{label}</span>
                    <button
                      onClick={() =>
                        handleNotificationChange(key as keyof typeof notifications)
                      }
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[key as keyof typeof notifications]
                          ? "bg-primary"
                          : "bg-muted"
                      }`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          notifications[key as keyof typeof notifications]
                            ? "translate-x-6"
                            : ""
                        }`}
                      ></span>
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSavePreferences}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* ==================== INTEGRATIONS TAB ==================== */}
          {activeTab === "Integrations" && (
            <div className="bg-card border-border border rounded-lg p-6 shadow-sm space-y-8">
              <h2 className="text-lg font-semibold text-foreground">
                API Integrations
              </h2>

              <div className="space-y-4">
                {/* WhatsApp Business API */}
                <div>
                  <label className="text-sm font-medium text-foreground">
                    WhatsApp Business API Key
                  </label>
                  <div className="relative mt-1">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <input
                      name="whatsappApi"
                      type="text"
                      placeholder="Enter your WhatsApp API key"
                      value={integrations.whatsappApi}
                      onChange={handleIntegrationChange}
                      className="w-full border-border border rounded-lg pl-9 pr-3 py-2 bg-card focus:bg-card focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Get your API key from WhatsApp Business Platform
                  </p>
                </div>

                {/* Gmail API */}
                <div>
                  <label className="text-sm font-medium text-foreground">
                    Gmail API Key
                  </label>
                  <div className="relative mt-1">
                    <Key className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                    <input
                      name="gmailApi"
                      type="text"
                      placeholder="Enter your Gmail API key"
                      value={integrations.gmailApi}
                      onChange={handleIntegrationChange}
                      className="w-full border-border border rounded-lg pl-9 pr-3 py-2 bg-card focus:bg-card focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Configure Gmail API from Google Cloud Console
                  </p>
                </div>
              </div>

              {/* Connected Services */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Connected Services
                </h3>
                <div className="space-y-3">
                  {/* WhatsApp */}
                  <div className="flex items-center justify-between border-border border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 text-green-600 rounded-full p-2">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">WhatsApp Business</p>
                        <p className="text-xs text-muted-foreground">
                          Connected 2 days ago
                        </p>
                      </div>
                    </div>
                    <button className="text-sm border-border border rounded-md px-3 py-1 hover:bg-muted">
                      Disconnect
                    </button>
                  </div>

                  {/* Gmail */}
                  <div className="flex items-center justify-between border-border border rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted text-muted-foreground rounded-full p-2">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Gmail</p>
                        <p className="text-xs text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <button className="text-sm bg-primary/10 text-primary rounded-md px-3 py-1 hover:bg-primary/20">
                      Connect
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveApiKeys}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium"
                >
                  Save API Keys
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
