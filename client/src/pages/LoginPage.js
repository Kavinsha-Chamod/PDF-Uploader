import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import authMiddleware from '../middlewares/authMiddleware';
import './pagesCss/LoginPage.css'; 
import NavBar from '../components/NavBar';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().required('Password is required')
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { setUser } = useContext(authMiddleware);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email: data.email, password: data.password });
      localStorage.setItem('token', response.data.token);
      setUser({ token: response.data.token });
      window.location.href = "/pdf";
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setLoginError('Incorrect email or password');
      } else {
        setLoginError('Incorrect email or password');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <NavBar />
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            {...register('email')}
            placeholder="Enter your email address"
            required
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register('password')}
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        {loginError && <p className="error-message">{loginError}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
