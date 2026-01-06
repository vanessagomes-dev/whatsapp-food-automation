import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

export default function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}
