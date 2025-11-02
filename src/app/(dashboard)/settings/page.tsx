"use client";

import { useState } from "react";
import { Bell, Sun, User, Mail, Phone, Building } from "lucide-react";
import Sidebar from "@/components/Sidebar";

export default function SettingsPage() {
  // Form state
  const [formData, setFormData] = useState({
    fullName: "Ahmed",
    phone: "+92 300 1234567",
    email: "ahmed123@company.com",
    company: "",
  });

  const [activeTab, setActiveTab] = useState("Profile");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("✅ Saved Data:", formData);
    alert("Profile information saved successfully!");
  };

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

        {/* Settings Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-600 mb-6">
            Manage your account settings and preferences
          </p>

          {/* Tabs */}
          <div className="flex gap-3 mb-6">
            {["Profile", "Security", "Notifications", "Integrations"].map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${
                    activeTab === tab
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          {/* Profile Tab */}
          {activeTab === "Profile" && (
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Profile Information
              </h2>

              {/* Profile Photo */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center text-white text-xl font-bold">
                  {formData.fullName.charAt(0)}
                </div>
                <div>
                  <button className="border rounded-md px-3 py-1 text-sm hover:bg-gray-100">
                    Change Photo
                  </button>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or GIF. Max size 2MB
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        name="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full border rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        name="phone"
                        type="text"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                      Role
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full border border-blue-200">
                        trader
                      </span>
                      <p className="text-xs text-gray-500">
                        Contact admin to change your role
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        name="company"
                        type="text"
                        placeholder="Enter company name"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border rounded-lg pl-9 pr-3 py-2 focus:ring-2 focus:ring-blue-100 outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-8">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Placeholder for Other Tabs */}
          {activeTab !== "Profile" && (
            <div className="bg-white border rounded-lg p-6 text-gray-500 text-sm text-center py-20">
              Settings for{" "}
              <span className="font-semibold">{activeTab}</span> will appear
              here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
