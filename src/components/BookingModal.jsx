import { useState } from 'react';
import API_BASE_URL from '../config';

function BookingModal({ isOpen, onClose, dentist }) {
  const [formData, setFormData] = useState({
    patientName: '',
    age: '',
    gender: '',
    appointmentDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.patientName.trim() ||
      !formData.age ||
      !formData.gender ||
      !formData.appointmentDate
    ) {
      setFormError('Please fill in all the details before booking! 🛑');
      return;
    }

    setFormError('');
    setLoading(true);

    const payload = {
      ...formData,
      dentistName: dentist.name,
      clinicName: dentist.clinicName,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFormData({ patientName: '', age: '', gender: '', appointmentDate: '' });
        setLoading(false);
        onClose();
        showToast('Appointment Booked Successfully! 🎉');
      } else {
        const errorData = await res.json();
        setFormError('Booking failed: ' + errorData.message);
        setLoading(false);
      }
    } catch (err) {
      setFormError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <div
        className={`fixed top-5 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl transition-all duration-500 z-[60] flex items-center gap-3 ${
          toast.show ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
      >
        <span>✅</span>
        <p className="font-medium text-sm">{toast.message}</p>
      </div>

      {/* Overlay */}
      {isOpen && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center px-4">

      {/* Modal Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
      >

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Book Appointment</h2>
          <p className="text-sm text-teal-600 mt-1">Booking with {dentist?.name}</p>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-4">

          {/* Patient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Appointment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Date</label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

        </div>

        {/* Validation Error */}
        {formError && (
          <p className="text-red-500 text-sm mb-4 text-center font-medium">{formError}</p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-600 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-teal-600 text-white py-2.5 rounded-lg font-semibold hover:bg-teal-700 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Booking...' : 'Confirm Booking'}
          </button>
        </div>

      </form>
      </div>
      )}
    </>
  );
}

export default BookingModal;
