import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Calendar, 
  Phone, 
  MessageSquare, 
  Users, 
  IndianRupee, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Star, 
  ShieldCheck, 
  ChevronRight, 
  Bot, 
  Activity, 
  Plus, 
  ArrowRight,
  Smile,
  Zap,
  Building,
  Check
} from 'lucide-react';
import { clinicServices, initialLeads, getAIClinicResponse } from './data/clinicData';

const formatPhoneForCall = (phoneValue) => {
  const digits = String(phoneValue || '').replace(/\D/g, '');
  return digits ? `tel:+${digits}` : '#';
};

export default function App() {
  const [activeTab, setActiveTab] = useState('website'); // 'website' | 'crm'
  const [chatOpen, setChatOpen] = useState(true);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Hi there! Welcome to NovaDental & Wellness. I'm Nova, your 24/7 AI Clinic Concierge. Are you looking to check treatment prices, relieve a sudden toothache, or book a free consultation?",
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  // Lead state
  const [leads, setLeads] = useState(initialLeads);
  const [currentLead, setCurrentLead] = useState({
    treatment: 'Dental Consultation',
    estimatedValue: '₹1,000'
  });
  const [showCaptureModal, setShowCaptureModal] = useState(false);
  const [leadForm, setLeadForm] = useState({
    name: '',
    phone: '',
    preferredTime: 'Saturday 10:00 AM'
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Quick prompt suggestions
  const quickPrompts = [
    "How much is teeth whitening and can I come this Saturday?",
    "I have severe molar pain, do you have emergency slots today?",
    "Do you offer free smile scans for clear aligners / Invisalign?",
    "What are your prices for routine checkup and clean?"
  ];

  const handleSendMessage = (textToSend) => {
    const message = textToSend || inputMsg;
    if (!message.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: message, timestamp: 'Just now' }];
    setMessages(newMessages);
    setInputMsg('');
    setIsTyping(true);

    // AI Response simulation
    setTimeout(() => {
      const response = getAIClinicResponse(message, newMessages, currentLead);
      setCurrentLead({
        treatment: response.treatmentIdentified,
        estimatedValue: response.estimatedValue
      });

      setMessages([
        ...newMessages,
        {
          sender: 'ai',
          text: response.reply,
          timestamp: 'Just now',
          action: response.suggestedAction
        }
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleConfirmLeadBooking = (e) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    const newLeadItem = {
      id: `LD-${100 + leads.length + 1}`,
      name: leadForm.name,
      phone: leadForm.phone,
      treatment: currentLead.treatment,
      estimatedValue: currentLead.estimatedValue,
      preferredTime: leadForm.preferredTime,
      status: "Confirmed by AI",
      capturedAt: "Just now",
      notes: "Auto-qualified via 24/7 AI Clinic Assistant"
    };

    setLeads([newLeadItem, ...leads]);
    setBookingSuccess(true);
    setShowCaptureModal(false);

    // Add confirmation message to chat
    setMessages(prev => [
      ...prev,
      {
        sender: 'ai',
        text: `🎉 Thank you ${leadForm.name}! Your booking for ${currentLead.treatment} on ${leadForm.preferredTime} is confirmed. A clinic confirmation SMS has been dispatched to ${leadForm.phone}. Dr. Reynolds looks forward to welcoming you!`,
        timestamp: 'Just now'
      }
    ]);

    setLeadForm({ name: '', phone: '', preferredTime: 'Saturday 10:00 AM' });
  };

  // Calculate CRM metrics
  const totalPipeline = leads.reduce((acc, curr) => {
    const val = parseInt(curr.estimatedValue.replace(/[^0-9]/g, '')) || 200;
    return acc + val;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Clinic Contact Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="flex items-center gap-1 text-teal-400 font-semibold">
              <Zap className="w-3.5 h-3.5" /> 24/7 AI Fast-Track Booking Active
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline">140 Grand Central Ave, Suite 400</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1 hover:text-white cursor-pointer">
              <Phone className="w-3.5 h-3.5 text-teal-400" /> Emergency Hotline: (555) 890-NOVA
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">● 3 Appointments Open Today</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('website')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Smile className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-900">NovaDental <span className="text-teal-600 font-extrabold">& Wellness</span></span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                  AI-Powered Clinic
                </span>
              </div>
              <p className="text-xs text-slate-500">Modern Dental Care & Instant Autonomous Scheduling</p>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2">
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center">
              <button
                onClick={() => setActiveTab('website')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'website'
                    ? 'bg-white text-teal-800 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Clinic Website & AI Chat
              </button>
              <button
                onClick={() => setActiveTab('crm')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'crm'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Staff CRM & Leads Dashboard
                <span className="w-4 h-4 rounded-full bg-teal-200 text-teal-950 text-[10px] flex items-center justify-center font-bold">
                  {leads.length}
                </span>
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ======================================================== */}
        {/* VIEW 1: CLINIC WEBSITE + INTERACTIVE AI BOOKING CONCIERGE */}
        {/* ======================================================== */}
        {activeTab === 'website' && (
          <div className="space-y-8">
            
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-teal-950 via-slate-900 to-teal-900 rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl border border-teal-800/40">
              <div className="max-w-2xl space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> 24/7 AI Patient Growth & Booking System
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  Exceptional Smiles. <br />
                  <span className="text-teal-400">Zero Wait Time.</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Experience modern dentistry powered by autonomous AI scheduling. Check transparent treatment pricing, get same-day emergency relief, or book your checkup in 60 seconds.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setChatOpen(true);
                      handleSendMessage("I'd like to check treatment prices and book an appointment.");
                    }}
                    className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm shadow-lg hover:shadow-teal-500/20 transition-all flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" /> Chat with AI Assistant Nova
                  </button>
                  <button
                    onClick={() => setActiveTab('crm')}
                    className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-sm border border-white/20 transition-all flex items-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4 text-teal-400" /> View Staff CRM Pipeline
                  </button>
                </div>
              </div>

              {/* Badges in Hero */}
              <div className="hidden lg:grid grid-cols-2 gap-3 absolute right-10 top-1/2 -translate-y-1/2 w-80 text-xs">
                <div className="bg-slate-900/80 backdrop-blur p-4 rounded-2xl border border-slate-700/80 space-y-1">
                  <div className="flex items-center gap-1 text-amber-400 font-bold">
                    <Star className="w-4 h-4 fill-amber-400" /> 4.9 / 5 Rating
                  </div>
                  <p className="text-slate-400">Over 1,200+ local patients</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur p-4 rounded-2xl border border-slate-700/80 space-y-1">
                  <div className="text-teal-400 font-bold text-base">+38% Growth</div>
                  <p className="text-slate-400">After-hours bookings captured</p>
                </div>
                <div className="bg-slate-900/80 backdrop-blur p-4 rounded-2xl border border-slate-700/80 space-y-1 col-span-2">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4" /> Insurance Coverage Varies
                  </div>
                  <p className="text-slate-400">Confirm coverage and costs with your provider</p>
                </div>
              </div>
            </div>

            {/* Core Services Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Featured Treatments & Transparent Pricing</h2>
                  <p className="text-xs text-slate-500">Illustrative INR demo prices only; not verified clinic rates.</p>
                </div>
                <span className="text-xs font-semibold text-teal-700 hidden sm:block">Click any card to ask AI</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {clinicServices.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      setChatOpen(true);
                      handleSendMessage(`How much is ${service.name} and when can I book?`);
                    }}
                    className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-teal-50 group-hover:text-teal-700">
                          {service.duration}
                        </span>
                        <span className="text-xs font-extrabold text-teal-700">{service.priceRange}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-teal-700 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed mb-3">
                        {service.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                      <span>{service.suitableFor}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Split Screen: Interactive AI Clinic Concierge */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              
              {/* Left Column: Why This AI System Drives Clinic Growth (4 cols) */}
              <div className="lg:col-span-4 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-4 border border-teal-500/30">
                    <Bot className="w-3.5 h-3.5" /> AI Growth & Automation Engine
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">Meet Nova, Your 24/7 Booking Agent</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    Most clinics lose up to 45% of potential patient revenue because inquiries happen after 5:00 PM or on weekends when front-desk staff are unavailable.
                  </p>

                  <div className="space-y-3 text-xs text-slate-300">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</div>
                      <div>
                        <strong className="text-white block">Price Guidance:</strong> Shows illustrative demo prices; actual clinic rates and insurance coverage vary.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</div>
                      <div>
                        <strong className="text-white block">Lead Qualification:</strong> Identifies high-intent procedures such as clear aligner consultations.
                      </div>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">✓</div>
                      <div>
                        <strong className="text-white block">Automated CRM Sync:</strong> Captures patient details and dispatches them to the staff portal.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400">
                  Ready to test? Try one of the test prompts on the right.
                </div>
              </div>

              {/* Right Column: Active AI Chat Interface (8 cols) */}
              <div className="lg:col-span-8 p-6 flex flex-col justify-between h-[520px]">
                
                {/* Chat Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold shadow-sm">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">Nova AI Assistant</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="text-[11px] text-emerald-700 font-semibold">Online 24/7</span>
                      </div>
                      <span className="text-xs text-slate-400">Typically replies in under 1 second</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCaptureModal(true)}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Appointment Now
                  </button>
                </div>

                {/* Messages Box */}
                <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-2">
                  {messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-teal-600 text-white rounded-br-none shadow-sm'
                          : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/70'
                      }`}>
                        <p>{m.text}</p>
                        {m.action && (
                          <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">
                              Category: {m.action}
                            </span>
                            <button
                              onClick={() => setShowCaptureModal(true)}
                              className="text-[11px] font-bold text-teal-800 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs hover:bg-teal-50"
                            >
                              Finalize Booking →
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 rounded-2xl p-3 text-xs text-slate-500 rounded-bl-none flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce"></span>
                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]"></span>
                        <span className="ml-1 text-[11px]">Nova is typing...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick 1-Click Prompt Chips */}
                <div className="py-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px]">
                    <span className="text-slate-400 font-semibold whitespace-nowrap">Suggested:</span>
                    {quickPrompts.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(q)}
                        className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-teal-50 hover:text-teal-800 border border-slate-200 text-slate-600 whitespace-nowrap transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input Bar */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 pt-2 border-t border-slate-100"
                >
                  <input
                    type="text"
                    value={inputMsg}
                    onChange={(e) => setInputMsg(e.target.value)}
                    placeholder="Ask about treatments, pricing, or request a booking slot..."
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" /> Send
                  </button>
                </form>

              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: STAFF CRM & PATIENT LEADS PIPELINE (AUTOMATION)  */}
        {/* ======================================================== */}
        {activeTab === 'crm' && (
          <div className="space-y-6">
            
            {/* CRM Header Bar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-800">
                    Clinic Growth Pipeline
                  </span>
                  <span className="text-xs text-slate-400">Sample lead dashboard</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">Autonomous Patient Bookings & CRM Dashboard</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Every patient inquiry handled by Nova AI is automatically qualified, assigned an estimated value, and logged below.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCaptureModal(true)}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" /> Log Manual Appointment
                </button>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Leads Captured</span>
                  <Users className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">{leads.length}</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> +42% vs traditional web forms
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Est. Revenue Pipeline</span>
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">₹{totalPipeline.toLocaleString('en-IN')}</div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Across cosmetic & restorative dentistry
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Avg. Response Time</span>
                  <Clock className="w-4 h-4 text-teal-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">1.2 sec</div>
                <div className="text-[11px] text-teal-700 font-semibold mt-1">
                  Zero wait-time 24/7 engagement
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Booking Conversion</span>
                  <Activity className="w-4 h-4 text-purple-600" />
                </div>
                <div className="text-2xl font-black text-slate-900">78.5%</div>
                <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                  High-intent phone number capture
                </div>
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Qualified Inbound Patients</h3>
                  <p className="text-xs text-slate-400">Fictional demo records only; no real patient information is used.</p>
                </div>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  Demo only · no calendar or PMS connection
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4">Patient Name</th>
                      <th className="py-3 px-4">Phone / Contact</th>
                      <th className="py-3 px-4">Interested Treatment</th>
                      <th className="py-3 px-4">Est. Value</th>
                      <th className="py-3 px-4">Requested Time</th>
                      <th className="py-3 px-4">AI Qualification Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {lead.name}
                          <span className="block text-[10px] font-normal text-slate-400">{lead.capturedAt}</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">{lead.phone}</td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{lead.treatment}</td>
                        <td className="py-3.5 px-4 font-bold text-emerald-600">{lead.estimatedValue}</td>
                        <td className="py-3.5 px-4">{lead.preferredTime}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            lead.status.includes('Confirmed') || lead.status.includes('Booked')
                              ? 'bg-emerald-100 text-emerald-800'
                              : lead.status.includes('Urgent')
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-teal-100 text-teal-800'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <a
                            href={formatPhoneForCall(lead.phone)}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                            aria-label={`Call ${lead.name}`}
                          >
                            <Phone className="w-3 h-3 text-teal-600" /> Call Patient
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Booking Modal */}
      {showCaptureModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-base text-slate-900">Finalize Appointment Booking</h3>
                <p className="text-xs text-slate-500">Selected Treatment: <strong>{currentLead.treatment}</strong></p>
              </div>
              <button
                onClick={() => setShowCaptureModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmLeadBooking} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({...leadForm, name: e.target.value})}
                  placeholder="e.g. Michael Scott"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Phone (for SMS Confirmation)</label>
                <input
                  type="tel"
                  required
                  value={leadForm.phone}
                  onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})}
                  placeholder="+1 (555) 019-2834"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Day & Time</label>
                <select
                  value={leadForm.preferredTime}
                  onChange={(e) => setLeadForm({...leadForm, preferredTime: e.target.value})}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                >
                  <option value="Today at 03:30 PM">Today at 03:30 PM (Emergency Slot)</option>
                  <option value="Today at 05:00 PM">Today at 05:00 PM</option>
                  <option value="Tomorrow at 10:00 AM">Tomorrow at 10:00 AM</option>
                  <option value="Saturday 10:00 AM">Saturday 10:00 AM</option>
                  <option value="Saturday 02:00 PM">Saturday 02:00 PM</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" /> Confirm My Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Smile className="w-4 h-4 text-teal-600" />
            <span className="font-bold text-slate-800">NovaDental & Wellness Clinic</span>
            <span>• 24/7 AI Growth & Lead Automation System</span>
          </div>
          <p>© 2026 NovaDental. Demo data only for assessment purposes.</p>
        </div>
      </footer>

    </div>
  );
}
