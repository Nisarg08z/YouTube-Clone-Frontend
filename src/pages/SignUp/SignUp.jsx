import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../../utils/api';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.username.trim()) newErrors.username = 'Username is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    if (!formData.password.trim()) newErrors.password = 'Password is required.';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await signUpUser(formData);

      if (response.success) {
        toast.success('Sign Up successful!');
        navigate('/login');
      } else {
        toast.error(response.message || 'Sign Up failed!');
      }
    } catch (error) {
      console.error('Sign Up error:', error);
      toast.error(error.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111] text-white">
      <div className="bg-[#1e1e1e] border border-gray-700 p-8 rounded-2xl shadow-lg w-full max-w-md mx-4 sm:mx-0 animate-fade-in">
        <div className="text-center mb-6">
          <img
            src="/assets/logos/logo.png"
            alt="Logo"
            className="w-14 h-14 mx-auto mb-2"
          />
          <h2 className="text-3xl font-semibold">Create Account</h2>
          <p className="text-sm text-gray-400">Join us today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.fullName && <p className="text-sm text-red-400 mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.username && <p className="text-sm text-red-400 mt-1">{errors.username}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-purple-400 font-medium cursor-pointer hover:underline"
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
