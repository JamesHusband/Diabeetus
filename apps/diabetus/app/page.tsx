'use client';

import { useState, useEffect } from 'react';
import {
  Home,
  TrendingUp,
  Activity,
  PieChart,
  MessageSquare,
} from 'lucide-react';
import { GlucoseTracker, Header } from '@diabetus/ui';
import {
  PatientInfo,
  LogbookEntry,
  GlucoseReading,
} from '@diabetus/shared/types';
import { fetchPatientInfo, fetchLogbook } from './api/api';
import { Button } from '@diabetus/ui/elements';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [latestReading, setLatestReading] = useState<LogbookEntry | null>(null);
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch patient info first (this will ensure we're initialized)
        const info = await fetchPatientInfo();
        if (!info) {
          throw new Error('Failed to load patient information');
        }
        setPatientInfo(info);

        // Then fetch logbook
        const logbook = await fetchLogbook();
        if (logbook.length > 0) {
          setLatestReading(logbook[0]); // Assuming the first entry is the latest
          setReadings(logbook); // Store all readings for the chart
        }
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header loading={loading} error={error} patientInfo={patientInfo} />

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <GlucoseTracker
              loading={loading}
              error={error}
              readings={readings}
              latestReading={latestReading}
              patientInfo={patientInfo}
            />

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
            <Button
              onClick={() => setActiveTab('home')}
              variant="ghost"
              className={
                activeTab === 'home' ? 'text-blue-500' : 'text-gray-500'
              }
              aria-label="Home"
            >
              <Home className="h-6 w-6 mx-auto" />
              <span className="text-xs">Home</span>
            </Button>
            <Button
              onClick={() => setActiveTab('trends')}
              variant="ghost"
              className={
                activeTab === 'trends' ? 'text-blue-500' : 'text-gray-500'
              }
              aria-label="Trends"
            >
              <TrendingUp className="h-6 w-6 mx-auto" />
              <span className="text-xs">Trends</span>
            </Button>
            <Button
              onClick={() => setActiveTab('glucose')}
              variant="ghost"
              className={
                activeTab === 'glucose' ? 'text-blue-500' : 'text-gray-500'
              }
              aria-label="Glucose"
            >
              <Activity className="h-6 w-6 mx-auto" />
              <span className="text-xs">Glucose</span>
            </Button>
            <Button
              onClick={() => setActiveTab('carbs')}
              variant="ghost"
              className={
                activeTab === 'carbs' ? 'text-blue-500' : 'text-gray-500'
              }
              aria-label="Carbs"
            >
              <PieChart className="h-6 w-6 mx-auto" />
              <span className="text-xs">Carbs</span>
            </Button>
            <Button
              onClick={() => setActiveTab('chat')}
              variant="ghost"
              className={
                activeTab === 'chat' ? 'text-blue-500' : 'text-gray-500'
              }
              aria-label="Chat"
            >
              <MessageSquare className="h-6 w-6 mx-auto" />
              <span className="text-xs">Chat</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
