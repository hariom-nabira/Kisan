import React, { useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaEye, FaEyeSlash } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNo: '',
        aadharNo: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        if (name === 'phoneNo' && (value.length > 10 || !/^\d*$/.test(value))) {
            return;
        }

        if (name === 'aadharNo' && value.length > 12) {
            return;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }, []);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
    };
    
    const validateForm = () => {
        const { firstName, email, phoneNo, aadharNo, password, confirmPassword } = formData;
        if (!firstName || !email || !phoneNo || !aadharNo || !password || !confirmPassword) {
            toast.error("Please fill in all fields.");
            return false;
        }
        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email address.");
            return false;
        }
        if (phoneNo.length !== 10) {
            toast.error("Phone number must be 10 digits long.");
            return false;
        }
        if (aadharNo.length !== 12) {
            toast.error("Aadhar number must be 12 digits long.");
            return false;
        }
        if (!validatePassword(password)) {
            toast.error("Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return false;
        }
        return true;
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await api.post('/api/register', formData);
                if (response.status === 201) {
                    toast.success("Registration successful!");
                    setFormData({
                        firstName: '',
                        middleName: '',
                        lastName: '',
                        email: '',
                        phoneNo: '',
                        aadharNo: '',
                        password: '',
                        confirmPassword: ''
                    });
                    navigate('/login');
                }
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('Server Error. Please try again later.');
                }
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl w-full space-y-8 flex bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                <div className="w-1/3 hidden lg:block relative">
                    <img
                        className="absolute inset-0 h-full w-full object-cover"
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                        alt="Agriculture field"
                    />
                    <div className="absolute inset-0 bg-green-700 bg-opacity-25"></div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="text-white text-4xl font-bold text-center px-6">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <FaLeaf className="inline-block mb-2 text-6xl" />
                            </motion.div>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                            >
                                Join Kisan
                            </motion.p>
                        </div>
                    </motion.div>
                </div>
                <div className="w-full lg:w-2/3 px-8 py-12 bg-white">
                    <div className="text-center">
                        <motion.h2
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-6 text-3xl font-extrabold text-gray-900"
                        >
                            Create Your Account
                        </motion.h2>
                        <motion.p
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="mt-2 text-sm text-gray-600"
                        >
                            Join our farming community
                        </motion.p>
                    </div>
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-8 space-y-6"
                        onSubmit={handleSubmit}
                    >
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                <div className="relative">
                                    <label htmlFor="firstName" className="sr-only">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-green-300"
                                        placeholder="First Name*"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="relative">
                                    <label htmlFor="middleName" className="sr-only">
                                        Middle Name
                                    </label>
                                    <input
                                        id="middleName"
                                        name="middleName"
                                        type="text"
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-green-300"
                                        placeholder="Middle Name"
                                        value={formData.middleName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="relative">
                                    <label htmlFor="lastName" className="sr-only">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-green-300"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="relative">
                                <label htmlFor="email" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-green-300"
                                    placeholder="Email*"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="phoneNo" className="sr-only">
                                    Phone Number
                                </label>
                                <input
                                    id="phoneNo"
                                    name="phoneNo"
                                    type="text"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-green-300"
                                    placeholder="Phone Number*"
                                    value={formData.phoneNo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="aadharNo" className="sr-only">
                                    Aadhar Number
                                </label>
                                <input
                                    id="aadharNo"
                                    name="aadharNo"
                                    type="text"
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-green-300"
                                    placeholder="Aadhar Number*"
                                    value={formData.aadharNo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-green-300"
                                    placeholder="Password*"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <span onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <div className="relative">
                                <label htmlFor="confirmPassword" className="sr-only">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="appearance-none rounded-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm transition duration-300 ease-in-out hover:border-green-300"
                                    placeholder="Confirm Password*"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out"
                            >
                                Register
                            </button>
                        </div>
                        <div className="text-center text-sm">
                            <p className="text-gray-600">
                                Already have an account? 
                                <span className="text-green-600 cursor-pointer hover:underline" onClick={() => navigate('/login')}> Sign in</span>
                            </p>
                        </div>
                    </motion.form>
                    <ToastContainer />
                </div>
            </motion.div>
        </div>
    );
}
