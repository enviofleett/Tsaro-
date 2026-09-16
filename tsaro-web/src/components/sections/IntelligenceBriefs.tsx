"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function IntelligenceBriefs({ content }: { content?: any }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  // Basic email validation regex
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isFormValid = fullName.trim().length > 0 && isValidEmail(email);

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    try {
      // 1. Record the lead in Supabase
      const { error } = await supabase
        .from('downloads')
        .insert([{ full_name: fullName.trim(), email: email.trim() }]);

      if (error) {
        console.error("Error saving lead:", error);
        // Continue to let them download anyway, or block them. We'll let them download.
      }

      setSuccess(true);

      // 2. Trigger the PDF download
      const pdfUrl = content?.pdf_url || "/tsaro-strategic-brief.pdf"; 
      
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = "_blank";
      link.download = "Tsaro_Strategic_Brief.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Reset form after a few seconds
      setTimeout(() => {
        setSuccess(false);
        setFullName("");
        setEmail("");
      }, 5000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="intelligence" className="py-24 px-6 md:px-12 bg-obsidian relative">
        <div className="max-w-7xl mx-auto">
            
            <div className="bg-charcoal rounded-2xl p-8 sm:p-12 md:p-16 border border-white/10 shadow-2xl relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    <div className="lg:col-span-6">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight">
                            {content?.headline || "Intelligence Briefs & Policy Research"}
                        </h2>
                        <p className="text-textLight text-base leading-relaxed mb-6">
                            {content?.subheadline || "Stay ahead of the shifting geopolitical and economic landscape. Download our comprehensive analysis on national security frameworks and strategic risk roadmaps."}
                        </p>
                        
                        <div className="space-y-3 font-mono text-xs text-textMuted">
                            <div className="flex items-center gap-2">
                                <span className="text-brandRed font-bold">✓</span> {content?.bullet_1 || "Regional threat-actor profiling and asymmetric risk analysis."}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-brandRed font-bold">✓</span> {content?.bullet_2 || "Critical infrastructure resilience recommendations."}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-brandRed font-bold">✓</span> {content?.bullet_3 || "Direct executive delivery for verified institutional inquiries."}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-6 bg-obsidian/75 backdrop-blur-sm p-8 rounded-xl border border-white/10">
                        <form id="leadCaptureForm" className="space-y-5" onSubmit={handleDownload}>
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
                                <label htmlFor="corpEmail" className="block text-xs font-mono font-medium text-textLight uppercase tracking-wider mb-2">Official / Corporate Email</label>
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
                                {email.length > 0 && !isValidEmail(email) && (
                                    <p className="text-red-500 text-xs mt-1 font-mono">Please enter a valid email address.</p>
                                )}
                            </div>

                            <button 
                                type="submit" 
                                disabled={!isFormValid || isSubmitting || success}
                                className={`w-full py-3.5 rounded text-sm font-semibold tracking-wide uppercase flex items-center justify-center gap-2 transition-all ${
                                    success 
                                        ? 'bg-green-600 text-white cursor-default'
                                        : isFormValid 
                                            ? 'btn-primary-red hover:opacity-90' 
                                            : 'bg-white/10 text-white/40 cursor-not-allowed'
                                }`}
                            >
                                {success ? (
                                    <span>Download Started ✓</span>
                                ) : isSubmitting ? (
                                    <span>Processing...</span>
                                ) : (
                                    <>
                                        <span>Download Strategic Brief</span>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                                        </svg>
                                    </>
                                )}
                            </button>

                            <p className="text-[11px] text-textMuted text-center font-mono">
                                Protected by enterprise data privacy standards. Confidential inquiry handling.
                            </p>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    </section>
  )
}
