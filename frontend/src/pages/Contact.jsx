import React, { useState } from 'react';
import { PhoneCall, MapPin, Clock, Navigation, Send } from 'lucide-react';
import { useLanguage } from '../components/LanguageProvider';

const Contact = () => {
  const { t } = useLanguage();
  
  const today = new Date();
  const hour = today.getHours();
  const day = today.getDay(); // 0 = Sunday
  const isOpen = day !== 0 && hour >= 10 && hour < 20;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    education: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hi, I want to enroll in the Phone Repair Course.%0A%0A*Name*: ${formData.name}%0A*Phone*: ${formData.phone}%0A*Email*: ${formData.email}%0A*Education*: ${formData.education}%0A*Message*: ${formData.message}`;
    window.open(`https://wa.me/917477090100?text=${message}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* Left Side: Contact Information */}
        <div className="lg:w-1/2 flex flex-col">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            {t('contact', 'title')}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-8 max-w-md">
            {t('contact', 'subtitle')}
          </p>

          <div className="space-y-8">
            {/* Phone & WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <PhoneCall className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{t('contact', 'callOrChat')}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-3">+91 74770 90100</p>
                <div className="flex gap-3">
                  <a 
                    href="https://wa.me/917477090100?text=Hi! I need help from MobileCareTech."
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-[#25D366] hover:text-[#128C7E] transition-colors"
                  >
                    WhatsApp Us
                  </a>
                  <span className="text-slate-300 dark:text-slate-700 text-xs">|</span>
                  <a 
                    href="tel:+917477090100"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 transition-colors"
                  >
                    Call Shop
                  </a>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{t('contact', 'businessHours')}</h3>
                <div className="flex items-center gap-2 mb-1">
                  {isOpen ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {t('contact', 'openNow')}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                      {t('contact', 'closed')}
                    </span>
                  )}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-1.5">{t('contact', 'monSat')}</p>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">{t('contact', 'sunday')}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="mt-1">
                <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{t('contact', 'visitMct')}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs">High School Chowk, Hatta</p>
                <p className="text-slate-600 dark:text-slate-400 text-xs mt-0.5">Balaghat, MP 481226</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=High+School+Chowk,+Hatta,+Balaghat,+Madhya+Pradesh+481226"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" /> {t('contact', 'getDirections')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Course Registration Form */}
        <div className="lg:w-1/2">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Enroll in Repair Course
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              Join our professional smartphone repair training institute. Fill out the form below and kickstart your career with expert guidance.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-xs font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-xs font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                    placeholder="+91 00000 00000"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-medium text-slate-700 dark:text-slate-300">Email Address (Optional)</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="education" className="text-xs font-medium text-slate-700 dark:text-slate-300">Educational Qualification</label>
                <select 
                  id="education" 
                  name="education" 
                  required
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors text-slate-900 dark:text-slate-100"
                >
                  <option value="" disabled>Select highest qualification</option>
                  <option value="10th">10th Pass</option>
                  <option value="12th">12th Pass</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Post-Graduate">Post-Graduate</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-xs font-medium text-slate-700 dark:text-slate-300">Why do you want to join? (Optional)</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-colors resize-none"
                  placeholder="Tell us a bit about yourself..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                Submit Application
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;

