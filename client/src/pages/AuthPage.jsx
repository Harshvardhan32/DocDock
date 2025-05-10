import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { register, login, verifyOTP } from "../slices/authSlice";
import countryCodes from "../data/countryCodes.json";

const signupSchema = z.object({
    name: z.string()
        .min(4, "Name must be at least 4 characters")
        .regex(/^[A-Za-z\s]+$/, "Name must contain only letters"),
    role: z.enum(["doctor", "patient"]),
    phone: z
        .string()
        .length(10, "Phone number must be exactly 10 digits")
        .regex(/^\d{10}$/, "Phone number must be numeric"),
    country: z.string(),
});

const signinSchema = z.object({
    phone: z
        .string()
        .length(10, "Phone number must be exactly 10 digits")
        .regex(/^\d{10}$/, "Phone number must be numeric"),
    country: z.string(),
});

export default function AuthPage() {
    const dispatch = useDispatch();
    const [mode, setMode] = useState("signin");
    const [showOTP, setShowOTP] = useState(false);
    const [mobileNumber, setMobileNumber] = useState("");

    const {
        register: signupRegister,
        handleSubmit: handleSignupSubmit,
        formState: { errors: signupErrors, isValid: isSignupValid },
    } = useForm({
        resolver: zodResolver(signupSchema),
        mode: "onChange",
    });

    const {
        register: signinRegister,
        handleSubmit: handleSigninSubmit,
        formState: { errors: signinErrors, isValid: isSigninValid },
    } = useForm({
        resolver: zodResolver(signinSchema),
        mode: "onChange",
    });

    const [otpInput, setOtpInput] = useState("");

    const handleSignup = (data) => {
        const mobile = data.country + data.phone;
        setMobileNumber(mobile);
        dispatch(register({ name: data.name, role: data.role, mobile }));
        setShowOTP(true);
    };

    const handleSignin = (data) => {
        const mobile = data.country + data.phone;
        setMobileNumber(mobile);
        dispatch(login({ mobile }));
        setShowOTP(true);
    };

    const handleVerifyOTP = () => {
        dispatch(verifyOTP({ mobile: mobileNumber, otp: otpInput }));
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            {/* Logo */}
            <div className="flex flex-col items-center mb-6">
                <div className="bg-blue-600 rounded-full p-4 mb-3">
                    <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
                        <rect width="24" height="24" rx="12" fill="#2563eb" />
                        <path
                            d="M8 7a2 2 0 0 1 2-2h2.5L17 7.5V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V7z"
                            fill="#fff"
                        />
                        <rect x="11" y="10" width="2" height="4" rx="1" fill="#2563eb" />
                        <rect x="10" y="12" width="4" height="2" rx="1" fill="#2563eb" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-900">DocDock</h1>
                <p className="text-gray-500 mt-1">Your health companion</p>
            </div>

            {/* Tabs */}
            {!showOTP && (
                <div className="flex space-x-6 mb-4">
                    <button
                        onClick={() => setMode("signin")}
                        className={`font-semibold ${mode === "signin" ? "text-blue-600" : "text-gray-500"}`}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setMode("signup")}
                        className={`font-semibold ${mode === "signup" ? "text-blue-600" : "text-gray-500"}`}
                    >
                        Sign Up
                    </button>
                </div>
            )}

            {/* Form Card */}
            <div className="bg-white rounded-xl shadow-md px-8 py-8 w-full max-w-md">
                {showOTP ? (
                    <>
                        <h2 className="text-xl font-semibold mb-6 text-gray-900">OTP Verification</h2>
                        <p className="text-gray-700 mb-4">
                            Enter the OTP sent to <strong>{mobileNumber}</strong>
                        </p>
                        <input
                            type="text"
                            maxLength={6}
                            className="w-full border rounded px-3 py-2 mb-4"
                            placeholder="Enter OTP"
                            value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value)}
                        />
                        <button
                            onClick={handleVerifyOTP}
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition"
                        >
                            Verify OTP
                        </button>
                    </>
                ) : mode === "signup" ? (
                    <form onSubmit={handleSignupSubmit(handleSignup)}>
                        <h2 className="text-xl font-semibold mb-6 text-gray-900">Create Account</h2>

                        <label className="block text-gray-700 mb-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 mb-2"
                            {...signupRegister("name")}
                        />
                        {signupErrors.name && (
                            <p className="text-red-500 text-sm mb-2">{signupErrors.name.message}</p>
                        )}

                        <label className="block text-gray-700 mb-1">Role</label>
                        <select
                            className="w-full border rounded px-3 py-2 mb-4"
                            {...signupRegister("role")}
                        >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>

                        <label className="block text-gray-700 mb-1">Mobile Number</label>
                        <div className="flex mb-2">
                            <select
                                className="rounded-l-md max-w-[100px] border bg-gray-100 px-3 py-2"
                                {...signupRegister("country")}
                            >
                                {countryCodes?.map((c, i) => (
                                    <option key={i} value={c.code}>
                                        {c.code} {c.country}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                className="flex-1 rounded-r-md border-t border-b border-r px-3 py-2"
                                {...signupRegister("phone")}
                                placeholder="Phone number"
                            />
                        </div>
                        {signupErrors.phone && (
                            <p className="text-red-500 text-sm mb-2">{signupErrors.phone.message}</p>
                        )}

                        <button
                            type="submit"
                            disabled={!isSignupValid}
                            className={`w-full font-semibold py-2 rounded transition ${isSignupValid
                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Register
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSigninSubmit(handleSignin)}>
                        <h2 className="text-xl font-semibold mb-6 text-gray-900">Sign in with phone</h2>
                        <label className="block text-gray-700 mb-1">Phone Number</label>
                        <div className="flex mb-2">
                            <select
                                className="rounded-l-md max-w-[100px] border bg-gray-100 px-3 py-2"
                                {...signinRegister("country")}
                            >
                                {countryCodes.map((c, i) => (
                                    <option key={i} value={c.code}>
                                        {c.code} {c.country}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                className="flex-1 rounded-r-md border-t border-b border-r px-3 py-2"
                                {...signinRegister("phone")}
                                placeholder="Phone number"
                            />
                        </div>
                        {signinErrors.phone && (
                            <p className="text-red-500 text-sm mb-2">{signinErrors.phone.message}</p>
                        )}

                        <button
                            type="submit"
                            disabled={!isSigninValid}
                            className={`w-full font-semibold py-2 rounded transition ${isSigninValid
                                ? "bg-blue-500 hover:bg-blue-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            Send OTP
                        </button>
                    </form>
                )}
            </div>

            <p className="text-xs text-gray-400 mt-6 text-center max-w-sm">
                By continuing, you agree to our{" "}
                <a href="#" className="text-blue-600 underline">
                    Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 underline">
                    Privacy Policy
                </a>
                .
            </p>
        </div>
    );
}