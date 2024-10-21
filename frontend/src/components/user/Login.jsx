import React, { useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../utils/api';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ setTokens }) => {
  const [formData, setFormData] = useState({
    aadharNo: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/login', formData);
      console.log("RESPONSE\n", response);
      if (response.status === 200) {
        console.log("Session Storage Setting Started");
        sessionStorage.setItem('accessToken', response.data.accessToken);
        sessionStorage.setItem('refreshToken', response.data.refreshToken);

        // Update tokens in the parent App component
        setTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });

        navigate("/");
        toast.success("Login successful!");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Server Error. Please try again later.');
      }
    }
  };

  return (
    <section className='form-container'>
      <div>
        <h1>LOGIN</h1>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="aadharNo">
            <label htmlFor='aadharNo'>
              Aadhar No
              <input
                type="text"
                name="aadharNo"
                placeholder="Enter your Aadhar number"
                value={formData.aadharNo}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="password">
            <label htmlFor='password'>
              Password
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="submitBtn">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
