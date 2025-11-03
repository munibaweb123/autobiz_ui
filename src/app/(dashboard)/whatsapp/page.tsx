"use client";

import { useState } from "react";
import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { Moon } from "lucide-react";
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
  const { theme, toggleTheme } = useTheme();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);


  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />



      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-4 md:px-6 py-3 flex flex-col md:flex-row gap-3 md:gap-0 md:items-center md:justify-between">


          <input
            type="text"
            placeholder="Search clients, invoices, products..."
            className="border rounded-lg px-4 py-2 w-full md:w-1/2 text-sm"
          />

          <div className="flex items-center gap-4 self-end md:self-auto">
            <Bell className="w-5 h-5 text-gray-600" />
                        <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
              A
            </div>
          </div>
        </header>

        {/* WhatsApp Header */}
        <div className="p-4 md:p-6 overflow-y-auto flex-1">
          <h1 className="text-xl md:text-2xl font-bold">WhatsApp Automation</h1>
          <p className="text-muted-foreground mb-6 text-sm md:text-base">
            Manage client communications and automate messages
          </p>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border-border border rounded-lg p-4 flex items-center gap-3">
              <MessageCircle className="w-6 h-6 text-primary" />
              <div>
                <p className="text-muted-foreground text-sm">Messages Sent</p>
                <h2 className="text-lg md:text-xl font-semibold">0</h2>
              </div>
            </div>

            <div className="bg-card border-border border rounded-lg p-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-muted-foreground text-sm">Active Contacts</p>
                <h2 className="text-lg md:text-xl font-semibold">231</h2>
              </div>
            </div>

            <div className="bg-card border-border border rounded-lg p-4 flex items-center gap-3">
              <Clock className="w-6 h-6 text-purple-600" />
              <div>
                <p className="text-muted-foreground text-sm">Scheduled</p>
                <h2 className="text-lg md:text-xl font-semibold">0</h2>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
              Bulk Message
            </button>
            <button className="border-border border px-4 py-2 rounded-lg text-foreground hover:bg-muted text-sm font-medium">
              Schedule Message
            </button>
          </div>

          {/* Messaging Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[65vh]">
            {/* Contacts List */}
            <div className="bg-card border-border border rounded-lg p-4 overflow-y-auto">
              <h2 className="text-foreground font-semibold mb-3">Contacts</h2>
              <ul>
                {dummyContacts.map((c, i) => (
                  <li
                    key={i}
                    onClick={() => setSelectedContact(c)}
                    className={`p-3 rounded-lg cursor-pointer mb-2 transition-colors ${
                      selectedContact?.name === c.name
                        ? "bg-primary/10 border-primary/20 border"
                        : "hover:bg-muted"
                    }`}
                  >
                    <p className="font-medium text-foreground text-sm md:text-base">
                      {c.name}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground">{c.phone}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chat Window */}
            <div className="lg:col-span-2 bg-card border-border border rounded-lg flex flex-col justify-center items-center text-muted-foreground text-sm">
              {selectedContact ? (
                <div className="flex flex-col w-full h-full justify-between">
                  {/* Chat Header */}
                  <div className="border-b border-border p-3 md:p-4 bg-muted flex justify-between items-center">
                    <div>
                      <h2 className="font-medium text-foreground text-sm md:text-base">
                        {selectedContact.name}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {selectedContact.phone}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground hidden sm:block">
                      Chat Window
                    </span>
                  </div>

                  {/* Chat Body */}
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-xs md:text-sm px-2 text-center">
                    Message history will appear here
                  </div>

                  {/* Chat Input */}
                  <div className="border-t border-border p-2 md:p-3 flex gap-2 md:gap-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 border-border border rounded-lg px-3 py-2 text-sm bg-card"
                    />
                    <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm">
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
