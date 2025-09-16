import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../utils/api';
import { UserContext } from '../../contexts/UserContext';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getErrorMessage, mapFriendlyAuthMessage } from '../../utils/error';

const Login = () => {
  const navigate = useNavigate();
  const { setisLogedin, setuserDetail } = useContext(UserContext);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    if (!formData.password.trim()) newErrors.password = 'Password is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const response = await loginUser(formData);
      localStorage.setItem("token", response.data.accessToken);
      if (response.data?.refreshToken) {
        localStorage.setItem("refreshToken", response.data.refreshToken);
      }
      if (response.success) {
        setisLogedin(true);
        setuserDetail(response.data.user);
        navigate('/');
      } else {
        toast.error(mapFriendlyAuthMessage(response.message || 'Login failed!', response.status));
      }
    } catch (error) {
      console.error('Login error:', error);
      const raw = getErrorMessage(error, 'Login failed.');
      const friendly = mapFriendlyAuthMessage(raw, error?.response?.status);
      toast.error(friendly);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111] text-white"
    >
      <div className="bg-[#1e1e1e] border border-gray-700 p-8 rounded-2xl shadow-lg w-full max-w-md mx-4 sm:mx-0 animate-fade-in">
        <div className="text-center mb-6">
          <img
            src="/assets/logos/logo.png"
            alt="Logo"
            className="w-14 h-14 mx-auto mb-2"
          />
          <h2 className="text-3xl font-semibold">Welcome Back</h2>
          <p className="text-sm text-gray-400">Login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-1 rounded-lg bg-[#2c2c2c] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.password && (
              <p className="text-sm text-red-400 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50"
          >
            {loading && <Loader2 className="animate-spin h-5 w-5" />}
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          Don’t have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            className="text-purple-400 font-medium cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
