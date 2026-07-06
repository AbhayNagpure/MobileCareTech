import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Phone, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../LanguageProvider';

const ReviewsSection = () => {
  const { t } = useLanguage();
  const [feedbacks, setFeedbacks] = useState([
    { id: 1, name: "Rahul S.", text: "Great service! Fixed my screen perfectly and it works like new." },
    { id: 2, name: "Priya M.", text: "Very professional staff and affordable prices. Highly recommend." },
    { id: 3, name: "Amit K.", text: "Quick battery replacement. I didn't have to wait long at all!" }
  ]);
  const [formData, setFormData] = useState({ name: '', message: '' });

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setFeedbacks([{ id: Date.now(), name: formData.name, text: formData.message }, ...feedbacks]);
    setFormData({ name: '', message: '' });
  };

  return (
    <section className="py-20 px-4 bg-muted/20 border-t border-border transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Reviews Grid */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-10 text-center">
            {t('reviews', 'title')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {feedbacks.slice(0, 3).map((fb, idx) => (
              <motion.div 
                key={fb.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex text-yellow-500 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500" />)}
                  </div>
                  <p className="text-muted-foreground mb-6 font-medium leading-relaxed">"{fb.text}"</p>
                </div>
                <div className="font-medium text-sm text-foreground">- {fb.name}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Store Info + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          
          {/* Store Info */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 bg-primary rounded-3xl p-8 md:p-10 text-primary-foreground flex flex-col justify-center gap-8 shadow-xl shadow-primary/10"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-2">{t('reviews', 'visitShop')}</h3>
              <p className="text-primary-foreground/80">{t('reviews', 'visitShopDesc')}</p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-8 md:gap-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-primary-foreground/70 uppercase tracking-wider font-semibold mb-0.5">{t('reviews', 'location')}</div>
                  <div className="font-medium text-sm md:text-base">High School Chowk, Hatta</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-primary-foreground/70 uppercase tracking-wider font-semibold mb-0.5">{t('reviews', 'hours')}</div>
                  <div className="font-medium text-sm md:text-base">10:00 AM - 7:00 PM</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-primary-foreground/70 uppercase tracking-wider font-semibold mb-0.5">{t('reviews', 'callUs')}</div>
                  <div className="font-medium text-sm md:text-base">+91 74770 90100</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Leave a Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-card rounded-3xl p-8 md:p-10 border border-border shadow-sm flex flex-col justify-center"
          >
            <h3 className="text-xl font-semibold text-foreground mb-2">{t('reviews', 'leaveReview')}</h3>
            <p className="text-sm text-muted-foreground mb-6">{t('reviews', 'leaveReviewDesc')}</p>
            
            <form className="space-y-4" onSubmit={handleFeedbackSubmit}>
              <input 
                required 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder={t('reviews', 'yourName')} 
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-shadow" 
              />
              <textarea 
                required 
                value={formData.message} 
                onChange={e => setFormData({...formData, message: e.target.value})} 
                rows="3" 
                placeholder={t('reviews', 'whatDidYouThink')} 
                className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-shadow"
              ></textarea>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-5 rounded-xl transition-colors shadow-sm text-sm">
                {t('reviews', 'submitReview')} <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
