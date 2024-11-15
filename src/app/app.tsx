'use client';

import { useState } from 'react';
import {
  Home,
  TrendingUp,
  Activity,
  PieChart,
  MessageSquare,
  Bell,
  X,
} from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Diabetus</h1>
          <div className="relative">
            <button
              className="text-gray-500 hover:text-blue-600"
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
            </button>
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </div>
        </div>

        {/* Notification/Alarm Component */}
        {showNotifications && (
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <p className="font-medium">Glucose Level Alert</p>
                <p className="text-sm text-gray-600">
                  Your glucose level is above target range.
                </p>
                <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
              </div>
              <div className="p-4 border-b border-gray-200">
                <p className="font-medium">Medication Reminder</p>
                <p className="text-sm text-gray-600">
                  It's time to take your evening medication.
                </p>
                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
              </div>
              <div className="p-4">
                <p className="font-medium">Weekly Report</p>
                <p className="text-sm text-gray-600">
                  Your weekly health report is ready to view.
                </p>
                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {/* Glucose Level Tracker and Current Trend Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Glucose Level Tracker */}
              <div className="md:col-span-3 bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Glucose Level Tracker
                </h3>
                <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
                  <p className="text-gray-600">
                    Glucose level chart will be added here
                  </p>
                </div>
                <div className="mt-4 flex justify-between">
                  <button className="text-blue-500 hover:text-blue-600">
                    Previous Day
                  </button>
                  <button className="text-blue-500 hover:text-blue-600">
                    Next Day
                  </button>
                </div>
              </div>

              {/* Current Trend Section */}
              <div className="md:col-span-1 bg-white shadow rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Current Trend</h3>
                <div className="h-64 bg-gray-200 rounded flex items-center justify-center">
                  <p className="text-gray-600">
                    Trend information will be displayed here
                  </p>
                </div>
              </div>
            </div>

            {/* Carbs & Exercise Overview */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">
                Carbs & Exercise Overview
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-200 p-4 rounded">
                  <h4 className="font-semibold mb-2">Carbs Intake</h4>
                  <p className="text-2xl font-bold">150g</p>
                </div>
                <div className="bg-gray-200 p-4 rounded">
                  <h4 className="font-semibold mb-2">Exercise</h4>
                  <p className="text-2xl font-bold">30 min</p>
                </div>
              </div>
            </div>

            {/* Chatbot Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Chatbot</h3>
              <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
                <p className="text-gray-600">
                  Chatbot interface will be implemented here
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white shadow-lg fixed bottom-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around">
            <button
              onClick={() => setActiveTab('home')}
              className={`py-4 px-2 text-center ${
                activeTab === 'home' ? 'text-blue-500' : 'text-gray-500'
              }`}
              aria-label="Home"
            >
              <Home className="h-6 w-6 mx-auto" />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => setActiveTab('trends')}
              className={`py-4 px-2 text-center ${
                activeTab === 'trends' ? 'text-blue-500' : 'text-gray-500'
              }`}
              aria-label="Trends"
            >
              <TrendingUp className="h-6 w-6 mx-auto" />
              <span className="text-xs">Trends</span>
            </button>
            <button
              onClick={() => setActiveTab('glucose')}
              className={`py-4 px-2 text-center ${
                activeTab === 'glucose' ? 'text-blue-500' : 'text-gray-500'
              }`}
              aria-label="Glucose"
            >
              <Activity className="h-6 w-6 mx-auto" />
              <span className="text-xs">Glucose</span>
            </button>
            <button
              onClick={() => setActiveTab('carbs')}
              className={`py-4 px-2 text-center ${
                activeTab === 'carbs' ? 'text-blue-500' : 'text-gray-500'
              }`}
              aria-label="Carbs"
            >
              <PieChart className="h-6 w-6 mx-auto" />
              <span className="text-xs">Carbs</span>
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-4 px-2 text-center ${
                activeTab === 'chat' ? 'text-blue-500' : 'text-gray-500'
              }`}
              aria-label="Chat"
            >
              <MessageSquare className="h-6 w-6 mx-auto" />
              <span className="text-xs">Chat</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
