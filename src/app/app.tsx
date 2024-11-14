import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Activity,
  Pill,
  MessageCircle,
  User,
  ChevronLeft,
  ChevronRight,
  Camera,
  Mic,
  Send,
  PlusCircle,
  TrendingUp,
  TrendingDown,
  Bell,
  Utensils,
  Dumbbell,
  Github,
} from 'lucide-react';
import { format, subDays } from 'date-fns';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const glucoseData = [
  { time: '6:00', level: 5.8 },
  { time: '9:00', level: 7.2 },
  { time: '12:00', level: 6.5 },
  { time: '15:00', level: 5.9 },
  { time: '18:00', level: 6.7 },
  { time: '21:00', level: 6.1 },
];

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      content: 'Hello! How can I help you manage your diabetes today?',
    },
  ]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isRecording, setIsRecording] = useState(false);

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory([...chatHistory, { role: 'user', content: message }]);
      // Here you would typically send the message to your AI service and get a response
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: `I understand. Can you tell me more about your ${message}?`,
          },
        ]);
      }, 1000);
      setMessage('');
    }
  };

  const navigateDay = (direction) => {
    setCurrentDate((prevDate) =>
      direction === 'prev' ? subDays(prevDate, 1) : subDays(prevDate, -1)
    );
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Here you would typically upload the file and send it to your AI service
      setChatHistory([
        ...chatHistory,
        { role: 'user', content: 'I uploaded a photo.' },
      ]);
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "I've received your photo. What would you like me to check in it?",
          },
        ]);
      }, 1000);
    }
  };

  const handleVoiceInput = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // Here you would typically start recording
      setTimeout(() => {
        setIsRecording(false);
        setChatHistory([
          ...chatHistory,
          { role: 'user', content: 'I recorded a voice message.' },
        ]);
        setTimeout(() => {
          setChatHistory((prev) => [
            ...prev,
            {
              role: 'assistant',
              content:
                "I've received your voice message. How can I help you with that information?",
            },
          ]);
        }, 1000);
      }, 3000); // Simulating a 3-second recording
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-6 bg-sky-700 text-white">
        <h1 className="text-4xl font-bold">Diabetus</h1>
        {/* <Avatar className="w-16 h-16">
          <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
          <AvatarFallback className="text-2xl">JD</AvatarFallback>
        </Avatar> */}
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* <Card className="bg-white border-sky-200 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl font-bold text-sky-800">
              Current Pattern
            </CardTitle>
            <TrendingUp className="h-10 w-10 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold text-green-600 mr-4">
                Positive Trend
              </div>
              <TrendingUp className="h-12 w-12 text-green-600" />
            </div>
            <p className="text-2xl text-sky-600 mt-2">
              Your glucose levels are improving
            </p>
          </CardContent>
        </Card> */}

        {/* <Card className="bg-white border-sky-200 shadow-md">
          <CardHeader className="flex flex-col items-start pb-4">
            <CardTitle className="text-3xl font-bold text-sky-800 mb-4">
              Today's Glucose Levels
            </CardTitle>
            <p className="text-2xl font-medium text-sky-600">
              {format(currentDate, 'MMMM d, yyyy')}
            </p>
          </CardHeader>
          <CardContent className="flex items-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigateDay('prev')}
              className="text-3xl p-8 mr-4"
            >
              <ChevronLeft className="h-12 w-12" />
            </Button>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={glucoseData}>
                <XAxis
                  dataKey="time"
                  stroke="#94a3b8"
                  fontSize={16}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={16}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip contentStyle={{ fontSize: '16px' }} />
                <Line
                  type="monotone"
                  dataKey="level"
                  stroke="#0ea5e9"
                  strokeWidth={4}
                  dot={{ fill: '#0ea5e9', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigateDay('next')}
              className="text-3xl p-8 ml-4"
            >
              <ChevronRight className="h-12 w-12" />
            </Button>
          </CardContent>
        </Card> */}

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* <Card className="bg-white border-sky-200 shadow-md md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-bold text-sky-800">
                Latest Reading
              </CardTitle>
              <Activity className="h-10 w-10 text-sky-600" />
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-sky-700">6.1 mmol/L</div>
              <p className="text-2xl text-sky-600 mt-2">2 hours ago</p>
            </CardContent>
          </Card> */}
          {/* <Card className="bg-white border-sky-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-bold text-sky-800">
                Medication
              </CardTitle>
              <Pill className="h-10 w-10 text-sky-600" />
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-sky-700">Taken</div>
              <p className="text-2xl text-sky-600 mt-2">Next dose in 4 hours</p>
            </CardContent>
          </Card> */}
          {/* <Card className="bg-white border-sky-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-bold text-sky-800">
                Food
              </CardTitle>
              <Utensils className="h-10 w-10 text-sky-600" />
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-sky-700">450 cal</div>
              <p className="text-2xl text-sky-600 mt-2">
                Last meal 3 hours ago
              </p>
            </CardContent>
          </Card> */}
          {/* <Card className="bg-white border-sky-200 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-2xl font-bold text-sky-800">
                Exercise
              </CardTitle>
              <Dumbbell className="h-10 w-10 text-sky-600" />
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-sky-700">30 min</div>
              <p className="text-2xl text-sky-600 mt-2">
                Walking, moderate pace
              </p>
            </CardContent>
          </Card> */}
        </div>

        {/* <Card className="bg-white border-sky-200 shadow-md">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-sky-800">
              Diabot
            </CardTitle>
          </CardHeader>
          <CardContent> */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-4">
            <div className="flex-1 flex flex-col h-[400px]">
              <div className="flex-1 space-y-4 overflow-y-auto border-2 border-sky-200 rounded-lg p-4 mb-4">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`rounded-lg p-4 max-w-[80%] ${
                        msg.role === 'user'
                          ? 'bg-sky-600 text-white'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      <p className="text-xl">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {/* <Input
                      placeholder="Type your question here..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 text-xl border-2 border-sky-200 p-4"
                    />
                    <Button
                      onClick={handleSendMessage}
                      size="lg"
                      className="bg-sky-600 hover:bg-sky-700 text-white p-6"
                    >
                      <Send className="h-8 w-8" />
                      <span className="sr-only">Send message</span>
                    </Button> */}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-6 md:w-1/3">
            <input
              type="file"
              accept="image/*"
              id="photo-upload"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            {/* <Button
                  onClick={() =>
                    document.getElementById('photo-upload').click()
                  }
                  variant="outline"
                  className="flex-1 text-sky-600 border-2 border-sky-200 hover:bg-sky-50 p-8"
                >
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <Camera className="h-24 w-24 mb-4" />
                    <span className="text-2xl font-bold">Take Photo</span>
                    <span className="text-xl text-sky-600 mt-2">
                      Click to capture an image
                    </span>
                  </div>
                </Button> */}
            {/* <Button
                  onClick={handleVoiceInput}
                  variant="outline"
                  className={`flex-1 text-sky-600 border-2 border-sky-200 hover:bg-sky-50 p-8 ${
                    isRecording ? 'bg-red-100' : ''
                  }`}
                >
                  <div className="flex flex-col items-center justify-center w-full h-full">
                    <Mic className="h-24 w-24 mb-4" />
                    <span className="text-2xl font-bold">
                      {isRecording ? 'Recording...' : 'Voice Input'}
                    </span>
                    <span className="text-xl text-sky-600 mt-2">
                      {isRecording ? 'Tap to stop' : 'Tap to start recording'}
                    </span>
                  </div>
                </Button> */}
          </div>
        </div>
        {/* </CardContent>
          <Card className="bg-white border-sky-200 shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Button className="w-full py-10 text-3xl font-bold bg-green-500 hover:bg-green-600 text-white">
                <PlusCircle className="h-12 w-12 mr-4" />
                Add New Entry
              </Button>
            </CardContent>
          </Card>
        </Card> */}
      </main>

      <footer className="p-6 bg-sky-700 text-white text-center">
        <div className="flex justify-center items-center space-x-2">
          <p className="text-lg">
            Created by James Husband at Harbour Development
          </p>
          <a
            href="https://github.com/JamesHusband/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-sky-200"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>
      </footer>
      <nav className="flex justify-around p-6 border-t-2 bg-white shadow-md">
        <Button
          variant="ghost"
          className="flex flex-col items-center text-sky-700"
        >
          <Activity className="h-12 w-12" />
          <span className="text-xl mt-2">Stats</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center text-sky-700"
        >
          <MessageCircle className="h-12 w-12" />
          <span className="text-xl mt-2">Assistant</span>
        </Button>
        <Button
          variant="ghost"
          className="flex flex-col items-center text-sky-700"
        >
          <User className="h-12 w-12" />
          <span className="text-xl mt-2">Profile</span>
        </Button>
      </nav>
    </div>
  );
}
