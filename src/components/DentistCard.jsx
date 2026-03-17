function DentistCard({ dentist, onBook }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-7 flex flex-col items-center gap-4 hover:shadow-xl transition-shadow duration-300">

      {/* Photo */}
      <img
        src={dentist.photo}
        alt={dentist.name}
        className="w-28 h-28 rounded-full object-cover border-4 border-teal-100 shadow-sm"
      />

      {/* Name & Qualification */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">{dentist.name}</h2>
        <p className="text-sm text-slate-500 mt-1">{dentist.qualification}</p>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-100" />

      {/* Details */}
      <div className="w-full flex flex-col gap-3 text-sm text-gray-600">

        {/* Experience */}
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-teal-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span><span className="font-semibold text-gray-700">{dentist.experience} yrs</span> experience</span>
        </div>

        {/* Clinic */}
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-teal-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <span>{dentist.clinicName}</span>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{dentist.address}, <span className="font-medium text-gray-700">{dentist.location}</span></span>
        </div>

      </div>

      {/* Book Appointment Button */}
      <button
        onClick={onBook}
        className="mt-2 w-full bg-teal-600 text-white py-3 rounded-2xl font-semibold tracking-wide hover:bg-teal-700 hover:scale-105 transition-all duration-300"
      >
        Book Appointment
      </button>

    </div>
  );
}

export default DentistCard;
