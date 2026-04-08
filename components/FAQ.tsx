"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  MapPin, 
  ShieldCheck, 
  CreditCard, 
  UserRound, 
  Route, 
  Plane,
  Briefcase
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSection {
  title: string;
  icon: any;
  items: FAQItem[];
}

const faqData: FAQSection[] = [
  {
    title: "Book a Ride",
    icon: MapPin,
    items: [
      {
        question: "Ride kitne time me aayegi?",
        answer: "Ride ka ETA (Estimated Time of Arrival) driver ki aapke pickup location se doori par depend karta hai. Обычно Mumbai me 5-10 minute me cab mil jati hai."
      },
      {
        question: "Ride cancel karne par charge lagega?",
        answer: "Agar aap driver ke pickup point par pahunchne ke baad ya booking ke 5 minute baad cancel karte hain, toh ek chhota cancellation fee lag sakta hai."
      },
      {
        question: "Ride advance me book kar sakte hain?",
        answer: "Haan, Ryngo app me 'Schedule for Later' ka option hai jisse aap apni ride pehle se book kar sakte hain."
      }
    ]
  },
  {
    title: "Safety",
    icon: ShieldCheck,
    items: [
      {
        question: "Late night safe ride available hai?",
        answer: "Bilkul! Ryngo 24/7 operate karta hai. Saari rides GPS-tracked hoti hain aur drivers background-verified hain."
      },
      {
        question: "SOS button kahan hai?",
        answer: "Ride ke dauran app screen par ek red SOS button dikhta hai jise dabate hi hamari emergency response team active ho jati hai."
      },
      {
        question: "Family ko trip share kaise karun?",
        answer: "App me 'Share Trip Status' ka option hai jisse aap WhatsApp ya SMS ke zariye apni live location kisi ko bhi bhej sakte hain."
      }
    ]
  },
  {
    title: "Fare & Payments",
    icon: CreditCard,
    items: [
      {
        question: "Fare kitna lagega Dadar se Bandra?",
        answer: "Estimated fare distance aur vehicle type par depend karta hai. Mini/Taxi ke liye लगभग ₹22.70/km, Sedan ke liye ₹25.70/km, aur XL ke liye ₹32/km ka base rate hai. Prime rides ₹22.70 se ₹32/km ke range me hoti hain."
      },
      {
        question: "Cash chalega?",
        answer: "Haan, Ryngo me Cash, UPI (GPay, PhonePe, Paytm), aur Wallet payments - sab support karte hain."
      },
      {
        question: "Toll charge included hai kya?",
        answer: "Base fare me toll charges shamil nahi hote. Agar aapka route toll (jaise Sea Link ya Mulund Check Naka) se guzarta hai, toh woh extra hoga."
      }
    ]
  },
  {
    title: "Mumbai Routes",
    icon: Route,
    items: [
      {
        question: "Western Express Highway pe traffic kitna hai?",
        answer: "Ryngo AI live traffic monitoring use karta hai. WEH par peak hours me traffic zyada ho sakta hai, hum hamesha fastest alternative route suggest karte hain."
      },
      {
        question: "Bandra Kurla Complex (BKC) ke liye fastest ride kaunsi?",
        answer: "BKC ke liye hamari 'Ryngo Prime' ya 'Sedan' rides best hain, jo comfort ke saath-saath optimized routes provide karti hain."
      }
    ]
  },
  {
    title: "Airport & Connectivity",
    icon: Plane,
    items: [
      {
        question: "Airport Terminal 1 ya Terminal 2 drop available hai?",
        answer: "Haan, hum Mumbai ke dono terminals (T1 Primary/Domestic aur T2 International) par drop aur pickup provide karte hain."
      },
      {
        question: "Metro/Local station ke paas pickup possible hai?",
        answer: "Bilkul! Humne special markers lagaye hain major stations ke bahar taaki aapko driver dhundne me pareshani na ho."
      }
    ]
  },
  {
    title: "Driver Support",
    icon: UserRound,
    items: [
      {
        question: "Driver call kyun nahi utha raha?",
        answer: "Kabhi-kabhi driver gadi chala rahe hote hain isliye call nahi utha paate. Aap unhe chat par message chhod sakte hain ya 2 min baad phir try karein."
      },
      {
        question: "Driver ne extra cash manga toh kya karein?",
        answer: "App me dikhaye gaye fare se zyada paise na dein. Agar aisa hota hai, toh app me 'Report Issue' tab use karein ya support@ryngo.in par complaint karein."
      }
    ]
  },
  {
    title: "Corporate & Daily Commute",
    icon: Briefcase,
    items: [
      {
        question: "Daily office ride pass hai?",
        answer: "G haan! Humare regular commuters ke liye special 'Commute Passes' hain jinse aap monthly savings kar sakte hain."
      },
      {
        question: "Office reimbursement bill milega?",
        answer: "Har ride ke baad aapke registered email par GST invoice bhej di jati hai, jo reimbursement ke liye valid hai."
      }
    ]
  }
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-4 rounded-lg"
      >
        <span className="font-medium text-gray-800">{item.question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-4 text-gray-600 text-sm leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#0B4619] mb-12">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-8">
          {faqData.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#0B4619]/10 rounded-lg text-[#0B4619]">
                  <section.icon size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
              </div>
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                {section.items.map((item, i) => (
                  <FAQAccordion key={i} item={item} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center p-8 bg-[#f8fafc] rounded-2xl border border-dashed border-gray-300">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <a 
            href="mailto:support@ryngo.in" 
            className="inline-flex items-center justify-center px-6 py-3 bg-[#0B4619] text-white font-bold rounded-full hover:bg-[#072a0f] transition-all"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
