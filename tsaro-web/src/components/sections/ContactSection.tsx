"use client"

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function ContactSection({ content }: { content?: any }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = fullName.trim().length > 0 && isValidEmail(email) && message.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([{ 
            name: fullName.trim(), 
            email: email.trim(),
            message: message.trim()
        }]);

      if (error) {
        console.error("Error saving message:", error);
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFullName("");
        setEmail("");
        setMessage("");
      }, 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  let displayHeadline = content?.headline || "Contact Command";
  let displaySubheadline = content?.subheadline || "Initiate a secure dialogue with our executive team. For urgent institutional requirements or bespoke operational inquiries, please provide detailed context.";

  if (displayHeadline.includes("Intelligence Briefs")) {
    displayHeadline = "Contact Command";
  }
  if (displaySubheadline.includes("geopolitical")) {
    displaySubheadline = "Initiate a secure dialogue with our executive team. For urgent institutional requirements or bespoke operational inquiries, please provide detailed context.";
  }

  return (
    <section id="contact-us" className="py-24 px-6 md:px-12 bg-obsidian relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
            
            <div className="bg-charcoal rounded-2xl p-8 sm:p-12 md:p-16 border border-white/10 shadow-2xl relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    <div className="lg:col-span-5 pt-4">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-6 tracking-tight">
                            {displayHeadline}
                        </h2>
                        <p className="text-textLight text-base leading-relaxed mb-8">
                            {displaySubheadline}
                        </p>
                        
                        <div className="space-y-6 font-mono text-xs text-textMuted mt-12">
                            <div className="flex items-start gap-4">
                                <div className="mt-0.5 text-brandRed">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </div>
                                <div>
                                    <span className="block text-white font-bold mb-1 tracking-widest uppercase">Global Operations Center</span>
                                    {content?.address ? <span dangerouslySetInnerHTML={{ __html: content.address.replace(/\n/g, '<br/>') }} /> : <>Suite 600, 6th Floor, Sector A,<br/>Shashilga Court, Ahmadu Bello Way,<br/>Abuja, Nigeria</>}
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-0.5 text-brandRed">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <div>
                                    <span className="block text-white font-bold mb-1 tracking-widest uppercase">Secure Comms</span>
                                    {content?.email || 'info@tsaroglobaldefence.com'}<br/>
                                    {content?.phone || '+234 704 341 9078'}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 bg-obsidian/75 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-xs font-mono font-medium text-textLight uppercase tracking-wider mb-2">Full Name</label>
                                    <input 
                                        type="text" 
                                        id="fullName" 
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required 
                                        placeholder="e.g. Samuel Adeyemi" 
                                        className="w-full px-4 py-3 bg-charcoal/70 border border-white/10 rounded text-white placeholder-textMuted/40 text-sm focus:outline-none focus:border-brandRed transition-colors" 
                                    />
                                </div>

                                <div>
                                    <label htmlFor="corpEmail" className="block text-xs font-mono font-medium text-textLight uppercase tracking-wider mb-2">Email Address</label>
                                    <input 
                                        type="email" 
                                        id="corpEmail" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                        placeholder="official@organization.com" 
                                        className={`w-full px-4 py-3 bg-charcoal/70 border rounded text-white placeholder-textMuted/40 text-sm focus:outline-none transition-colors ${
                                            email.length > 0 && !isValidEmail(email) 
                                                ? 'border-red-500 focus:border-red-500' 
                                                : 'border-white/10 focus:border-brandRed'
                                        }`} 
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label htmlFor="message" className="block text-xs font-mono font-medium text-textLight uppercase tracking-wider mb-2">Secure Message</label>
                                <textarea 
                                    id="message" 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required 
                                    rows={5}
                                    placeholder="Enter your inquiry..." 
                                    className="w-full px-4 py-3 bg-charcoal/70 border border-white/10 rounded text-white placeholder-textMuted/40 text-sm focus:outline-none focus:border-brandRed transition-colors resize-y" 
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={!isFormValid || isSubmitting || success}
                                className={`w-full py-4 rounded text-sm font-semibold tracking-wide uppercase flex items-center justify-center gap-2 transition-all ${
                                    success 
                                        ? 'bg-green-600 text-white cursor-default'
                                        : isFormValid 
                                            ? 'btn-primary-red hover:opacity-90' 
                                            : 'bg-white/10 text-white/40 cursor-not-allowed'
                                }`}
                            >
                                {success ? (
                                    <span>Transmission Successful ✓</span>
                                ) : isSubmitting ? (
                                    <span>Encrypting & Transmitting...</span>
                                ) : (
                                    <span>Initiate Communication</span>
                                )}
                            </button>

                            <p className="text-[11px] text-textMuted text-center font-mono">
                                All communications are encrypted and handled with strict confidentiality.
                            </p>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    </section>
  )
}
