import React from 'react';
import { useSelector } from 'react-redux';
import AuthPage from './pages/AuthPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import { Route, Routes } from 'react-router-dom';
import Appointments from './pages/Appointments';
import BookAppointment from './pages/BookAppointment';
import Profile from './pages/Profile';

function App() {

    const { user } = useSelector(state => state.auth);

    return <>
        <Routes>
            <Route path='/' element={<DoctorDashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/doctors' element={<DoctorDashboard />} />
            <Route path='/appointments' element={<Appointments />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
        </Routes>
    </>

    // if (!user) return <AuthPage />;
    // if (user.role === 'doctor') return <DoctorDashboard />;
    // return <DoctorDashboard />;
    // return <PatientDashboard />;
}

export default App;