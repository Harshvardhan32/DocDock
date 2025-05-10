import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../slices/doctorSlice';
import { bookAppointment } from '../slices/bookingSlice';
import { fetchNotifications } from '../slices/notificationSlice';
import Chatbot from '../components/Chatbot';

export default function PatientDashboard() {
    const dispatch = useDispatch();
    const { doctors } = useSelector(state => state.doctor);
    const { notifications } = useSelector(state => state.notification);
    const [specialty, setSpecialty] = useState('');
    const [location, setLocation] = useState({ lat: '', lng: '' });
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState('');
    const [date, setDate] = useState('');

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(fetchDoctors({ specialty, lat: location.lat, lng: location.lng }));
    };

    const handleBook = () => {
        if (selectedDoctor && date && selectedSlot) {
            dispatch(bookAppointment({ doctorId: selectedDoctor._id, date, slot: selectedSlot }));
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Find a Doctor</h1>
            <div className="flex gap-2 mb-4">
                <input className="input" placeholder="Specialty" value={specialty} onChange={e => setSpecialty(e.target.value)} />
                <input className="input" placeholder="Latitude" value={location.lat} onChange={e => setLocation({ ...location, lat: e.target.value })} />
                <input className="input" placeholder="Longitude" value={location.lng} onChange={e => setLocation({ ...location, lng: e.target.value })} />
                <button className="btn-primary" onClick={handleSearch}>Search</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {doctors.map(doc => (
                    <div key={doc._id} className="border p-4 rounded">
                        <h2 className="font-bold">{doc.name}</h2>
                        <div>Specialties: {doc.specialties?.join(', ')}</div>
                        <div>Address: {doc.clinic?.address}</div>
                        <button className="btn-secondary mt-2" onClick={() => setSelectedDoctor(doc)}>View Availability</button>
                    </div>
                ))}
            </div>
            {selectedDoctor && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold">Book with {selectedDoctor.name}</h2>
                    <input className="input mb-2" type="date" value={date} onChange={e => setDate(e.target.value)} />
                    <div>
                        {selectedDoctor.availability?.map(avail => (
                            <div key={avail.day}>
                                <div className="font-semibold">{avail.day}</div>
                                <div className="flex gap-2">
                                    {avail.slots.map(slot => (
                                        <button key={slot} className={`btn ${selectedSlot === slot ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setSelectedSlot(slot)}>{slot}</button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="btn-primary mt-2" onClick={handleBook}>Book Appointment</button>
                </div>
            )}
            <div className="mt-8">
                <h2 className="text-xl font-bold">Notifications</h2>
                <ul>
                    {notifications.map((n, i) => <li key={i}>{n.message}</li>)}
                </ul>
            </div>
            <Chatbot />
        </div>
    );
}