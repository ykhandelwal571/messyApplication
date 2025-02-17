import React from 'react';

// console.log('Main Layout loaded');

const MainLayout = ({ children, userType, onLogout }) => {
  return (
    <div className="min-h-screen bg-yellow-50">
      {/* Header */}
      <header className="bg-red-600 text-white py-4 px-6 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">The Messy Application</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm bg-red-700 px-3 py-1 rounded">
              {userType === 'manager' ? 'Manager' : 'Customer'}
            </span>
            <button 
              onClick={onLogout}
              className="text-sm bg-red-700 hover:bg-red-800 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {children}
      </main>

      <footer className="bg-red-600 text-white py-4 px-6 mt-auto">
        <div className="text-center">
          <p className="text-sm">© The Messy Application. Created By Yash Khandelwal.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;