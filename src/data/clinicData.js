export const clinicServices = [
  {
    id: "cleaning",
    name: "Dental Checkup & Clean",
    priceRange: "₹800 - ₹1,500",
    duration: "45 mins",
    description: "Comprehensive oral examination, ultrasonic plaque scaling, fluoride treatment, and polish.",
    suitableFor: "Routine 6-month preventive care"
  },
  {
    id: "whitening",
    name: "Laser Teeth Whitening",
    priceRange: "₹8,000 - ₹12,000",
    duration: "60 mins",
    description: "In-chair medical grade whitening delivering up to 8 shades brighter in a single appointment.",
    suitableFor: "Cosmetic enhancement & stain removal"
  },
  {
    id: "emergency",
    name: "Emergency Toothache Relief",
    priceRange: "₹1,000 - ₹2,500",
    duration: "30 - 45 mins",
    description: "Immediate same-day pain assessment, digital X-ray diagnostics, and urgent stabilization.",
    suitableFor: "Acute pain, broken tooth, or swelling"
  },
  {
    id: "invisalign",
    name: "Clear Aligners / Orthodontics",
    priceRange: "₹80,000 - ₹2,00,000",
    duration: "Consultation Free",
    description: "Custom 3D digital smile simulation and clear removable aligners to straighten teeth discreetly.",
    suitableFor: "Crooked teeth, gaps, or bite correction"
  }
];

export const initialLeads = [
  {
    id: "LD-101",
    name: "Sample Patient 01",
    phone: "+1 (555) 010-2041",
    treatment: "Laser Teeth Whitening",
    estimatedValue: "₹9,000",
    preferredTime: "Saturday 10:00 AM",
    status: "Booked",
    capturedAt: "10 mins ago",
    notes: "Demo lead for whitening consultation."
  },
  {
    id: "LD-102",
    name: "Sample Patient 02",
    phone: "+1 (555) 010-9920",
    treatment: "Emergency Toothache Relief",
    estimatedValue: "₹1,800",
    preferredTime: "Today at 04:30 PM",
    status: "Urgent Call Required",
    capturedAt: "28 mins ago",
    notes: "Demo urgent-care inquiry."
  },
  {
    id: "LD-103",
    name: "Sample Patient 03",
    phone: "+1 (555) 010-4433",
    treatment: "Clear Aligners (Invisalign)",
    estimatedValue: "₹1,20,000",
    preferredTime: "Tuesday 02:00 PM",
    status: "Consultation Scheduled",
    capturedAt: "1 hour ago",
    notes: "Demo orthodontic consultation lead."
  }
];

export function getAIClinicResponse(userMessage, conversationHistory, currentLead) {
  const text = userMessage.toLowerCase().trim();
  const declinesBooking =
    /\b(?:no|not|don't|do not|can't|cannot|won't|will not|rather not)\b.{0,30}\b(?:book|booking|appointment|schedule|slot)\b/.test(text) ||
    /\b(?:no booking|not booking|not interested in booking|not ready to book|maybe later|not right now|no thanks)\b/.test(text);
  const asksToBook =
    /\b(?:book|booking|schedule|appointment|reserve|reservation)\b/.test(text) ||
    /\b(?:availability|available|open slots|time slots)\b/.test(text) ||
    /\b(?:can|could|may)\s+i\s+(?:come|visit|be seen)\b/.test(text);
  
  // Emergency scenario
  if (text.includes("emergency") || text.includes("pain") || text.includes("hurt") || text.includes("ache") || text.includes("broken")) {
    return {
      reply: declinesBooking
        ? "I'm sorry you're dealing with pain. Emergency assessments are listed at ₹1,000 - ₹2,500 in this illustrative demo. No problem if you don't want to book here; if you'd like, I can still share general clinic information."
        : "I'm so sorry to hear you're in pain! We keep same-day emergency slots open specifically for acute toothache and trauma. A diagnostic X-ray and emergency stabilization is shown as ₹1,000 - ₹2,500 in this illustrative demo. Would you like our emergency dentist to see you today at 03:30 PM or 05:00 PM?",
      suggestedAction: declinesBooking ? null : "Emergency Booking",
      treatmentIdentified: "Emergency Toothache Relief",
      estimatedValue: "₹1,800"
    };
  }

  // Teeth whitening
  if (text.includes("white") || text.includes("bright") || text.includes("bleach") || text.includes("cosmetic")) {
    return {
      reply: declinesBooking
        ? "Our in-chair Laser Teeth Whitening takes about 60 minutes. The illustrative demo price is ₹9,000 (reference price ₹12,000). No problem if you're not looking to book; I can answer questions about the treatment."
        : "Great choice! Our in-chair Laser Teeth Whitening takes about 60 minutes. The illustrative demo price is ₹9,000 (reference price ₹12,000). Would you prefer a weekday evening or a Saturday morning appointment?",
      suggestedAction: declinesBooking ? null : "Cosmetic Inquiry",
      treatmentIdentified: "Laser Teeth Whitening",
      estimatedValue: "₹9,000"
    };
  }

  // Invisalign / Aligners
  if (text.includes("invisalign") || text.includes("aligner") || text.includes("straight") || text.includes("brace")) {
    return {
      reply: declinesBooking
        ? "The illustrative demo lists Clear Aligners at ₹80,000 - ₹2,00,000, with a free 3D scan consultation and example payment plans. No problem if you're not ready to book; I can answer questions about the treatment."
        : "Clear Aligners are one of our most popular treatments! This illustrative demo shows a free 3D Digital Smile Scan & Consultation and example payment plans from ₹1,000/week. Would you like information about booking a free 3D scan?",
      suggestedAction: declinesBooking ? null : "High-Ticket Lead",
      treatmentIdentified: "Clear Aligners (Invisalign)",
      estimatedValue: "₹1,20,000"
    };
  }

  // Cost / Pricing inquiry
  if (text.includes("cost") || text.includes("price") || text.includes("how much") || text.includes("fee") || text.includes("insurance")) {
    return {
      reply: "The illustrative demo prices are ₹800-₹1,500 for a routine checkup and clean, ₹9,000 for whitening, and emergency assessments from ₹1,000. Actual prices and insurance coverage vary by clinic and provider. What treatment would you like to know about?",
      suggestedAction: "Pricing Transparency",
      treatmentIdentified: "Dental Checkup & Clean",
      estimatedValue: "₹1,000"
    };
  }

  // Booking / time confirmation / contact details
  if (!declinesBooking && asksToBook) {
    return {
      reply: "Perfect! I have reserved that provisional slot for you with Dr. Reynolds. To confirm your booking and send your SMS reminder & clinic location pin, please share your Full Name and Mobile Phone Number.",
      suggestedAction: "Lead Capture",
      treatmentIdentified: currentLead?.treatment || "Dental Consultation",
      estimatedValue: currentLead?.estimatedValue || "₹1,000"
    };
  }

  if (declinesBooking) {
    return {
      reply: "No problem—you don't need to book. I can answer questions about treatments, prices, or clinic information whenever you're ready.",
      suggestedAction: null,
      treatmentIdentified: currentLead?.treatment || "General Consultation",
      estimatedValue: currentLead?.estimatedValue || "₹1,000"
    };
  }

  // General default response
  return {
    reply: "Hello! Welcome to NovaDental & Wellness. I'm Nova, your 24/7 AI Clinic Assistant. I can help you check treatment costs, check doctor availability, or book a consultation in under 60 seconds. What can I help you with today?",
    suggestedAction: "Greeting",
    treatmentIdentified: "General Consultation",
    estimatedValue: "₹1,000"
  };
}
