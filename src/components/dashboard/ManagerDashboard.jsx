import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, DollarSign, TrendingUp, MessageSquare } from "lucide-react";
import { CheckCircle, XCircle } from "lucide-react";
import MainLayout from "../layout/MainLayout";

const ManagerDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [menu, setMenu] = useState({ breakfast: "", lunch: "", dinner: "" });

  // Student Data
  const allStudents = [
    "John Doe",
    "Jane Smith",
    "Michael Brown",
    "Emily Davis",
    "Chris Johnson",
    "Sarah Wilson",
  ];
  const studentsPresent = [
    "John Doe",
    "Jane Smith",
    "Michael Brown",
    "Emily Davis",
  ];

  // Calculate Absent Students
  const absentStudents = allStudents.filter(
    (student) => !studentsPresent.includes(student)
  );

  // // Random student list
  // const studentsPresent = [
  //   "John Doe",
  //   "Jane Smith",
  //   "Michael Brown",
  //   "Emily Davis",
  //   "Chris Johnson",
  // ];

  // Random feedback data
  const feedbackData = [
    { student: "John Doe", comment: "The food today was excellent!" },
    {
      student: "Jane Smith",
      comment: "Lunch was a bit salty, but breakfast was good.",
    },
    { student: "Michael Brown", comment: "Great menu this week!" },
  ];

  // Stats Data
  const statsData = {
    totalPresent: studentsPresent.length,
    totalStudents: 50,
    todayRevenue: "₹15,000",
    monthlyRevenue: "₹450,000",
  };

  const handleSubmitMenu = () => {
    // Here you can send the menu to the server or handle submission
    alert(`Menu Submitted:
    Breakfast: ${menu.breakfast}
    Lunch: ${menu.lunch}
    Dinner: ${menu.dinner}`);
  };

  // StatCard Component
  const StatCard = ({ title, value, icon: Icon, trend }) => (
    <Card className="border-red-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-600 text-sm">{title}</p>
            <p className="text-2xl font-bold text-red-700">{value}</p>
            {trend && (
              <p
                className={`text-sm ${
                  trend > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% vs last month
              </p>
            )}
          </div>
          <Icon className="w-8 h-8 text-red-500 opacity-75" />
        </div>
      </CardContent>
    </Card>
  );

  // Menu Change Handler
  const handleMenuChange = (meal, value) => {
    setMenu((prevMenu) => ({
      ...prevMenu,
      [meal]: value,
    }));
  };

  return (
    <MainLayout userType="manager" onLogout={onLogout}>
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Today's Attendance"
            value={`${statsData.totalPresent}/${statsData.totalStudents}`}
            icon={Users}
            trend={2.5}
          />
          <StatCard
            title="Today's Revenue"
            value={statsData.todayRevenue}
            icon={DollarSign}
            trend={5.2}
          />
          <StatCard
            title="Monthly Revenue"
            value={statsData.monthlyRevenue}
            icon={TrendingUp}
            trend={-1.5}
          />
        </div>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-red-100 p-1 rounded-lg">
            <TabsTrigger
              value="overview"
              className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="menu"
              className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Menu
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="flex-1 data-[state=active]:bg-red-600 data-[state=active]:text-white"
            >
              Feedback
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          {/* Overview Tab Content */}
          <TabsContent value="overview">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Present Students Card */}
                <Card className="border-green-100 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        <h4 className="text-xl font-semibold text-green-800">
                          Present Students
                          <span className="block text-sm font-normal text-green-600">
                            {studentsPresent.length}/{allStudents.length}{" "}
                            students
                          </span>
                        </h4>
                      </div>
                      <div className="text-2xl font-bold text-green-700">
                        {(
                          (studentsPresent.length / allStudents.length) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-green-100 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-green-600 h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (studentsPresent.length / allStudents.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>

                    <div className="space-y-2">
                      {studentsPresent.map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm"
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-gray-700">{student}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Absent Students Card */}
                <Card className="border-red-100 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <XCircle className="w-6 h-6 text-red-600" />
                        <h4 className="text-xl font-semibold text-red-800">
                          Absent Students
                          <span className="block text-sm font-normal text-red-600">
                            {absentStudents.length}/{allStudents.length}{" "}
                            students
                          </span>
                        </h4>
                      </div>
                      <div className="text-2xl font-bold text-red-700">
                        {(
                          (absentStudents.length / allStudents.length) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-red-100 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-red-600 h-2.5 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            (absentStudents.length / allStudents.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>

                    <div className="space-y-2">
                      {absentStudents.map((student, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-2 bg-white rounded-lg shadow-sm"
                        >
                          <span className="flex-shrink-0 w-2 h-2 bg-red-500 rounded-full"></span>
                          <span className="text-gray-700">{student}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">
                    {studentsPresent.length}
                  </div>
                  <div className="text-sm text-green-600">
                    Currently Present
                  </div>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-700">
                    {absentStudents.length}
                  </div>
                  <div className="text-sm text-red-600">Currently Absent</div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Menu Tab Content */}
          <TabsContent value="menu">
            <h3 className="text-lg font-bold text-red-700">
              Create Menu for the Day
            </h3>
            <div className="space-y-4">
              {/* Breakfast */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Breakfast
                </label>
                <input
                  type="text"
                  value={menu.breakfast}
                  onChange={(e) =>
                    handleMenuChange("breakfast", e.target.value)
                  }
                  placeholder="Enter breakfast menu"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Lunch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lunch
                </label>
                <input
                  type="text"
                  value={menu.lunch}
                  onChange={(e) => handleMenuChange("lunch", e.target.value)}
                  placeholder="Enter lunch menu"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Dinner */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dinner
                </label>
                <input
                  type="text"
                  value={menu.dinner}
                  onChange={(e) => handleMenuChange("dinner", e.target.value)}
                  placeholder="Enter dinner menu"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={() => handleSubmitMenu()}
                className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Submit Menu
              </button>
            </div>
          </TabsContent>

          {/* Feedback Tab Content */}
          <TabsContent value="feedback">
            <h3 className="text-lg font-bold text-red-700">Feedbacks</h3>
            <div className="space-y-4">
              {feedbackData.map((feedback, index) => (
                <div key={index} className="border p-4 rounded-lg shadow">
                  <p className="font-bold text-gray-800">{feedback.student}</p>
                  <p className="text-gray-600 mt-2">{feedback.comment}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions Panel */}
        <div className="fixed bottom-4 right-4 space-x-2">
          <button className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700">
            <Users className="w-5 h-5" />
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default ManagerDashboard;
