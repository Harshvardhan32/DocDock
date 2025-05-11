import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaPlus, FaTimes, FaTrashAlt } from "react-icons/fa";

const mockPatient = {
    id: 201,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "987-654-3210",
    location: "New York",
    insuranceProvider: "Blue Shield",
    policyNumber: "BS-99887766",
    familyMembers: ["Spouse", "Child 1"],
    upcomingAppointments: [
        {
            id: 1,
            date: "2025-05-13",
            time: "11:00 AM - 1:00 PM",
            doctor: "Dr. Michael Chen",
            specialty: "Dermatologist",
        },
        {
            id: 2,
            date: "2025-05-20",
            time: "3:00 PM - 5:00 PM",
            doctor: "Dr. Jessica Martinez",
            specialty: "Neurologist",
        },
    ],
};

export default function Profile() {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [newMember, setNewMember] = useState("");
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        setUser(mockPatient);
        setFormData(mockPatient);
    }, []);

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        setUser(formData);
        setEditing(false);
    };

    const handleAddMember = () => {
        if (!newMember.trim()) return;
        setUser((prev) => ({
            ...prev,
            familyMembers: [...prev.familyMembers, newMember.trim()],
        }));
        setNewMember("");
        setShowModal(false);
    };

    const handleRemoveMember = (indexToRemove) => {
        setUser((prev) => ({
            ...prev,
            familyMembers: prev.familyMembers.filter((_, i) => i !== indexToRemove),
        }));
    };

    if (!user) return <div className="text-center py-10">Loading profile...</div>;

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <Header />

            <main className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Top Section - User Info */}
                <div className="max-w-5xl mx-auto bg-white rounded-md shadow-md p-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Patient Profile</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                        <ProfileItem label="Name" value={user.name} />
                        <ProfileItem label="Email" value={user.email} />
                        <ProfileItem label="Phone" value={user.phone} />
                        <ProfileItem label="Location" value={user.location} />
                        <ProfileItem label="Insurance Provider" value={user.insuranceProvider} />
                        <ProfileItem label="Policy Number" value={user.policyNumber} />
                    </div>
                </div>

                {/* Bottom Section - Settings */}
                <div className="max-w-5xl mx-auto mb-12 bg-white rounded-md shadow-md p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-800">Settings</h2>
                        <button
                            onClick={() => setEditing((prev) => !prev)}
                            className="cursor-pointer px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            {editing ? "Cancel" : "Edit Info"}
                        </button>
                    </div>

                    {/* Editable Info */}
                    {editing && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {["name", "email", "phone", "location", "insuranceProvider", "policyNumber"].map((field) => (
                                <div key={field}>
                                    <label className="text-gray-500 block mb-1 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                                    <input
                                        type="text"
                                        value={formData[field]}
                                        onChange={(e) => handleInputChange(field, e.target.value)}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                                    />
                                </div>
                            ))}
                            <div className="col-span-2 text-right">
                                <button
                                    onClick={handleSaveChanges}
                                    className="cursor-pointer mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Family Member Section */}
                    <section>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">Family Members</h3>
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
                            >
                                <FaPlus className="text-xs" />
                                Add Member
                            </button>
                        </div>
                        <ul className="space-y-2 text-sm text-gray-800">
                            {user.familyMembers.map((member, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded-md">
                                    <span>{member}</span>
                                    <button
                                        onClick={() => handleRemoveMember(index)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>

            <Footer />

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-md w-[90%] max-w-md p-6 shadow-lg relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                        >
                            <FaTimes />
                        </button>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Family Member</h3>
                        <input
                            type="text"
                            placeholder="Enter member name"
                            value={newMember}
                            onChange={(e) => setNewMember(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring focus:border-blue-500"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddMember}
                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function ProfileItem({ label, value }) {
    return (
        <div>
            <p className="text-gray-500">{label}</p>
            <p className="text-gray-900 font-medium">{value || "—"}</p>
        </div>
    );
}