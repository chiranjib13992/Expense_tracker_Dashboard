import React, { useState } from 'react';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User, // For Name input
    Phone, // For Phone input
    Plus,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';
import AuthService from '../services/AuthService';
import { useNavigate } from "react-router-dom";


// Google Logo SVG (reused for consistency, though not strictly needed for sign-up)
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.52-.19-2.25H12v4.26h5.92c-.26 1.37-.97 2.54-1.9 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.76c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.9 7.7 23 12 23z"
        />
        <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        />
        <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.1 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
        <path fill="none" d="M1 1h22v22H1z" />
    </svg>
);

// Facebook Logo SVG (reused for consistency)
const FacebookIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 2.04C6.48 2.04 2 6.52 2 12.04C2 17.56 6.48 22.04 12 22.04C17.52 22.04 22 17.56 22 12.04C22 6.52 17.52 2.04 12 2.04ZM14.06 12.82H12.63V18.4H10.13V12.82H8.8V10.7H10.13V9.2C10.13 7.9 10.96 7.08 12.2 7.08L14.06 7.1V9.2H12.9C12.38 9.2 12.16 9.51 12.16 10.03V10.7H14.06L13.7 12.82H12.16V12.82H14.06V12.82Z"
            fill="#1877F2"
        />
    </svg>
);

export default function SignUp() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log('Sign Up attempt:', { name, phone, email, password });

        try {
            await AuthService.SignUp({ name, phone, email, password })
                .then(res => {
                    if (res) {
                        navigate("/login");
                    }
                }).catch(err => console.error(err));
        } catch (error) {
            console.error(error);
        }
        // Add your sign-up logic here (e.g., API call)
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Column (Decorative) - Reused from Login */}
            <div className="hidden md:flex flex-1 bg-gray-50 flex-col justify-between p-12">
                <div className="mb-12">
                    <h1 className="text-2xl font-bold text-gray-900">FINOTIC</h1>
                </div>

                <div className="flex items-center justify-evenly flex-grow w-full">
                    <div className="bg-white p-4 rounded-xl shadow-lg w-48">
                        <span className="text-xs text-gray-500">CURRENT BALANCE</span>
                        <div className="flex items-center mt-1">
                            <span className="text-2xl font-bold text-gray-900">$24,359</span>
                            <div className="ml-2 w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div
                        className="w-56 h-56 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                            background:
                                'conic-gradient(#FDBA74 0% 25%, #60A5FA 25% 60%, #86EFAC 60% 100%)',
                        }}
                    >
                        <div className="w-40 h-40 rounded-full bg-gray-50 flex flex-col items-center justify-center shadow-inner">
                            <span className="text-3xl font-bold text-gray-900">34%</span>
                            <span className="text-sm text-gray-600">Food</span>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col items-center">
                        <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                            <Plus size={24} />
                        </button>
                        <span className="text-sm font-medium text-gray-900 mt-2">
                            New transaction
                        </span>
                        <span className="text-xs text-gray-500">
                            or upload .xls file
                        </span>
                    </div>
                </div>

                <div className="mt-auto">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back!</h2>
                    <p className="text-gray-600 mt-2 text-sm">
                        Start managing your finance faster and better
                        <br />
                        Start managing your finance faster and better
                    </p>
                    <div className="flex items-center gap-4 mt-6">
                        <button>
                            <ChevronLeft size={20} />
                        </button>
                        <div className="flex gap-2">
                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                            <div className="w-4 h-2 rounded-full bg-gray-900"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                        </div>
                        <button>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column (Sign Up Form) */}
            <div className="w-full md:flex-1 flex items-center justify-center p-8 md:p-12 bg-white">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Create an account
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Or{' '}
                            <a
                                href="signup"
                                className="relative font-semibold text-indigo-500 hover:text-indigo-600
             no-underline !no-underline decoration-transparent
             after:content-[''] after:absolute after:left-0 after:-bottom-0.5
             after:h-[2px] after:w-0
             after:bg-gradient-to-r after:from-indigo-400 after:to-indigo-700
             after:rounded-full
             after:transition-all after:duration-300
             hover:after:w-full"
                            >
                                Sign in to your existing account
                            </a>
                        </p>
                    </div>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSignUp} className="space-y-5">
                        {/* Name Input */}
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Full Name
                            </label>
                            <div className="mt-1 relative">
                                <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Chiranjib Mohapatra"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone Input */}
                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Phone Number
                            </label>
                            <div className="mt-1 relative">
                                <Phone size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                <input
                                    id="phone"
                                    type="tel" // Use type="tel" for phone numbers
                                    placeholder="+91 (555) 123-4567"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-3.5 text-gray-400"
                                />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-3.5 text-gray-400"
                                />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-3.5 text-gray-400"
                                />
                                <input
                                    id="confirm-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-3 border border-gray-300 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Sign Up Button */}
                        <button
                            type="submit"
                            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 border-t border-gray-300"></div>
                        <span className="px-4 text-gray-500 text-sm">
                            Or sign up with
                        </span>
                        <div className="flex-1 border-t border-gray-300"></div>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-md transition">
                            <GoogleIcon />
                            Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2.5 rounded-md transition">
                            <FacebookIcon />
                            Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}