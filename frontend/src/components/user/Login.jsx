import React, { useCallback, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import api from '../../utils/api';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({setTokens}) => {
  const [formData, setFormData] = useState({
    aadharNo: '',
    password: ''
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []);

  const validateForm = () => {
    const { aadharNo, password } = formData;
    if (!aadharNo || !password) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    if (aadharNo.length !== 12) {
      toast.error("Aadhar number must be 12 digits long.");
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await api.post('/api/login', formData);
        if (response.status === 200) {
          toast.success("Login successful!");
          
          sessionStorage.setItem('accessToken', response.data.accessToken);
          sessionStorage.setItem('refreshToken', response.data.refreshToken);
          
          setTokens({
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
          });

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
    <section className='form-container'>
      <div>
        <h1>LOGIN</h1>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="aadharNo">
            <label htmlFor='aadharNo'>
              Aadhar No
              <input type="text" name="aadharNo" placeholder="Enter your Aadhar number"
                value={formData.aadharNo} onChange={handleChange} />
            </label>
          </div>

          <div className="password">
            <label htmlFor='password'>
              Password
              <input type="password" name="password" placeholder="Enter your password"
                value={formData.password} onChange={handleChange} />
            </label>
          </div>

          <div className="submitBtn">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  )
}

export default Login;
