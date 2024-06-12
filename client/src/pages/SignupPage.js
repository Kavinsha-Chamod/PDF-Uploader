import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './pagesCss/SignupPage.css';
import NavBar from '../components/NavBar';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number')
    .matches(/[^\w]/, 'Password must contain a special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:4000/api/auth/signup', { email: data.email, password: data.password });
      window.location.href = '/login';
    } catch (err) {
      alert('Error creating user');
    }
  };

  return (
    <div>
      <NavBar />
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email')}
            placeholder="Enter your email address"
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
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register('confirmPassword')}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
        </div>
        <div className='loginAccount'>
          <Link to='/login'>Already have an account?</Link>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
