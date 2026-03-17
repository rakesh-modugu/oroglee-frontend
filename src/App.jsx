import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Standalone full-screen route — no Navbar/Footer */}
        <Route path="/login" element={<AdminLogin />} />

        {/* Main layout routes */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col min-h-screen bg-slate-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
              <Footer />
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
