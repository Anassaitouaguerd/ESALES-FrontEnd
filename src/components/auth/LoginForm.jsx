import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../common/Input';
import Button from '../common/Button';
import { userApi } from '../../api/userApi';
import './LoginForm.css';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [name]: null
      }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      setLoginError(null);
      
      await userApi.login({
        email: formData.email,
        password: formData.password
      });
      
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      
      if (err.response && err.response.status === 401) {
        setLoginError('Invalid email or password');
      } else {
        setLoginError('Login failed. Please try again later.');
      }
      
      console.error('Login error:', err);
    }
  };
  
  return (
    <div className="login-form">
      <form onSubmit={handleSubmit} className="login-form__form">
        <h2 className="login-form__title">Sign In</h2>
        
        {loginError && (
          <div className="login-form__error-message">
            {loginError}
          </div>
        )}
        
        <div className="login-form__field">
          <Input
            type="email"
            id="email"
            name="email"
            label="Email Address"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
        </div>
        
        <div className="login-form__field">
          <Input
            type="password"
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
        </div>
        
        <div className="login-form__actions">
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </div>
        
        <div className="login-form__links">
          <Link to="/forgot-password" className="login-form__link">
            Forgot password?
          </Link>
          <p className="login-form__signup">
            Don't have an account?{' '}
            <Link to="/register" className="login-form__link">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;