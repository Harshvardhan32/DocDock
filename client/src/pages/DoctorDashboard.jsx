import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { updateProfile } from '../slices/doctorSlice';
// import { fetchBookings } from '../slices/bookingSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { FaCalendarCheck } from 'react-icons/fa';
import { FaLightbulb } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export default function DoctorDashboard() {
    // const dispatch = useDispatch();
    // const { user } = useSelector(state => state.auth);
    // const { bookings } = useSelector(state => state.booking);

    // Dummy user
    const user = {
        specialties: ['Cardiology', 'Internal Medicine'],
        availability: ['Mon-Fri 9AM-5PM'],
        clinic: {
            address: '123 Health St.',
            location: { coordinates: [77.5946, 12.9716] },
        },
    };

    const dummyBookings = [
        {
            doctor: 'Dr. Sarah Johnson',
            specialty: 'Pediatrician',
            date: 'May 12, 2025',
            time: '10:30 AM',
            status: 'Upcoming',
        },
        {
            doctor: 'Dr. Michael Chen',
            specialty: 'Cardiologist',
            date: 'May 5, 2025',
            time: '2:15 PM',
            status: 'Completed',
        },
    ];

    const healthTips = [
        {
            title: "Stay Hydrated",
            description: "Remember to drink at least 8 glasses of water daily for optimal health.",
        },
        {
            title: "Regular Exercise",
            description: "Engage in at least 30 minutes of moderate physical activity every day.",
        },
        {
            title: "Balanced Diet",
            description: "Incorporate a variety of fruits, vegetables, lean proteins, and whole grains in your meals.",
        },
        {
            title: "Adequate Sleep",
            description: "Aim for 7-9 hours of quality sleep each night to support overall health.",
        },
        {
            title: "Stress Management",
            description: "Practice mindfulness, deep breathing, or meditation to reduce stress levels.",
        },
    ];

    const [specialties, setSpecialties] = useState(user.specialties);
    const [availability, setAvailability] = useState(user.availability);
    const [clinic, setClinic] = useState(user.clinic);

    const handleSubmit = () => {
        const payload = {
            specialties,
            availability,
            clinic,
        };
        console.log('Form Submitted:', payload);
        // dispatch(updateProfile(payload));
    };

    useEffect(() => {
        // dispatch(fetchBookings());
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <main className="flex-1 overflow-y-auto p-4 bg-gray-100 mb-12">
                <div className="w-full mx-auto">
                    <h1 className="text-2xl font-bold mb-6">Doctor Profile</h1>

                    {/* Specialties */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Specialties</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={specialties.join(',')}
                            onChange={e => setSpecialties(e.target.value.split(','))}
                        />
                    </div>

                    {/* Availability */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Availability</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={availability.join(',')}
                            onChange={e => setAvailability(e.target.value.split(','))}
                        />
                    </div>

                    {/* Clinic Address */}
                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Clinic Address</label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={clinic.address}
                            onChange={e => setClinic({ ...clinic, address: e.target.value })}
                        />
                    </div>

                    {/* Coordinates */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">Latitude</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={clinic.location.coordinates[1]}
                                onChange={e =>
                                    setClinic({
                                        ...clinic,
                                        location: {
                                            ...clinic.location,
                                            coordinates: [
                                                clinic.location.coordinates[0],
                                                parseFloat(e.target.value),
                                            ],
                                        },
                                    })
                                }
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block mb-1 font-medium">Longitude</label>
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                value={clinic.location.coordinates[0]}
                                onChange={e =>
                                    setClinic({
                                        ...clinic,
                                        location: {
                                            ...clinic.location,
                                            coordinates: [
                                                parseFloat(e.target.value),
                                                clinic.location.coordinates[1],
                                            ],
                                        },
                                    })
                                }
                            />
                        </div>
                    </div>

                    <button className="btn btn-primary mt-2" onClick={handleSubmit}>
                        Save Profile
                    </button>

                    {/* Recent Appointments */}
                    <div className="my-4 bg-white rounded-md p-5 text-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>

                        <div className='flex flex-col gap-4'>
                            {dummyBookings.map((booking, index) => (
                                <div key={index} className="bg-white flex justify-between items-center border border-gray-200 rounded-md p-4">
                                    <div className='flex gap-4 items-center'>
                                        <div className={`p-2 rounded-full ${booking.status === 'Upcoming' ? 'bg-[#DBEAFE]' : 'bg-[#F3F4F8]'}`}>
                                            <FaCalendarCheck fill={`${booking.status === 'Upcoming' ? '#2563EB' : '#6a7282'}`} />
                                        </div>
                                        <div className='flex flex-col gap-0.5'>
                                            <h3 className="font-bold text-[14px]">{booking.doctor}</h3>
                                            <p className="text-gray-600 text-xs">{booking.specialty} • {booking.date}, {booking.time}</p>
                                        </div>
                                    </div>
                                    <span
                                        className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${booking.status === 'Upcoming'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-200 text-gray-700'
                                            }`}
                                    >
                                        {booking.status}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex flex-row items-center text-base font-medium text-blue-700">
                            <Link to='/appointments'>View all appointments</Link>
                            <MdOutlineKeyboardArrowRight fontSize={18} />
                        </div>
                    </div>

                    {/*Health Tips*/}
                    <div className="bg-white rounded-md p-5 text-gray-700">
                        <h2 className="text-xl font-semibold mb-4">Health Tips</h2>

                        <div className='flex flex-col gap-4'>
                            {healthTips.map((tip, index) => (
                                <div key={index} className="bg-blue-50 flex gap-3 border border-gray-200 rounded-md p-4">
                                    <FaLightbulb className="text-[#2563EB] mt-2" />
                                    <div className='flex flex-col gap-0.5'>
                                        <h3 className="font-bold text-[14px]">{tip.title}</h3>
                                        <p className="text-gray-600 text-sm">{tip.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}