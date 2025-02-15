// src/App.jsx
import { useState } from 'react';
import ManagerDashboard from './components/dashboard/ManagerDashboard';
import CustomerDashboard from './components/dashboard/CustomerDashboard';
import Login from './components/auth/Login';

function App() {
  const [userType, setUserType] = useState(null);

  const handleLogin = (type) => {
    setUserType(type);
  };

  const handleLogout = () => {
    setUserType(null);
  };

  if (!userType) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    userType === 'manager' 
      ? <ManagerDashboard onLogout={handleLogout} /> 
      : <CustomerDashboard onLogout={handleLogout} />
  );
}

export default App;