import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

export default function Header() {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <img src="/logo.png" alt="DocDock Logo" className="h-8" />
                <h1 className="text-lg font-semibold text-gray-800">DocDock</h1>
            </div>

            <div className="flex items-center gap-4">
                {/* Optional: add links like Home, Profile, etc. */}
                <Link to="/profile">
                    <FaUserCircle className="text-2xl text-gray-600 hover:text-blue-500" />
                </Link>
            </div>
        </header>
    );
}