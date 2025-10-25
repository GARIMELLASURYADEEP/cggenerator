import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_CONFIG from '../config/api';

function UserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    registrationNumber: '',
    issueDate: new Date().toISOString().split('T')[0], // Today's date
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedDomain] = useState(localStorage.getItem('selectedDomain') || '');

  useEffect(() => {
    if (!selectedDomain) {
      navigate('/');
    }
  }, [selectedDomain, navigate]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.issueDate) {
      newErrors.issueDate = 'Issue date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Get the appropriate backend URL based on environment
      const backendUrl = API_CONFIG.getBaseURL();
      console.log('Backend URL:', backendUrl); // Debug log
      const response = await axios.post(`${backendUrl}/api/certificates`, {
        full_name: formData.fullName,
        email: formData.email,
        domain: selectedDomain,
        registration_number: formData.registrationNumber || null,
        issue_date: formData.issueDate,
      });

      // Store certificate data in localStorage
      localStorage.setItem('certificateData', JSON.stringify(response.data));

      navigate('/certificate');
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error.response?.data?.detail || error.message || 'Failed to generate certificate. Please try again.';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  if (!selectedDomain) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 font-space-grotesk">
            Certificate Details
          </h2>
          <p className="text-gray-600">
            Domain: <span className="font-semibold">{selectedDomain}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-2">
              Registration Number (Optional)
            </label>
            <input
              type="text"
              id="registrationNumber"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter registration number"
            />
          </div>

          <div>
            <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Issue Date *
            </label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.issueDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.issueDate && <p className="mt-1 text-sm text-red-600">{errors.issueDate}</p>}
          </div>

          {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Generating Certificate...' : 'Generate Certificate'}
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-gray-600 hover:text-gray-900 py-2"
        >
          ← Back to Domain Selection
        </button>
      </div>
    </div>
  );
}

export default UserForm;
