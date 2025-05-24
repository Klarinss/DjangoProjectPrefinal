import "tailwindcss";
import Login from "./auth/login";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/customerPage/Dashboard";
import SellerDashboard from "./pages/sellerPage/sellerDashboard";

import ShopPage from "./pages/customerPage/ShopPage";



function App() {
  return (
    <Router>
      <Routes>
        
         <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sellerDashboard" element={<SellerDashboard />} />
        <Route path="/shoppage" element={<ShopPage></ShopPage>}/>

      </Routes>
    </Router>
  );
}

export default App;