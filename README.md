# NovaDental AI — 24/7 Clinic Lead Generation & Booking Automation

> **Practical Assessment Submission for AI Growth & Automation Associate (WFH)**  
> **Company:** Gokul Infocare  
> **Domain:** Healthcare & Technology / Sales & Workflow Automation  
> **Candidate Project:** NovaDental AI  

---

## 🌟 Executive Overview

**NovaDental AI** is an intelligent clinic website and 24/7 autonomous booking concierge designed to solve one of the biggest growth bottlenecks for healthcare and dental practices: **after-hours lead drop-off**.

Most private clinics lose potential patients when prospective patients visit websites outside business hours. NovaDental AI demonstrates how a website could engage visitors, answer pricing inquiries, qualify treatment interest, and capture booking requests in a staff dashboard. All clinic prices and lead records in this prototype are illustrative demo data, not verified rates or real patient information.

Submitted demo leads persist in the current browser using `localStorage`, so they remain after refresh. They are not sent to a server and are not shared across browsers or devices.

---

## 🚀 Key Features

* **High-Converting Clinic Website:** Professional, trustworthy dental & wellness frontend with clear service breakdowns and transparent pricing.
* **24/7 AI Booking Concierge (Nova):**
  * Instant responses to common patient inquiries (Teeth Whitening, Emergency Toothache, Clear Aligners, Routine Checkup).
  * Quick 1-click test prompts for instant demonstration.
  * Captures patient name, phone number, and preferred appointment time.
* **Live Staff CRM & Leads Pipeline:**
  * Demo lead dashboard showing Total Leads Captured, an illustrative INR Revenue Pipeline (₹1,30,800 from sample records), and example response-time metrics.
  * Table of qualified inbound patients with 1-click call/contact actions.
* **Intent-Driven Qualification Engine:**
  * Automatically tags high-intent leads (e.g., Urgent Emergency vs. High-Ticket Cosmetic).

---

## 🛠️ Tech Stack & AI Methodologies

* **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons
* **Chat prototype:** Rule-based response simulation (no live LLM integration)
  * Intent Classification & Procedural Extraction
  * Conversion-Driven Guardrails & Lead Capture Rules
  * Dynamic Pipeline Revenue Estimation

---

## 📦 How to Run Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production deployment
npm run build
```

The app will be live at `http://localhost:5173`.

---

## 📁 Repository Structure

```
├── PROMPT_DOCUMENTATION.md   # Prompt engineering iterations & rationale (Deliverable 2)
├── README.md                 # Project architecture & overview
├── index.html                # App entry HTML
├── package.json              # Project dependencies
├── tailwind.config.js        # Styling configuration
├── src/
│   ├── App.jsx               # Clinic website, AI chatbox & Staff CRM dashboard
│   ├── main.jsx              # Application mounting
│   ├── index.css             # Tailwind styling
│   └── data/
│       └── clinicData.js     # Services pricing, initial CRM leads & AI response logic
└── dist/                     # Optimized production bundle (Deploy-ready)
```

---

## 🎥 Video Presentation Script (Rubric Breakdown)

When recording your 2-minute video presentation:
1. **0:00 - 0:30 (Problem & Tool Choice):**
   *"I built NovaDental AI to solve a critical growth problem in healthcare: clinics lose up to 45% of potential patients who visit their website after hours. I used React, Tailwind CSS, and LLM Prompt Engineering to create an autonomous 24/7 booking assistant that captures leads and fills the clinic calendar automatically."*
2. **0:30 - 1:00 (Prompt Engineering):**
   *"I iterated through three prompt designs for the concept. The website prototype demonstrates treatment-intent responses and a sample lead dashboard; it uses rule-based replies and does not connect to a real clinic CRM."*
3. **1:00 - 1:40 (Live Walkthrough):**
   * Demonstrate sending a chat: *"I have severe tooth pain and need an emergency appointment today."*
   * Show how the AI offers immediate emergency slots and opens the booking form.
   * Enter a test name and phone number, confirm the booking, then switch to the **"Staff CRM & Leads Dashboard"** tab to show the new lead appear instantly with its estimated revenue value.
4. **1:40 - 2:00 (Business Impact & Conclusion):**
   *"This project demonstrates how AI growth and automation can turn passive website traffic into booked revenue, saving front-desk staff hours of manual phone coordination."*
