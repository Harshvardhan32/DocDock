import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import ProfileDropdown from './ProfileDropdown';
import { HiDocumentPlus } from "react-icons/hi2";

export default function Header() {

    const [showDropdown, setShowDropDown] = useState();

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
                {/* <img src="/logo.png" alt="DocDock Logo" className="h-8" /> */}
                <span className='p-2 bg-blue-700 rounded-full'>
                    <HiDocumentPlus fill="#fff" />
                </span>
                <h1 className="text-lg font-semibold text-gray-800">DocDock</h1>
            </div>

            <div className="relative flex items-center gap-4">
                {/* Optional: add links like Home, Profile, etc. */}
                <span
                    className='cursor-pointer p-2 bg-gray-200 rounded-md'
                    onClick={() => setShowDropDown((prev) => !prev)}
                >
                    <FaUser className="text-xl text-gray-600" />
                </span>
                {
                    showDropdown && <div className='absolute top-10 right-1 z-10'>
                        <ProfileDropdown />
                    </div>
                }
            </div>
        </header>
    );
}