"use client";

import { useState, useRef, useEffect } from "react";
import {
  User, Shield, CreditCard, Star, Globe, HelpCircle, LogOut,
  ChevronRight, Edit3, Camera, Smartphone, Mail, Lock, Monitor,
  Sun, Moon, MessageSquare, Phone, FileText, MapPin, Plus,
  Car, AlertCircle, Eye, X, Check, ChevronDown, History as RideHistory
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/components/ThemeProvider";
import { useSearchParams, useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────
type ModalField = { label: string; key: string; type?: string; value: string } | null;
type EmergencyContact = { name: string; phone: string; relation: string };

// ─── Nav items ───────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: "profile", icon: User, label: "Profile", color: "text-violet-600 bg-violet-50" },
  { id: "activity", icon: RideHistory, label: "Activity", color: "text-emerald-600 bg-emerald-50" },
  { id: "security", icon: Shield, label: "Security", color: "text-blue-600 bg-blue-50" },
  { id: "payments", icon: CreditCard, label: "Payments", color: "text-emerald-600 bg-emerald-50" },
  { id: "preferences", icon: Star, label: "Ride Preferences", color: "text-amber-600 bg-amber-50" },
  { id: "safety", icon: AlertCircle, label: "Safety", color: "text-red-600 bg-red-50" },
  { id: "display", icon: Monitor, label: "Display", color: "text-indigo-600 bg-indigo-50" },
  { id: "language", icon: Globe, label: "Language", color: "text-sky-600 bg-sky-50" },
  { id: "help", icon: HelpCircle, label: "Help & Support", color: "text-orange-600 bg-orange-50" },
];

// ─── Vehicle types ────────────────────────────────────────────────────
const VEHICLES = [
  { id: "mini", label: "Ryngo Mini", icon: "🚗", desc: "Compact & affordable" },
  { id: "taxi", label: "Ryngo Taxi", icon: "🚕", desc: "Standard ride" },
  { id: "sedan", label: "Ryngo Sedan", icon: "🚙", desc: "Comfortable sedan" },
  { id: "electric", label: "Electric", icon: "⚡", desc: "Eco-friendly EV" },
  { id: "premium", label: "Premium", icon: "💎", desc: "Luxury experience" },
  { id: "xl", label: "Ryngo XL", icon: "🚐", desc: "6-seater SUV" },
  { id: "auto", label: "Ryngo Auto", icon: "🛺", desc: "Budget auto ride" },
  { id: "premAuto", label: "Premium Auto", icon: "✨", desc: "AC auto rickshaw" },
];

// ─── Languages ────────────────────────────────────────────────────────
const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "hi", label: "Hindi", native: "हिंदी" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
];

// ─── Reusable components ──────────────────────────────────────────────
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
      {children}
    </div>
  );
}

function Row({
  icon: Icon, iconClass = "text-gray-500 bg-gray-100",
  label, sub, badge, onClick,
}: {
  icon: React.ElementType; iconClass?: string;
  label: string; sub?: string; badge?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors group text-left"
    >
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconClass} group-hover:scale-110 transition-transform flex-shrink-0`}>
        <Icon size={17} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#0B132B] leading-tight">{label}</p>
        {sub && <p className="text-xs text-gray-500 mt-0.5 truncate">{sub}</p>}
      </div>
      {badge && <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full">{badge}</span>}
      <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
    </button>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────
function EditModal({
  field, onClose, onSave,
}: {
  field: NonNullable<ModalField>;
  onClose: () => void;
  onSave: (key: string, value: string) => void;
}) {
  const [val, setVal] = useState(field.value);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white rounded-[28px] shadow-2xl p-6 space-y-5"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-[#0B132B]">Edit {field.label}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X size={16} />
          </button>
        </div>
        <input
          autoFocus
          type={field.type || "text"}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          className="w-full px-4 py-3.5 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-medium text-[#0B132B] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 transition-all"
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all">
            Cancel
          </button>
          <button
            onClick={() => { onSave(field.key, val); onClose(); }}
            className="flex-1 py-3 rounded-2xl bg-[#0B132B] text-white font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Check size={16} /> Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Password Modal ───────────────────────────────────────────────────
function PasswordModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  const handleSave = () => {
    if (form.newPass !== form.confirm) { setErr("Passwords don't match!"); return; }
    if (form.newPass.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setDone(true);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white rounded-[28px] shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-[#0B132B]">Change Password</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200">
            <X size={16} />
          </button>
        </div>
        {done ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
              <Check size={28} className="text-emerald-600" />
            </div>
            <p className="font-bold text-[#0B132B]">Password Changed!</p>
            <p className="text-sm text-gray-500">Your password has been updated successfully.</p>
            <button onClick={onClose} className="w-full py-3 rounded-2xl bg-[#0B132B] text-white font-bold text-sm mt-2">Done</button>
          </div>
        ) : (
          <>
            {["current", "newPass", "confirm"].map((k, i) => (
              <input key={k} type="password" placeholder={["Current Password", "New Password", "Confirm New Password"][i]}
                value={form[k as keyof typeof form]}
                onChange={(e) => { setForm({ ...form, [k]: e.target.value }); setErr(""); }}
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400"
              />
            ))}
            {err && <p className="text-xs text-red-500 font-medium px-1">{err}</p>}
            <div className="flex gap-3 pt-1">
              <button onClick={onClose} className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-bold text-sm">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-3 rounded-2xl bg-[#0B132B] text-white font-bold text-sm active:scale-95 transition-all">Update</button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Location Modal ───────────────────────────────────────────────────
function LocationModal({ type, current, onClose, onSave }: {
  type: "Home" | "Work"; current: string; onClose: () => void; onSave: (v: string) => void;
}) {
  const [val, setVal] = useState(current);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white rounded-[28px] shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-[#0B132B]">Edit {type} Location</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={16} /></button>
        </div>
        <textarea rows={3} value={val} onChange={(e) => setVal(e.target.value)}
          placeholder={`Enter your ${type.toLowerCase()} address`}
          className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 resize-none"
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-bold text-sm">Cancel</button>
          <button onClick={() => { onSave(val); onClose(); }} className="flex-1 py-3 rounded-2xl bg-[#0B132B] text-white font-bold text-sm active:scale-95">
            <Check size={14} className="inline mr-1" /> Save
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Contact Modal ───────────────────────────────────────────────────
function ContactModal({ onClose, onSave }: { onClose: () => void; onSave: (c: EmergencyContact) => void }) {
  const [form, setForm] = useState<EmergencyContact>({ name: "", phone: "", relation: "Family" });
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 20 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white rounded-[28px] shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-[#0B132B]">Add Emergency Contact</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><X size={16} /></button>
        </div>
        <div className="space-y-3">
          <input placeholder="Contact Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400" />
          <input placeholder="Phone Number" type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400" />
          <select value={form.relation} onChange={e => setForm({ ...form, relation: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400">
            <option>Family</option>
            <option>Friend</option>
            <option>Police</option>
            <option>Hospital</option>
            <option>Other</option>
          </select>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl border border-gray-200 text-gray-600 font-bold text-sm">Cancel</button>
          <button onClick={() => { if (form.name && form.phone) { onSave(form); onClose(); } }}
            className="flex-1 py-3 rounded-2xl bg-[#0B132B] text-white font-bold text-sm active:scale-95">
            Add Contact
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────
export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, setTheme, eyeComfort, setEyeComfort } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const sectionParam = searchParams.get("section");
  const [active, setActive] = useState(sectionParam || "profile");

  useEffect(() => {
    if (sectionParam && sectionParam !== active) {
      setActive(sectionParam);
    }
  }, [sectionParam]);

  // Profile state
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || "Pushpendra Kumar",
    mobile: "+91 98765 43210",
    email: session?.user?.email || "demo@ryngo.in",
  });
  const [editModal, setEditModal] = useState<ModalField>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(session?.user?.image || null);

  // Security state
  const [showPassModal, setShowPassModal] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  // Preferences state
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>(["mini"]);
  const [homeAddr, setHomeAddr] = useState("Galaxy Enclave, HSR Layout, Bangalore");
  const [workAddr, setWorkAddr] = useState("Tech Park, Whitefield, Bangalore");
  const [locationModal, setLocationModal] = useState<"Home" | "Work" | null>(null);

  // Language state
  const [selectedLang, setSelectedLang] = useState("en");

  // Safety / SOS state
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { name: "Dad", phone: "+91 99887 76655", relation: "Family" },
    { name: "Wife", phone: "+91 88776 65544", relation: "Family" },
  ]);
  const [sosStatus, setSosStatus] = useState<"idle" | "counting" | "sent">("idle");
  const [countdown, setCountdown] = useState(3);

  // Activity Mock Data
  const [activityData] = useState({
    ongoing: [
      { id: "r1", type: "Ryngo Mini", status: "Ongoing", date: "Today, 6:30 PM", from: "HSR Layout", to: "Indiranagar", price: "₹240", car: "🚗" }
    ],
    completed: [
      { id: "r2", type: "Ryngo Sedan", status: "Completed", date: "Yesterday, 10:15 AM", from: "Whitefield", to: "Airport", price: "₹850", car: "🚙" },
      { id: "r3", type: "Ryngo Auto", status: "Completed", date: "26 Mar, 2:30 PM", from: "Koramangala", to: "MG Road", price: "₹120", car: "🛺" }
    ],
    cancelled: [
      { id: "r4", type: "Ryngo XL", status: "Cancelled", date: "25 Mar, 9:00 AM", from: "BTM Layout", to: "Electronic City", price: "₹0", car: "🚐" }
    ]
  });
  const [showContactModal, setShowContactModal] = useState(false);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const triggerSos = () => {
    setSosStatus("counting");
    setCountdown(3);
    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current!);
          setSosStatus("sent");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSos = () => {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setSosStatus("idle");
    setCountdown(3);
  };

  const addContact = (contact: EmergencyContact) => {
    setEmergencyContacts([...emergencyContacts, contact]);
  };

  const removeContact = (index: number) => {
    setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
  };

  const initial = profileData.name.charAt(0).toUpperCase();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  const saveField = (key: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleVehicle = (id: string) => {
    setSelectedVehicles((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((v) => v !== id) : prev) : [...prev, id]
    );
  };

  // ─── Sections ───────────────────────────────────────────────────────
  const renderSection = () => {
    switch (active) {

      // ── PROFILE ────────────────────────────────────────────────────
      case "profile":
        return (
          <div className="space-y-5">
            {/* Avatar */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-[#0B132B] border-4 border-gray-50">
                  {photoPreview ? (
                    <Image src={photoPreview} alt="Avatar" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-black text-3xl">{initial}</div>
                  )}
                </div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white text-white hover:bg-emerald-600 transition-colors active:scale-90"
                >
                  <Camera size={14} />
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </div>
              <div>
                <p className="text-lg font-black text-[#0B132B]">{profileData.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">Tap camera icon to change photo</p>
              </div>
            </div>

            <Card>
              <Row icon={Edit3} iconClass="text-violet-600 bg-violet-50" label="Full Name" sub={profileData.name}
                onClick={() => setEditModal({ label: "Full Name", key: "name", value: profileData.name })} />
              <Row icon={Smartphone} iconClass="text-emerald-600 bg-emerald-50" label="Mobile Number" sub={profileData.mobile} badge="Verified"
                onClick={() => setEditModal({ label: "Mobile Number", key: "mobile", type: "tel", value: profileData.mobile })} />
              <Row icon={Mail} iconClass="text-blue-600 bg-blue-50" label="Email Address" sub={profileData.email}
                onClick={() => setEditModal({ label: "Email Address", key: "email", type: "email", value: profileData.email })} />
            </Card>
          </div>
        );

      // ── ACTIVITY ───────────────────────────────────────────────────
      case "activity":
        return (
          <div className="space-y-6">
            {/* Ongoing Rides */}
            {activityData.ongoing.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-black text-emerald-600 uppercase tracking-wider ml-1">Ongoing Ride</p>
                {activityData.ongoing.map(ride => (
                  <div key={ride.id} className="bg-emerald-50 border border-emerald-100 rounded-[24px] p-5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4">
                      <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm">{ride.car}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-black text-[#0B132B]">{ride.type}</p>
                          <p className="font-black text-emerald-700">{ride.price}</p>
                        </div>
                        <p className="text-xs text-emerald-600 font-bold mb-3">{ride.date}</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span className="truncate">{ride.from}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#0B132B]" />
                            <span className="truncate">{ride.to}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-4 py-3 bg-white border border-emerald-200 rounded-xl text-xs font-black text-emerald-700 hover:bg-emerald-100 transition-all active:scale-95">
                      TRACK LIVE RIDE
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Rides */}
            <div className="space-y-3">
              <p className="text-xs font-black text-gray-500 uppercase tracking-wider ml-1">Completed Rides</p>
              <Card>
                {activityData.completed.map(ride => (
                  <button key={ride.id} className="w-full p-5 flex items-start gap-4 hover:bg-gray-50 transition-all text-left group">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">{ride.car}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-black text-[#0B132B]">{ride.type}</p>
                        <p className="font-black text-[#0B132B]">{ride.price}</p>
                      </div>
                      <p className="text-xs text-gray-400 font-medium mb-1">{ride.date}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">{ride.from} → {ride.to}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-300 mt-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </Card>
            </div>

            {/* Cancelled Rides */}
            <div className="space-y-3">
              <p className="text-xs font-black text-red-500 uppercase tracking-wider ml-1">Cancelled Rides</p>
              <Card>
                {activityData.cancelled.map(ride => (
                  <div key={ride.id} className="p-5 flex items-start gap-4 opacity-70">
                    <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-2xl grayscale">{ride.car}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-black text-gray-400">{ride.type}</p>
                        <span className="text-[10px] font-black bg-red-50 text-red-500 px-2 py-0.5 rounded-full">CANCELLED</span>
                      </div>
                      <p className="text-xs text-gray-400 font-medium mb-1">{ride.date}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{ride.from} → {ride.to}</p>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        );

      // ── SECURITY ───────────────────────────────────────────────────
      case "security":
        return (
          <div className="space-y-5">
            <Card>
              <Row icon={Lock} iconClass="text-blue-600 bg-blue-50" label="Change Password" sub="Update your account password"
                onClick={() => setShowPassModal(true)} />
              <Row icon={Monitor} iconClass="text-indigo-600 bg-indigo-50" label="Login Activity" sub="View recent sign-in sessions"
                onClick={() => setShowActivity(true)} />
            </Card>

            {/* Login activity panel */}
            <AnimatePresence>
              {showActivity && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#0B132B] text-sm">Recent Sessions</p>
                    <button onClick={() => setShowActivity(false)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
                  </div>
                  {[
                    { device: "Chrome · Windows 11", loc: "Bangalore, IN", time: "Now (current)", active: true },
                    { device: "Safari · iPhone 15", loc: "Bangalore, IN", time: "2 hours ago", active: false },
                    { device: "Ryngo App · Android", loc: "Mumbai, IN", time: "Yesterday", active: false },
                  ].map((s) => (
                    <div key={s.device} className={`flex items-start gap-3 p-3 rounded-2xl ${s.active ? "bg-emerald-50 border border-emerald-100" : "bg-gray-50"}`}>
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${s.active ? "bg-emerald-500" : "bg-gray-300"}`} />
                      <div className="flex-1">
                        <p className="text-xs font-bold text-[#0B132B]">{s.device}</p>
                        <p className="text-[10px] text-gray-500">{s.loc} · {s.time}</p>
                      </div>
                      {!s.active && <button className="text-[10px] font-bold text-red-500 hover:underline">Remove</button>}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => signOut()}
              className="w-full bg-white rounded-3xl border border-red-100 p-4 flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-50 transition-all active:scale-[0.98]"
            >
              <LogOut size={16} /> Logout from All Devices
            </button>
          </div>
        );

      // ── PAYMENTS ───────────────────────────────────────────────────
      case "payments":
        return (
          <div className="space-y-5">
            <div className="h-44 rounded-3xl bg-gradient-to-br from-[#0B132B] to-gray-800 p-6 flex flex-col justify-between text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/5 rounded-full" />
              <div className="flex justify-between items-start">
                <CreditCard size={28} className="text-white/70" />
                <span className="font-bold tracking-widest text-sm text-white/70">VISA</span>
              </div>
              <div>
                <p className="text-xs text-white/50 font-bold uppercase tracking-wider">Balance</p>
                <p className="text-2xl font-black">₹4,520.00</p>
              </div>
            </div>
            <Card>
              <Row icon={Plus} iconClass="text-emerald-600 bg-emerald-50" label="Add Payment Method" sub="UPI, Card or NetBanking" onClick={() => { }} />
              <Row icon={CreditCard} iconClass="text-blue-600 bg-blue-50" label="Saved Cards & UPI" sub="1 card · ryngo@okhdfcbank" onClick={() => { }} />
              <Row icon={Star} iconClass="text-amber-600 bg-amber-50" label="Default Payment" sub="Ryngo Wallet" onClick={() => { }} />
            </Card>
          </div>
        );

      // ── RIDE PREFERENCES ───────────────────────────────────────────
      case "preferences":
        return (
          <div className="space-y-5">
            {/* Vehicle grid */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div>
                <p className="font-bold text-[#0B132B] text-sm">Vehicle Preference</p>
                <p className="text-xs text-gray-500 mt-0.5">Select one or more vehicle types</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {VEHICLES.map((v) => {
                  const isSelected = selectedVehicles.includes(v.id);
                  return (
                    <button
                      key={v.id}
                      onClick={() => toggleVehicle(v.id)}
                      className={`relative flex flex-col items-center gap-1.5 p-4 rounded-2xl border-2 transition-all active:scale-95 ${isSelected
                          ? "border-[#0B132B] bg-[#0B132B]/5 shadow-md"
                          : "border-gray-100 hover:border-gray-300 bg-white"
                        }`}
                    >
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-4 h-4 bg-[#0B132B] rounded-full flex items-center justify-center">
                          <Check size={10} className="text-white" />
                        </span>
                      )}
                      <span className="text-2xl">{v.icon}</span>
                      <span className={`text-xs font-bold text-center leading-tight ${isSelected ? "text-[#0B132B]" : "text-gray-600"}`}>{v.label}</span>
                      <span className="text-[9px] text-gray-400 text-center leading-tight">{v.desc}</span>
                    </button>
                  );
                })}
              </div>
              <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                <p className="text-xs text-gray-500">{selectedVehicles.length} type{selectedVehicles.length !== 1 ? "s" : ""} selected</p>
                <button
                  onClick={() => { }}
                  className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors active:scale-95"
                >
                  Save Preference ✓
                </button>
              </div>
            </div>

            {/* Saved locations */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-bold text-[#0B132B] text-sm">Saved Locations</p>
                <button className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <Plus size={14} /> Add New
                </button>
              </div>
              {(["Home", "Work"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setLocationModal(type)}
                  className="w-full flex items-start gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-emerald-50 transition-colors group text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-500 group-hover:text-emerald-600 shadow-sm">
                    <MapPin size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#0B132B]">{type}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{type === "Home" ? homeAddr : workAddr}</p>
                  </div>
                  <Edit3 size={15} className="text-gray-400 flex-shrink-0 mt-1" />
                </button>
              ))}
            </div>
          </div>
        );

      // ── SAFETY ─────────────────────────────────────────────────────
      case "safety":
        return (
          <div className="space-y-5">
            {/* SOS Alert Section */}
            <div className={`rounded-[32px] p-8 text-center shadow-2xl relative overflow-hidden transition-all duration-500 ${sosStatus === "sent" ? "bg-emerald-600" : "bg-red-600"
              }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 to-transparent" />
              <div className="relative z-10 space-y-4">
                {sosStatus === "idle" && (
                  <>
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                      <AlertCircle size={40} className="text-white" />
                    </div>
                    <h3 className="text-white font-black text-2xl">Emergency SOS</h3>
                    <p className="text-red-100 text-sm px-4">Tap to notify all emergency contacts with your live location.</p>
                    <button
                      onClick={triggerSos}
                      className="w-full bg-white text-red-600 py-4 rounded-2xl font-black shadow-lg hover:scale-[1.02] active:scale-95 transition-all text-lg"
                    >
                      ACTIVATE SOS NOW
                    </button>
                  </>
                )}

                {sosStatus === "counting" && (
                  <>
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-2 border-8 border-red-400">
                      <span className="text-red-600 font-black text-4xl">{countdown}</span>
                    </div>
                    <h3 className="text-white font-black text-2xl uppercase tracking-widest">Starting SOS...</h3>
                    <p className="text-red-100 text-sm">Notifying {emergencyContacts.length} contacts in {countdown}s</p>
                    <button
                      onClick={cancelSos}
                      className="w-full bg-black/20 text-white border-2 border-white/30 py-4 rounded-2xl font-black hover:bg-black/30 transition-all"
                    >
                      CANCEL
                    </button>
                  </>
                )}

                {sosStatus === "sent" && (
                  <>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                      <Check size={40} className="text-emerald-600" />
                    </motion.div>
                    <h3 className="text-white font-black text-2xl">Alerts Sent!</h3>
                    <p className="text-emerald-50 text-sm px-4">Emergency messages & location link sent to all {emergencyContacts.length} contacts.</p>
                    <button
                      onClick={() => setSosStatus("idle")}
                      className="w-full bg-white/20 text-white border-2 border-white/30 py-4 rounded-2xl font-black hover:bg-white/30 transition-all"
                    >
                      DISMISS
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Emergency Contacts List */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[#0B132B] font-black text-lg">Emergency Contacts</h3>
                  <p className="text-gray-500 text-xs mt-0.5">Family, friends, or local police</p>
                </div>
                <button
                  onClick={() => setShowContactModal(true)}
                  className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl hover:bg-emerald-100 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {emergencyContacts.length === 0 ? (
                  <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-3xl">
                    <User size={32} className="text-gray-200 mx-auto mb-2" />
                    <p className="text-gray-400 text-xs font-medium">No emergency contacts added yet.</p>
                  </div>
                ) : (
                  emergencyContacts.map((contact, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-[24px] group">
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-xs ${contact.relation === 'Police' ? 'bg-blue-100 text-blue-600' : 'bg-red-50 text-red-600'
                        }`}>
                        {contact.relation === 'Police' ? <Shield size={18} /> : contact.relation[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#0B132B] font-black text-sm">{contact.name}</p>
                        <p className="text-gray-500 text-[11px] font-medium">{contact.relation} · {contact.phone}</p>
                      </div>
                      <button
                        onClick={() => removeContact(index)}
                        className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="grid grid-cols-2 gap-3 pb-2">
              <button
                onClick={() => addContact({ name: "Local Police", phone: "100", relation: "Police" })}
                className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-100/50 rounded-2xl text-left hover:bg-blue-100 transition-colors group"
              >
                <Shield size={16} className="text-blue-600" />
                <span className="text-[11px] font-bold text-blue-700">Add Nearby Police</span>
              </button>
              <button
                onClick={() => addContact({ name: "Ambulance", phone: "108", relation: "Hospital" })}
                className="flex items-center gap-3 p-3 bg-red-50 border border-red-100/50 rounded-2xl text-left hover:bg-red-100 transition-colors"
              >
                <Plus size={16} className="text-red-500" />
                <span className="text-[11px] font-bold text-red-700">Add Ambulance</span>
              </button>
            </div>
          </div>
        );

      // ── DISPLAY ────────────────────────────────────────────────────
      case "display":
        return (
          <div className="space-y-5">
            <div className={`rounded-3xl p-5 border flex items-center gap-4 transition-all duration-500 ${theme === "dark" ? "bg-gray-900 border-gray-700" : theme === "system" ? "bg-gray-100 border-gray-200" : "bg-white border-gray-100"
              }`}>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme === "dark" ? "bg-gray-700 text-yellow-300" : "bg-amber-50 text-amber-500"}`}>
                {theme === "dark" ? <Moon size={22} /> : theme === "system" ? <Monitor size={22} /> : <Sun size={22} />}
              </div>
              <div>
                <p className={`font-bold text-sm ${theme === "dark" ? "text-white" : "text-[#0B132B]"}`}>
                  {theme === "dark" ? "🌙 Dark Mode On" : theme === "system" ? "⚙️ Following System" : "☀️ Light Mode On"}
                </p>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Changes apply instantly across the whole app</p>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
              <p className="font-bold text-[#0B132B] text-sm">Appearance</p>
              <div className="grid grid-cols-3 gap-3">
                {([
                  { label: "Light", icon: Sun, value: "light" as const },
                  { label: "Dark", icon: Moon, value: "dark" as const },
                  { label: "System", icon: Monitor, value: "system" as const },
                ] as Array<{ label: string; icon: React.ElementType; value: "light" | "dark" | "system" }>).map((t) => {
                  const isActive = theme === t.value;
                  return (
                    <button key={t.label} onClick={() => setTheme(t.value)}
                      className={`flex flex-col items-center gap-2.5 p-4 rounded-2xl border-2 transition-all active:scale-95 ${isActive ? "border-[#0B132B] bg-[#0B132B]/5 shadow-md" : "border-gray-100 hover:border-gray-300"}`}>
                      <motion.div animate={{ scale: isActive ? 1.1 : 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                        <t.icon size={22} className={isActive ? "text-[#0B132B]" : "text-gray-400"} />
                      </motion.div>
                      <span className={`text-xs font-bold ${isActive ? "text-[#0B132B]" : "text-gray-400"}`}>{t.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-4 px-5 py-5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${eyeComfort ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500"}`}>
                  <Eye size={17} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#0B132B]">Eye Comfort Mode</p>
                  <p className="text-xs text-gray-500">{eyeComfort ? "🟠 Warm tone active — blue light reduced" : "Adds a warm overlay to reduce eye strain"}</p>
                </div>
                <button onClick={() => setEyeComfort(!eyeComfort)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${eyeComfort ? "bg-orange-400" : "bg-gray-200"}`}>
                  <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow ${eyeComfort ? "left-[26px]" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          </div>
        );

      // ── LANGUAGE ───────────────────────────────────────────────────
      case "language":
        return (
          <div className="space-y-5">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
              {LANGUAGES.map((lang) => {
                const isActive = selectedLang === lang.code;
                return (
                  <button key={lang.code} onClick={() => setSelectedLang(lang.code)}
                    className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors text-left">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-all ${isActive ? "bg-[#0B132B] text-white scale-105" : "bg-gray-100 text-gray-600"}`}>
                      {lang.code.toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#0B132B]">{lang.label}</p>
                      <p className="text-xs text-gray-500">{lang.native}</p>
                    </div>
                    {isActive && (
                      <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                        className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                        <Check size={13} className="text-white" />
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="bg-blue-50 rounded-2xl px-4 py-3">
              <p className="text-xs text-blue-700 font-medium">
                🌍 Currently set to: <span className="font-black">{LANGUAGES.find(l => l.code === selectedLang)?.label}</span>
              </p>
            </div>
          </div>
        );

      // ── HELP & SUPPORT ─────────────────────────────────────────────
      case "help":
        return (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: MessageSquare, label: "Chat Support", sub: "7718852504", color: "text-emerald-600 bg-emerald-50",
                  href: "https://wa.me/917718852504",
                },
                {
                  icon: Phone, label: "Call Support", sub: "+91 77188 52504", color: "text-blue-600 bg-blue-50",
                  href: "tel:+917718852504",
                },
                {
                  icon: FileText, label: "Help Center", sub: "support@ryngo.in", color: "text-violet-600 bg-violet-50",
                  href: "mailto:support@ryngo.in?subject=Help Request",
                },
                {
                  icon: AlertCircle, label: "Report Issue", sub: "support@ryngo.in", color: "text-red-600 bg-red-50",
                  href: "mailto:support@ryngo.in?subject=Bug Report",
                },
              ].map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer"
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 hover:border-gray-300 hover:shadow-md transition-all group active:scale-[0.97]">
                  <div className={`w-11 h-11 rounded-2xl ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-[#0B132B] text-sm">{item.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.sub}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Contact info card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 space-y-3">
              <p className="text-sm font-bold text-[#0B132B]">Contact Details</p>
              <a href="tel:+917718852504" className="flex items-center gap-3 p-3 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors group">
                <Phone size={18} className="text-blue-600" />
                <div>
                  <p className="text-xs font-bold text-blue-700">Phone Support</p>
                  <p className="text-sm font-black text-[#0B132B]">+91 77188 52504</p>
                </div>
              </a>
              <a href="mailto:support@ryngo.in" className="flex items-center gap-3 p-3 bg-violet-50 rounded-2xl hover:bg-violet-100 transition-colors group">
                <Mail size={18} className="text-violet-600" />
                <div>
                  <p className="text-xs font-bold text-violet-700">Email Support</p>
                  <p className="text-sm font-black text-[#0B132B]">support@ryngo.in</p>
                </div>
              </a>
            </div>
          </div>
        );

      default: return null;
    }
  };

  const activeItem = NAV_ITEMS.find((n) => n.id === active);

  return (
    <div className="min-h-screen bg-[#ECF4E8] pt-20 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Mobile: horizontal pill nav */}
        <div className="flex md:hidden gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setActive(item.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-bold transition-all ${active === item.id ? "bg-[#0B132B] text-white" : "bg-white text-gray-600 border border-gray-100"
                }`}>
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex flex-col w-72 flex-shrink-0 h-fit sticky top-24">
            <div className="bg-white/60 backdrop-blur-xl rounded-[28px] border border-white/60 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[#0B132B] flex-shrink-0">
                    {photoPreview ? (
                      <Image src={photoPreview} alt="User" width={48} height={48} className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-black text-lg">{initial}</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-black text-[#0B132B] truncate">{profileData.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">{profileData.email}</p>
                  </div>
                </div>
              </div>
              <nav className="p-2">
                {NAV_ITEMS.map((item) => (
                  <button key={item.id} onClick={() => setActive(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-0.5 transition-all duration-200 group ${active === item.id ? "bg-[#0B132B] text-white shadow-lg" : "text-gray-600 hover:bg-gray-100"
                      }`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${active === item.id ? "bg-white/20" : item.color} transition-all`}>
                      <item.icon size={16} />
                    </div>
                    <span className="text-sm font-bold">{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="p-4 border-t border-gray-100">
                <button onClick={() => signOut()}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all group active:scale-95">
                  <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  <span className="text-sm font-bold">Logout</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            <div className="mb-5 flex items-center gap-3">
              {activeItem && (
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${activeItem.color}`}>
                  <activeItem.icon size={20} />
                </div>
              )}
              <h1 className="text-2xl font-black text-[#0B132B]">{activeItem?.label}</h1>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {renderSection()}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 md:hidden">
              <button onClick={() => signOut()}
                className="w-full bg-white rounded-3xl border border-red-100 p-4 flex items-center justify-center gap-2 text-red-500 font-bold hover:bg-red-50 transition-all">
                <LogOut size={18} /> Logout
              </button>
            </div>
          </main>
        </div>
      </div>

      {/* ── Modals ── */}
      <AnimatePresence>
        {editModal && (
          <EditModal field={editModal} onClose={() => setEditModal(null)} onSave={saveField} />
        )}
        {showPassModal && <PasswordModal onClose={() => setShowPassModal(false)} />}
        {locationModal && (
          <LocationModal
            type={locationModal}
            current={locationModal === "Home" ? homeAddr : workAddr}
            onClose={() => setLocationModal(null)}
            onSave={(v: string) => locationModal === "Home" ? setHomeAddr(v) : setWorkAddr(v)}
          />
        )}
        {showContactModal && <ContactModal onClose={() => setShowContactModal(false)} onSave={addContact} />}
      </AnimatePresence>
    </div>
  );
}
