import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Logo — links to Home */}
        <Link to="/" className="text-2xl font-bold text-teal-600">
          OroGlee🦷
        </Link>

        {/* Admin Panel — navigates to /login */}
        <button
          onClick={() => navigate('/login')}
          className="border border-teal-600 text-teal-600 text-sm font-medium px-4 py-1.5 rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-200"
        >
          Admin Panel
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
