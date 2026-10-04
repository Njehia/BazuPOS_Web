import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Does Bazu POS work when the internet is completely disconnected?',
    answer:
      'Yes, 100%. Bazu POS was architected specifically for Kenyan retail environments where ISP cables get accidentally cut or local network towers experience outages. All product lookups, barcode scans, cash drawer kicks, thermal receipt prints, and customer credit ledger updates occur entirely on your local PC. When the internet connection restores, your receipts and shift totals silently sync up to the cloud without interrupting ongoing sales.',
  },
  {
    question: 'What thermal receipt printers are supported?',
    answer:
      'Any standard ESC/POS thermal receipt printer is supported natively. This includes both 58mm compact portable rolls and 80mm heavy-duty counter printers manufactured by Epson, Xprinter, Sunmi, Rongta, POSBANK, Star Micronics, and generic OEM manufacturers. Bazu POS connects through direct USB, Bluetooth, Network IP, or the standard Windows print spooler with automated 24V cash drawer kick and auto-paper cutter triggers.',
  },
  {
    question: 'How does M-Pesa reconciliation work?',
    answer:
      'Cashiers can ring up sales with M-Pesa Buy Goods Till or Paybill. During checkout, the cashier enters the 10-character Safaricom transaction reference code (e.g., SHG8294LK2) or copies it directly. Bazu POS checks for duplicates to prevent unscrupulous cashiers from re-using previous customer SMS alerts. On daily shift close, the system generates an itemized M-Pesa ledger that matches exactly against your Safaricom merchant statement.',
  },
  {
    question: 'Can I install it on multiple Windows laptops or Android phones?',
    answer:
      'Yes! You can install the standalone Windows application on as many counter laptops or desktops as you need. Cashiers sign in using their unique 4-digit PINs. Store owners and managers can install the Android WebAPK or open the web dashboard on iPhones/iPads to view live sales turnover, active drawer float, and low-stock alerts in real-time from anywhere in the world.',
  },
  {
    question: 'What happens if my PC crashes or gets stolen?',
    answer:
      'Your business is protected by two layers of safety. First, Bazu POS provides an instantaneous one-click encrypted local database backup (JSON/SQLite archive) that you can store on a thumb drive. Second, if you are enrolled in Cloud Sync Pro, every completed receipt and shift log is synced to your secure multi-tenant cloud vault in real-time. Simply log in to a new PC, enter your store credentials, and your entire inventory and sales history restores within seconds.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-slate-950/70 relative border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase mb-2">
            06. Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Syne',sans-serif]">
            Everything You Need to Know About Bazu POS.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            Clear, straightforward answers about offline resilience, printer hardware, and Kenyan payment flows.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-900 transition-colors focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="text-sm font-bold text-white">Have a specific question about your shop setup?</div>
            <div className="text-xs text-slate-400 mt-0.5">
              Talk directly with founder and developer Titus Njehia via WhatsApp or Email.
            </div>
          </div>
          <a
            href="https://wa.me/254722000000?text=Hello%20Titus,%20I%20have%20a%20question%20about%20Bazu%20POS."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors whitespace-nowrap"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
