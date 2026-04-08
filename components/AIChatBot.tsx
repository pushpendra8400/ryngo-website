"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import { 
  Send, 
  Mic, 
  MicOff,
  X, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Minimize2
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

// Custom Premium Sparkle Icon
function PremiumSparkles({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z" fill="white" />
      <path d="M6 3L6.75 6.25L10 7L6.75 7.75L6 11L5.25 7.75L2 7L5.25 6.25L6 3Z" fill="white" opacity="0.8" />
      <path d="M18 13L18.75 16.25L22 17L18.75 17.75L18 21L17.25 17.75L14 17L17.25 16.25L18 13Z" fill="white" opacity="0.8" />
    </svg>
  );
}

const GREETING = `👋 Ryngo AI par aapka swagat hai!\n\nMain aapki help kar sakta hoon Maharashtra me kahi ka bhi **Fare calculation** karne me ya gadi book karne me. **Bolo bhai, kaise help karu?** ✨`;

function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

export default function AIChatBot() {
  const { 
    pickupAddress, 
    destinationAddress, 
    availableCars, 
    distance, 
    weather: contextWeather 
  } = useBooking();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "greeting", role: "assistant", text: GREETING, timestamp: new Date(2024, 0, 1) },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [isOpen, messages, scrollToBottom]);

  // --- VOICE ENGINE ---
  const toggleListening = useCallback(() => {
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = "hi-IN";
      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) transcript += event.results[i][0].transcript;
        }
        if (transcript) setInput((p) => p + (p ? " " : "") + transcript);
      };
      recognition.start();
    } catch (err) { setIsListening(false); }
  }, [isListening]);

  const handleSpeak = (id: string, text: string) => {
    if (isSpeaking === id) { window.speechSynthesis.cancel(); setIsSpeaking(null); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/[*#]/g, ""));
    const voices = window.speechSynthesis.getVoices();
    const desi = voices.find(v => v.lang.startsWith('hi-') || v.lang.startsWith('en-IN'));
    if (desi) utterance.voice = desi;
    else utterance.lang = "hi-IN";
    utterance.onstart = () => setIsSpeaking(id);
    utterance.onend = () => setIsSpeaking(null);
    window.speechSynthesis.speak(utterance);
  };

  // --- UNIVERSAL OMNISCIENT ENGINE + XL/PRIME ---
  const getFallbackResponse = (userInput: string) => {
    const q = userInput.toLowerCase();
    
    // 1) Ride Booking
    if (q.includes("book") || q.includes("time") || q.includes("cancel") || q.includes("advance") || q.includes("airport")) {
      if (q.includes("airport")) return "Bhai, Ryngo se Airport (T1/T2) drop ekdum aasan hai. Pre-book bhi kar sakte hain taaki flight miss na ho! 🛫";
      if (q.includes("time") || q.includes("duration")) return "Ride aane ka samay driver ki doori par nirbhar karta hai. Обычно 5-10 mins me cab pahunch jati hai. ⏳";
      if (q.includes("cancel")) return "Bhai, agar aap booking ke 5 min baad cancel karte hain, toh thoda charge lag sakta hai driver ke time ke liye. 🛑";
      return "Steps:\n1. Pickup-Drop address bhariye.\n2. 'Request Now' dabaiye.\n3. Apni gadi Select kijiye aur booking ho gayi! ✅✨";
    }

    // 2) Mumbai Specific Routes
    if (q.includes("mumbai") || q.includes("bkc") || q.includes("traffic") || q.includes("highway") || q.includes("marine drive") || q.includes("andheri") || q.includes("powai")) {
      if (q.includes("bkc")) return "BKC ke liye hamare paas special corporate-friendly rides hain. Traffic ke hisaab se hum fastest route suggest karenge! 🏢🛣️";
      if (q.includes("traffic") || q.includes("highway")) return "Mumbai traffic ka toh pata hi hai bhai! Western Express Highway pe aksar heavy traffic hota hai, isliye thoda buffer time leke chalein. 🚗🚕🚙";
      return "Main Mumbai routes ka expert hoon. BKC, Marine Drive, ya Airport - batayiye kahan jana hai? 🏙️";
    }

    // 3) Safety
    if (q.includes("safe") || q.includes("safety") || q.includes("sos") || q.includes("night") || q.includes("family") || q.includes("verify")) {
      if (q.includes("sos") || q.includes("emergency")) return "Humare app me red color ka SOS button hai, jo turant emergency team ko alert kar deta hai. 🛡️🆘";
      if (q.includes("night")) return "Bilkul safe hai! Humari late-night rides 24/7 monitored hoti hain aur saare drivers verified hote hain. 🌙✨";
      if (q.includes("share") || q.includes("family")) return "Aap apni ride ki live location family ke saath turant share kar sakte hain 'Share Trip' feature se. 📱👨‍👩‍👧‍👦";
      return "Bhai, Ryngo hamesha background-verified drivers aur GPS-tracked safe rides deta hai. Humare app me SOS feature hamesha haazir hai. 🛡️✨";
    }

    // 4) Fare & Payments
    const isFareQuery = q.includes("fare") || q.includes("kitna") || q.includes("kiraya") || q.includes("charge") || q.includes("money") || q.includes("paisa") || q.includes("cash") || q.includes("upi") || q.includes("pay");
    if (isFareQuery) {
      if (q.includes("cash") || q.includes("upi") || q.includes("paytm")) return "Haan bhai, Cash, UPI (GPay/PhonePe), aur Paytm sab chalta hai Ryngo me! 💳📱";
      if (distance > 0) {
        const mini = Math.floor(distance * 22.7 + 40);
        const sedan = Math.floor(distance * 25.7 + 80);
        const xl = Math.floor(distance * 32 + 150);
        const primeLow = Math.floor(distance * 22.7 + 100);
        const primeHigh = Math.floor(distance * 32 + 100);
        
        let response = `Nakshe par trip ki doori **${distance.toFixed(1)} km** hai. Iska estimated fare:\n\n`;
        response += `- **Mini/Taxi**: ₹${mini}\n`;
        response += `- **Sedan**: ₹${sedan}\n`;
        response += `- **XL (SUV)**: ₹${xl}\n`;
        response += `- **Prime**: ₹${primeLow} - ₹${primeHigh}\n\n`;
        response += `Peak hours ya night (11 PM-5 AM) me rates badh sakte hain. ✨🚕`;
        return response;
      }
      return "Ji bhai, main abhi fare calculate kar raha hoon. Bas pehle locations enter karke **'Request Now'** dabaiye taaki main exact distance dekh kar fare bata saku! 😊📍🏙️";
    }

    // 5) Driver Related
    if (q.includes("driver") || q.includes("call") || q.includes("complaint") || q.includes("rating")) {
      if (q.includes("call")) return "Aap app se directly driver ko call kar sakte hain. Agar woh nahi utha rahe, toh thoda wait kijiye ya support me bataiye. 📞";
      if (q.includes("complaint") || q.includes("extra")) return "Agar driver extra cash maange ya behavior theek na ho, toh turant support@ryngo.in par mail kijiye. Hum sakht action lete hain. 📧🚫";
      return "Drivers verified hain, par koi issue hone par humein batayein. 👨‍✈️";
    }

    // 6) Driver Onboarding
    if (q.includes("join") || q.includes("portal") || q.includes("salary") || q.includes("earning") || q.includes("documents")) {
      return "Ryngo join karne ke liye hamare website ke 'Drivers' section me jayein. Documents: RC, Insurance, Aadhaar aur Driving License chahiye. 🚘📄";
    }

    // 7) Corporate / Daily
    if (q.includes("office") || q.includes("corporate") || q.includes("subscription") || q.includes("package")) {
      return "Haan bhai, humare paas monthly office packages aur corporate subscription plans available hain. 🏢💼";
    }

    if (q.includes("hi") || q.includes("hello") || q.includes("namaste")) return "Namaste bhai! Kaise help karu aapki Ryngo rides ke liye? 👋";
    
    // Weather Support
    if (q.includes("weather") || q.includes("mausam") || q.includes("mosam") || q.includes("tapman") || q.includes("temperature")) {
      return contextWeather 
        ? `Bhai, is waqt baahar ka mausam **${contextWeather}** hai. Ride ke liye ekdum mast time hai! ☀️☁️` 
        : "Main mausam check kar raha hoon... bas ek pal rukhiye! 🌡️✨";
    }

    return "Ji bhai, main Mumbai routes, fares, safety aur driver onboarding ka expert hoon. Aap mujhse ride se judi koi bhi baat puch sakte hain! ✨🤖🦾";
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setMessages(p => [...p, { id: Date.now().toString(), role: "user", text: trimmed, timestamp: new Date() }]);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: trimmed, history: messages.slice(1).map(m => ({ role: m.role, text: m.text })),
          metadata: { pickup: pickupAddress, destination: destinationAddress, availableCars: availableCars.length, distance: distance > 0 ? `${distance.toFixed(1)} km` : "Not calculated" }
        }),
      });
      const data = await res.json();
      const needsFallback = !data.reply || data.reply.includes("rest kar raha hai") || data.reply.includes("limit") || data.reply.includes("quota");
      setMessages(p => [...p, { id: Date.now().toString(), role: "assistant", text: needsFallback ? getFallbackResponse(trimmed) : data.reply, timestamp: new Date() }]);
    } catch {
      setMessages(p => [...p, { id: Date.now().toString(), role: "assistant", text: getFallbackResponse(trimmed), timestamp: new Date() }]);
    } finally { setIsLoading(false); }
  };

  return (
    <>
      <style>{`
        .ryngo-fab { position: fixed; bottom: 130px; right: 32px; z-index: 9999; width: 62px; height: 62px; border-radius: 50%; background: #0B4619; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 40px rgba(11,70,25,0.4); border: 1px solid rgba(255,255,255,0.1); transition: transform 0.2s; }
        .ryngo-fab:hover { transform: scale(1.05); }
        .ryngo-chat-window { position: fixed; bottom: 202px; right: 32px; z-index: 9998; width: 340px; max-width: calc(100vw - 32px); border-radius: 24px; overflow: hidden; box-shadow: 0 24px 80px rgba(0,0,0,0.22); background: white; border: 1px solid #ddd; display: flex; flex-direction: column; }
        @media (max-width: 768px) { .ryngo-chat-window { bottom: 190px; right: 20px; width: 320px; } .ryngo-fab { bottom: 120px; right: 20px; } }
        .ryngo-header { background: linear-gradient(135deg, #0B4619 0%, #3D8C40 100%); padding: 12px 16px; display: flex; align-items: center; gap: 10px; color: white; }
        .ryngo-messages { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; gap: 10px; min-height: 280px; max-height: 380px; background: #efeae2; }
        .ryngo-bubble-content { padding: 12px 16px; border-radius: 18px; font-size: 14px; background: white; border: 1px solid #f0f0f0; box-shadow: 0 2px 4px rgba(0,0,0,0.02); color: #333; line-height: 1.5; }
        .ryngo-bubble-user { align-self: flex-end; }
        .ryngo-bubble-user .ryngo-bubble-content { background: #0B4619; color: white; border: none; border-bottom-right-radius: 4px; }
        .ryngo-input-bar { display: flex; gap: 8px; padding: 12px; background: white; border-top: 1px solid #eee; align-items: center; }
        .ryngo-input { flex: 1; border: none; outline: none; font-size: 14px; background: #f0f2f5; padding: 10px 16px; border-radius: 24px; }
      `}</style>
      <button className="ryngo-fab" onClick={() => { 
        if (!isOpen) { setIsMinimized(false); }
        setIsOpen(!isOpen); 
      }}>
        {isOpen ? <X color="white" /> : <PremiumSparkles size={34} />}
      </button>
      <AnimatePresence mode="wait">
        {isOpen && !isMinimized && (
          <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92, y: 30 }} className="ryngo-chat-window">
            <div className="ryngo-header">
              <PremiumSparkles size={22} />
              <div style={{ flex: 1, fontSize: "15px", fontWeight: "bold", letterSpacing: "-0.01em" }}>Ryngo Assistant AI</div>
              {contextWeather && (
                <div style={{ fontSize: "12px", background: "rgba(255,255,255,0.2)", padding: "2px 8px", borderRadius: "12px", marginRight: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                  {contextWeather}
                </div>
              )}
              <button onClick={() => setIsMinimized(true)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}><Minimize2 size={18}/></button>
            </div>
            <div className="ryngo-messages">
              {messages.map((m) => (
                <div key={m.id} className={`ryngo-bubble-${m.role}`} style={{ display: "flex", alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "88%" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="ryngo-bubble-content" dangerouslySetInnerHTML={{ __html: parseMarkdown(m.text) }} />
                    <div style={{ fontSize: "10px", opacity: 0.4, marginTop: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
                      {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      {m.role === "assistant" && <button onClick={() => handleSpeak(m.id, m.text)} style={{ background: "none", border: "none", cursor: "pointer", color: "#0B4619" }}>{isSpeaking === m.id ? <VolumeX size={12}/> : <Volume2 size={12}/>}</button>}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="ryngo-input-bar">
              <button type="button" onClick={toggleListening} style={{ background: "none", border: "none", color: isListening ? "#ef4444" : "#666", cursor: "pointer" }}>
                {isListening ? <MicOff size={22} className="animate-pulse" /> : <Mic size={22} />}
              </button>
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Dadar se Thane ka kiraya..." className="ryngo-input" />
              <button type="submit" disabled={isLoading} style={{ background: "#0B4619", border: "none", color: "white", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Send size={18} /></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
