"use client";

import { useState } from "react";
import {
  Bell,
  Sun,
  MessageCircle,
  Users,
  Clock,
  Menu,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";

type Contact = {
  name: string;
  phone: string;
};

const dummyContacts: Contact[] = [
  { name: "XYZ Company", phone: "+92 321 7654321" },
  { name: "Best Distributors", phone: "+92 333 9876543" },
  { name: "ABC Traders", phone: "+92 300 1234567" },
  { name: "XYZ Company", phone: "+92 321 7654321" },
  { name: "Best Distributors", phone: "+92 333 9876543" },
];

export default function WhatsAppPage() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative z-50 w-64 bg-white shadow-lg">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b px-4 md:px-6 py-3 flex flex-col md:flex-row gap-3 md:gap-0 md:items-center md:justify-between">
          {/* Mobile Sidebar Button */}
          <div className="flex items-center justify-between md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <input
            type="text"
            placeholder="Search clients, invoices, products..."
            className="border rounded-lg px-4 py-2 w-full md:w-1/2 text-sm"
          />

          <div className="flex items-center gap-4 self-end md:self-auto">
            <Bell className="w-5 h-5 text-gray-600" />
            <Sun className="w-5 h-5 text-gray-600" />
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* WhatsApp Header */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          <h1 className="text-xl md:text-2xl font-bold">WhatsApp Automation</h1>
          <p className="text-gray-600 mb-6 text-sm md:text-base">
            Manage client communications and automate messages
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border rounded-lg p-4 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-gray-500 text-sm">Messages Sent</p>
                <h2 className="text-lg md:text-xl font-semibold">0</h2>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-gray-500 text-sm">Active Contacts</p>
                <h2 className="text-lg md:text-xl font-semibold">231</h2>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4 flex items-center gap-3">
              <Clock className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-gray-500 text-sm">Scheduled</p>
                <h2 className="text-lg md:text-xl font-semibold">0</h2>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
              Bulk Message
            </button>
            <button className="border px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium">
              Schedule Message
            </button>
          </div>

          {/* Messaging Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[65vh]">
            {/* Contacts List */}
            <div className="bg-white border rounded-lg p-4 overflow-y-auto">
              <h2 className="text-gray-700 font-semibold mb-3">Contacts</h2>
              <ul>
                {dummyContacts.map((c, i) => (
                  <li
                    key={i}
                    onClick={() => setSelectedContact(c)}
                    className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                      selectedContact?.name === c.name
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-medium text-gray-800 text-sm md:text-base">
                      {c.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-500">{c.phone}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2 bg-white border rounded-lg flex flex-col justify-center items-center text-gray-400 text-sm">
              {selectedContact ? (
                <div className="flex flex-col w-full h-full justify-between">
                  {/* Chat Header */}
                  <div className="border-b p-3 md:p-4 bg-gray-50 flex justify-between items-center">
                    <div>
                      <h2 className="font-medium text-gray-800 text-sm md:text-base">
                        {selectedContact.name}
                      </h2>
                      <p className="text-xs text-gray-500">
                        {selectedContact.phone}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 hidden sm:block">
                      Chat Window
                    </span>
                  </div>

                  {/* Chat Body */}
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-xs md:text-sm px-2 text-center">
                    Message history will appear here
                  </div>

                  {/* Chat Input */}
                  <div className="border-t p-2 md:p-3 flex gap-2 md:gap-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 border rounded-lg px-3 py-2 text-sm"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm">
                      Send
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs md:text-sm text-center p-4">
                  Select a contact to start messaging
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
