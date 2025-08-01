/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { ChevronRight, User, Hospital, Smartphone, Mail, Key, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    role: 'doctor',
  });
  
  const [activeTab, setActiveTab] = useState<'doctor' | 'pharmacy'>('doctor');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/user', formData);
      toast.success('✅ Account created successfully!');
      console.log(res.data);
      setFormData({
        name: '',
        phone: '',
        email: '',
        password: '',
        role: 'doctor',
      });
    } catch (err: any) {
      toast.error(`❌ ${err.response?.data?.error || 'Something went wrong'}`);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Join MedMind</h1>
          <p className="text-slate-600">Create your professional account</p>
        </div>
        
        {/* back button */}
        <div className="mb-4">
          <button 
        onClick={() => router.push('/')}
        className="flex items-center text-blue-600 hover:text-blue-800 transition"
      >
        <ChevronLeft size={20} className="mr-1" /> Back
      </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          {/* Role Tabs */}
          <div className="flex border-b">
            <button
              type="button"
              onClick={() => {
                setActiveTab('doctor');
                setFormData(prev => ({ ...prev, role: 'doctor' }));
              }}
              className={`flex-1 py-4 text-center font-medium flex items-center justify-center gap-2 ${
                activeTab === 'doctor'
                  ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <User size={18} /> Doctor
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('pharmacy');
                setFormData(prev => ({ ...prev, role: 'pharmacy' }));
              }}
              className={`flex-1 py-4 text-center font-medium flex items-center justify-center gap-2 ${
                activeTab === 'pharmacy'
                  ? 'text-purple-600 border-b-2 border-purple-500 bg-purple-50'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Hospital size={18} /> Pharmacy
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">
                {activeTab === 'doctor' ? "Doctor's Name" : "Pharmacy Name"} *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="text-slate-400" size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={activeTab === 'doctor' ? "Dr. Jane Smith" : "MedLife Pharmacy"}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Phone Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Smartphone className="text-slate-400" size={18} />
                </div>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-slate-400" size={18} />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">
                Create Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Key className="text-slate-400" size={18} />
                </div>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className="input-field pl-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="btn-primary mt-2"
            >
              Create Account <ChevronRight size={18} className="ml-2" />
            </Button>
            
            <div className="text-center pt-4 border-t border-slate-100 mt-4">
              <p className="text-slate-600 text-sm">
                Already have an account? 
                <a href="#" className="text-blue-600 font-medium ml-1 hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
        
        <div className="mt-6 text-center text-slate-500 text-sm">
          <p>By creating an account, you agree to our Terms of Service</p>
          <p>and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
}