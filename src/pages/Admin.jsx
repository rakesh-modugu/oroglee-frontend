import { useState, useEffect } from 'react';
import API_BASE_URL from '../config';

function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // DELETE an appointment
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/appointments/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setAppointments((prev) => prev.filter((app) => app._id !== id));
      } else {
        alert('Failed to delete. Check server console.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error.');
    }
  };

  // PATCH toggle status (Booked <-> Completed)
  const handleToggleStatus = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${id}/status`, {
        method: 'PATCH',
      });
      if (res.ok) {
        const updated = await res.json();
        setAppointments((prev) =>
          prev.map((appt) => (appt._id === id ? updated : appt))
        );
      } else {
        alert('Failed to update status. Check server console.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error.');
    }
  };

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const [apptRes, docsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/appointments`),
          fetch(`${API_BASE_URL}/api/dentists`),
        ]);
        const apptData = await apptRes.json();
        const docsData = await docsRes.json();
        setAppointments(apptData);
        setTotalDoctors(docsData.length);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, []);

  // Derived metrics
  const totalAppointments = appointments.length;
  const pendingBookings = appointments.filter((app) => app.status !== 'Completed').length;

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold text-slate-800">Admin Panel - Appointments</h1>
      <p className="mt-1 text-gray-500 text-sm">All booked appointments are listed below.</p>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">

        {/* Card 1 — Total Doctors */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Doctors</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{totalDoctors}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-2xl">
            👨‍⚕️
          </div>
        </div>

        {/* Card 2 — Total Appointments */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-slate-500 text-sm font-medium">Total Appointments</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{totalAppointments}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-2xl">
            📅
          </div>
        </div>

        {/* Card 3 — Pending Bookings */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <p className="text-slate-500 text-sm font-medium">Pending Bookings</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{pendingBookings}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center text-2xl">
            ⏳
          </div>
        </div>

      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">

          {/* Table Header */}
          <thead className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">Patient Name</th>
              <th className="px-5 py-3">Age</th>
              <th className="px-5 py-3">Gender</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Dentist Name</th>
              <th className="px-5 py-3">Clinic</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-700 text-sm">

            {/* Loading */}
            {loading && (
              <tr>
                <td colSpan="9" className="text-center py-8 text-teal-600 font-medium">
                  Loading appointments...
                </td>
              </tr>
            )}

            {/* Error */}
            {error && (
              <tr>
                <td colSpan="9" className="text-center py-8 text-red-500">
                  {error}
                </td>
              </tr>
            )}

            {/* Empty */}
            {!loading && !error && appointments.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-8 text-gray-400">
                  No appointments booked yet.
                </td>
              </tr>
            )}

            {/* Rows */}
            {!loading && !error && appointments.map((appt, index) => (
              <tr key={appt._id} className="border-b hover:bg-slate-50 transition">
                <td className="px-5 py-3 text-gray-400">{index + 1}</td>
                <td className="px-5 py-3 font-medium text-gray-800">{appt.patientName}</td>
                <td className="px-5 py-3">{appt.age}</td>
                <td className="px-5 py-3">{appt.gender}</td>
                <td className="px-5 py-3">{appt.appointmentDate}</td>
                <td className="px-5 py-3">{appt.dentistName}</td>
                <td className="px-5 py-3">{appt.clinicName}</td>

                {/* Status Badge */}
                <td className="px-5 py-3">
                  {appt.status === 'Completed' ? (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-bold">
                      Booked
                    </span>
                  )}
                </td>

                {/* Action Buttons */}
                <td className="px-5 py-3 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleStatus(appt._id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium mr-2 transition-colors"
                  >
                    {appt.status === 'Completed' ? '↩ Revert' : '✔ Mark Done'}
                  </button>
                  <button
                    onClick={() => handleDelete(appt._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Admin;
