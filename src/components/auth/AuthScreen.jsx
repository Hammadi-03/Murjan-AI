import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Loader2, Eye, EyeOff } from 'lucide-react';

export default function AuthScreen({ onLogin, onRegister }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isLogin) {
        const result = await onLogin(formData.username, formData.password);
        if (!result.success) setMessage({ type: 'error', text: result.error });
      } else {
        const result = await onRegister(formData.username, formData.password, formData.email);
        if (result.success) {
          setIsLogin(true);
          setMessage({ type: 'success', text: 'Account created perfectly! Please log in.' });
        } else {
          setMessage({ type: 'error', text: result.error });
        }
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const inputClasses = "w-full bg-[#343b54]/60 border border-[#434b66]/50 focus:border-indigo-400 rounded-full py-3.5 pl-12 pr-4 text-white placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-indigo-400/20";

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#2a3048] to-[#171a27] text-white font-sans selection:bg-indigo-500/30">
      
      <div className="w-full max-w-md relative z-10 flex flex-col items-center">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="text-[32px] md:text-[38px] font-bold leading-tight tracking-tight mb-4"
          >
            Meet your AI <br/> companion
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-[#aeb5cc] text-[15px] leading-relaxed max-w-[320px] mx-auto"
          >
            Create an account or sign in to keep all your conversations and to generate images
          </motion.p>
        </div>

        {/* Form Section */}
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'login' : 'register'}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-3"
              >
                {!isLogin && (
                  <div className="relative group/field">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/field:text-indigo-300 transition-colors" size={18} />
                    <input 
                      type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email address" required={!isLogin}
                      className={inputClasses}
                    />
                  </div>
                )}

                <div className="relative group/field">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/field:text-indigo-300 transition-colors" size={18} />
                  <input 
                    type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required
                    className={inputClasses}
                  />
                </div>

                <div className="relative group/field">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/field:text-indigo-300 transition-colors" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required
                    className={inputClasses}
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence>
              {message && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className={`text-[13px] px-4 py-3 rounded-2xl flex items-center gap-2 mt-1 border ${
                    message.type === 'success' 
                      ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' 
                      : 'text-red-400 bg-red-500/10 border-red-500/20'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${message.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                  <p>{message.text}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit" disabled={loading}
              className="mt-2 w-full bg-[#3b4361] hover:bg-[#464e70] border border-[#525a7a]/50 text-white font-medium py-3.5 rounded-full transition-colors duration-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Toggle Login/Register (Styled like the "Cancel" button in the screenshot) */}
          <div className="mt-6 text-center">
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); setMessage(null); }}
              className="text-[#aeb5cc] hover:text-white text-[13px] font-medium transition-colors duration-200 py-2 px-4"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
