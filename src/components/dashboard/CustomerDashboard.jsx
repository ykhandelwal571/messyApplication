import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Check, MessageSquare, Star } from 'lucide-react';
import MainLayout from '../layout/MainLayout';

const CustomerDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMarkedPresent, setIsMarkedPresent] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoveredStar, setHoveredStar] = useState(0);

  const customerInfo = {
    name: 'John Doe',
    messId: 'MESS001',
    subscription: 'Monthly',
    validTill: '2024-03-15',
    balance: '₹2000'
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your feedback!\n\nRating: ${rating} stars\nFeedback: ${feedback}`);
    setRating(0);
    setFeedback('');
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      return (
        <button
          key={index}
          type="button"
          onClick={() => setRating(starValue)}
          onMouseEnter={() => setHoveredStar(starValue)}
          onMouseLeave={() => setHoveredStar(0)}
          className={`focus:outline-none transition-colors duration-200 ${
            (hoveredStar || rating) >= starValue
              ? 'text-yellow-400'
              : 'text-gray-300'
          }`}
        >
          <Star 
            className="w-8 h-8"
            fill={(hoveredStar || rating) >= starValue ? 'currentColor' : 'none'}
          />
        </button>
      );
    });
  };

  return (
    <MainLayout userType="customer" onLogout={onLogout}>
      <div className="space-y-6 p-4 sm:p-8">
        {/* Customer Info Card */}
        <Card className="border border-gray-300 shadow-md bg-white rounded-lg">
          <CardContent className="p-6">
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-red-700">{customerInfo.name}</h2>
                <p className="text-gray-600">Mess ID: {customerInfo.messId}</p>
              </div>
              <div className="text-right">
                <p className="text-red-600 font-medium">Balance: {customerInfo.balance}</p>
                <p className="text-sm text-gray-500">Valid till: {customerInfo.validTill}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Action: Mark Attendance */}
        <div className="grid grid-cols-1 gap-4">
          <button 
            onClick={() => setIsMarkedPresent(true)}
            disabled={isMarkedPresent}
            className={`p-4 rounded-lg shadow-md transition-all duration-200 text-center font-semibold ${
              isMarkedPresent 
                ? 'bg-green-100 text-green-800 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            <Check className="w-6 h-6 mx-auto mb-2" />
            {isMarkedPresent ? 'Attendance Marked' : 'Mark Attendance'}
          </button>
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-red-100 p-1 rounded-lg">
            <TabsTrigger 
              value="dashboard"
              className="flex-1 text-center py-2 font-medium rounded-lg data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Dashboard
            </TabsTrigger>
            <TabsTrigger 
              value="menu"
              className="flex-1 text-center py-2 font-medium rounded-lg data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Menu
            </TabsTrigger>
            <TabsTrigger 
              value="feedback"
              className="flex-1 text-center py-2 font-medium rounded-lg data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Feedback
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab Content */}
          <TabsContent value="dashboard" className="mt-4">
            <Card className="border border-gray-300 rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Current Status</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="font-medium text-gray-700">Subscription Details</h3>
                    <p className="text-gray-600">Type: {customerInfo.subscription}</p>
                    <p className="text-gray-600">Valid Till: {customerInfo.validTill}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                    <h3 className="font-medium text-gray-700">Today's Status</h3>
                    <p className="text-gray-600">
                      Attendance: {isMarkedPresent ? 'Present' : 'Not Marked'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab Content */}
          <TabsContent value="feedback" className="mt-4">
            <Card className="border border-gray-300 rounded-lg shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Give Feedback</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <div className="flex gap-1">
                      {renderStars()}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Your Feedback</label>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      rows={4}
                      placeholder="Please share your experience..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!rating || !feedback.trim()}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Submit Feedback
                  </button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Notification Button */}
        <div className="fixed bottom-4 right-4">
          <button className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700">
            <MessageSquare className="w-5 h-5" />
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default CustomerDashboard;
// Compare this snippet from src/components/ui/card/Card.jsx: