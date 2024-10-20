import React, { useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../utils/api';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Register = () => {
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

    const navigate = useNavigate();

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        if (name === 'phoneNo' && (value.length > 10 || !/^\d*$/.test(value))) {
            return ;
        }

        if(name==='aadharNo' && (value.length>12)) {
            return ;
        }

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }, []);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const { firstName, email, phoneNo, aadharNo, password, confirmPassword } = formData;
        if (!firstName || !email || !phoneNo || !aadharNo || !password || !confirmPassword) {
            toast.error("Please fill in all required fields.");
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
        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validateForm()) {
            try {
                const response = await api.post('/api/register', formData);
                if(response.status===201) {
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
            } catch(error) {
                if (error.response && error.response.data && error.response.data.message) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('Server Error. Please try again later.');
                }
            }
        }
    };

    return (
        <section className='form-container'>
            <div>
                <h1>REGISTER!!</h1>
            </div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="name">
                        <label htmlFor='firstName'>
                            First Name<span className="text-red-500">*</span>
                            <input type="text" name="firstName" placeholder="Enter your first name" 
                            value={formData.firstName} onChange={handleChange} />
                        </label>
                        <label htmlFor='middleName'>
                            Middle Name:
                            <input type="text" name="middleName" placeholder="Enter your middle name"
                            value={formData.middleName} onChange={handleChange} />
                        </label>
                        <label htmlFor='lastName'>
                            Last Name:
                            <input type="text" name="lastName" placeholder="Enter your last name"
                            value={formData.lastName} onChange={handleChange} />
                        </label>
                    </div>

                    <div className="email">
                        <label htmlFor='email'>
                            Email<span className="text-red-500">*</span>
                            <input type="email" name="email" placeholder="Enter your email"
                            value={formData.email} onChange={handleChange} />
                        </label>
                    </div>

                    <div className="phoneNo">
                        <label htmlFor='phoneNo'>
                            Phone No<span className="text-red-500">*</span>
                            <input type="tel" name="phoneNo" placeholder="Enter your phone number" 
                            value={formData.phoneNo} onChange={handleChange} />
                        </label>
                    </div>

                    <div className="aadharNo">
                        <label htmlFor='aadharNo'>
                            Aadhar No<span className="text-red-500">*</span>
                            <input type="text" name="aadharNo" placeholder="Enter your aadhar" 
                            value={formData.aadharNo} onChange={handleChange} />
                        </label>
                    </div>

                    <div className="password">
                        <label htmlFor='password'>
                            Password<span className="text-red-500">*</span>
                            <input type="password" name="password" placeholder="Enter your password" 
                            value={formData.password} onChange={handleChange} />
                        </label>
                    </div>

                    <div className="confirmPassword">
                        <label htmlFor='confirmPassword'>
                            Confirm Password<span className="text-red-500">*</span>
                            <input type="password" name="confirmPassword" placeholder="Confirm your password" 
                            value={formData.confirmPassword} onChange={handleChange} />
                        </label>
                    </div>

                    <div className="submitBtn">
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Register;
