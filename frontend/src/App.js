import { Routes, Route } from "react-router-dom";

import LoginRegister from "./pages/LoginRegister";
import DonorDashboard from "./donar/DonarDashboard";
import RecipientDashboard from "./recipient/RecipientDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/donor" element={<DonorDashboard />} />
      <Route path="/recipient" element={<RecipientDashboard />} />
    </Routes>
  );
}

export default App;