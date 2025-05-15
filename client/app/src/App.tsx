import "tailwindcss";
import Login from "./auth/login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/customerPage/Dashboard";
import SellerDashboard from "./pages/sellerPage/sellerDashboard";
import HomeScreen from "./pages/customerPage/HomeScreen";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
         <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;