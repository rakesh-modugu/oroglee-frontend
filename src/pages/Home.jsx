import { useState, useEffect } from 'react';
import DentistCard from '../components/DentistCard';
import BookingModal from '../components/BookingModal';

function Home() {
  const [dentists, setDentists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDentist, setSelectedDentist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchDentists() {
      try {
        const response = await fetch('http://localhost:5000/api/dentists');
        const data = await response.json();
        setDentists(data);
      } catch (err) {
        setError('Failed to load dentists. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchDentists();
  }, []);

  const filteredDentists = dentists.filter(
    (dentist) =>
      dentist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dentist.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="flex-grow container mx-auto px-4 py-8">

      {/* Page Heading */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Find Your Dentist</h2>
        <p className="text-gray-500 mt-2 text-sm">Book an appointment with top-rated dental professionals near you.</p>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-teal-600 text-lg font-medium mt-16">
          Loading amazing doctors...
        </p>
      )}

      {/* Error State */}
      {error && (
        <p className="text-center text-red-500 text-base mt-16">
          {error}
        </p>
      )}

      {/* Search Input */}
      {!loading && !error && (
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by doctor name or location..."
          className="w-full max-w-lg px-4 py-3 mb-8 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm mx-auto block"
        />
      )}

      {/* Cards Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDentists.map((dentist) => (
            <DentistCard
              key={dentist._id}
              dentist={dentist}
              onBook={() => {
                setSelectedDentist(dentist);
                setIsModalOpen(true);
              }}
            />
          ))}
          {filteredDentists.length === 0 && (
            <p className="text-center text-gray-500 w-full col-span-full">
              No dentists found matching your search.
            </p>
          )}
        </div>
      )}

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dentist={selectedDentist}
      />

    </main>
  );
}

export default Home;
