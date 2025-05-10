import React from 'react';
import { useSelector } from 'react-redux';
import AuthPage from './pages/AuthPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import { Route, Routes } from 'react-router-dom';
import Appointments from './pages/Appointments';

function App() {

    const { user } = useSelector(state => state.auth);

    return <>
        <Routes>
            <Route path='/' element={<DoctorDashboard />} />
            <Route path='/profile' element={<DoctorDashboard />} />
            <Route path='/doctors' element={<DoctorDashboard />} />
            <Route path='/appointments' element={<Appointments />} />
        </Routes>
    </>

    // if (!user) return <AuthPage />;
    // if (user.role === 'doctor') return <DoctorDashboard />;
    // return <DoctorDashboard />;
    // return <PatientDashboard />;
}

export default App;