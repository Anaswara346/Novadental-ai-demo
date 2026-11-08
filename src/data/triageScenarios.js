export const presetScenarios = [
  {
    id: "cardiac-alert",
    title: "🚨 Acute Chest Pressure (Emergency)",
    category: "Emergency Red Flag",
    data: {
      age: "58",
      sex: "Male",
      symptoms: "Sudden crushing retrosternal chest tightness radiating to the left jaw and shoulder, accompanied by cold diaphoresis and mild shortness of breath while resting.",
      duration: "45 minutes",
      painLevel: 9,
      conditions: "Hypertension, Hyperlipidemia, Type 2 Diabetes",
    },
    expectedTriage: {
      triageLevel: "EMERGENCY",
      urgencyColor: "red",
      recommendedSpecialty: "Emergency Medicine / Interventional Cardiology",
      recommendedAction: "CALL EMERGENCY SERVICES (911 / 000 / 112) IMMEDIATELY. Do not drive to hospital.",
      redFlagsIdentified: [
        "Crushing retrosternal chest pain at rest",
        "Radiation to left shoulder/jaw",
        "Diaphoresis (cold sweats) with dyspnea",
        "Multiple cardiovascular risk factors (Age >55, HTN, T2D)"
      ],
      potentialConsiderations: [
        "Acute Coronary Syndrome (ACS) / Myocardial Infarction",
        "Aortic Dissection (rule-out required)",
        "Pulmonary Embolism (rule-out required)"
      ],
      questionsForDoctor: [
        "Has an emergency 12-lead ECG and high-sensitivity Troponin test been initiated?",
        "Is patient candidate for immediate catheterization / reperfusion?",
        "Are antiplatelet protocols (Aspirin 300mg) safe to administer immediately?"
      ],
      soapNote: {
        subjective: "58yo male presents with acute onset (45 min) severe crushing substernal chest pressure (9/10) radiating to left jaw/shoulder with associated diaphoresis and dyspnea at rest. PMHx: HTN, T2D, Hyperlipidemia.",
        objective: "Patient in acute distress, cold clammy extremities, tachypneic. Pain score 9/10.",
        assessmentTriage: "High probability Acute Coronary Syndrome. Level 1 Emergency Triage classification.",
        planRecommended: "Immediate Emergency Department activation. Continuous telemetry, IV access, STAT 12-lead ECG, serial Troponin I, supplemental O2 if SpO2 < 94%."
      },
      safetyDisclaimer: "CRITICAL: This AI system has detected potential life-threatening symptoms. Please contact your local emergency response service immediately."
    }
  },
  {
    id: "neuro-migraine",
    title: "⚡ Unilateral Throbbing Headache with Aura",
    category: "Neurology / Urgent",
    data: {
      age: "31",
      sex: "Female",
      symptoms: "Throbbing pain on the right side of the head, preceded by zigzag visual flashes (scintillating scotoma). Extreme sensitivity to bright lights (photophobia) and nausea.",
      duration: "3 hours",
      painLevel: 7,
      conditions: "Previous episode 6 months ago, no daily medications",
    },
    expectedTriage: {
      triageLevel: "URGENT",
      urgencyColor: "orange",
      recommendedSpecialty: "Neurology / Primary Care Physician",
      recommendedAction: "Schedule a same-day or priority outpatient consultation; avoid driving during visual aura.",
      redFlagsIdentified: [
        "Severe unilateral pain with neurological aura",
        "Photophobia and nausea interfering with basic tasks"
      ],
      potentialConsiderations: [
        "Migraine with typical aura",
        "Cluster headache variant",
        "Tension headache with autonomic symptoms"
      ],
      questionsForDoctor: [
        "Would triptans or CGRP antagonists be appropriate for abortive therapy?",
        "Should prophylactic lifestyle or medical adjustments be initiated given recurrent episodes?",
        "Are red flags (thunderclap onset, neurological deficit) safely ruled out?"
      ],
      soapNote: {
        subjective: "31yo female with 3-hour history of severe throbbing right hemicranial headache (7/10) preceded by visual scotoma. Nausea and severe photophobia reported. No focal limb weakness.",
        objective: "Alert and oriented x4. Pain distress visible. No reported loss of consciousness.",
        assessmentTriage: "Consistent with Migraine with Aura. Triage Level 2: Urgent ambulatory or urgent care visit.",
        planRecommended: "Rest in dark quiet room, oral hydration, consult GP or Urgent Care for abortive regimen. Escalate immediately if 'thunderclap' peak within seconds or weakness develops."
      },
      safetyDisclaimer: "Notice: Informational triage assessment only. Not a medical diagnosis. If you experience the 'worst headache of your life' or sudden weakness, seek immediate emergency care."
    }
  },
  {
    id: "pediatric-fever",
    title: "👶 Toddler High Fever & Ear Tugging",
    category: "Pediatrics",
    data: {
      age: "3",
      sex: "Female",
      symptoms: "Fever of 39.1°C (102.4°F), continuous crying, repeatedly tugging at the right ear, reduced appetite, but drinking fluids and producing wet diapers.",
      duration: "24 hours",
      painLevel: 6,
      conditions: "Recent common cold 4 days ago",
    },
    expectedTriage: {
      triageLevel: "URGENT",
      urgencyColor: "orange",
      recommendedSpecialty: "Pediatrics / Family Medicine",
      recommendedAction: "Schedule a pediatric appointment within 12-24 hours for otoscopic examination.",
      redFlagsIdentified: [
        "High febrile state in pediatric patient (>39°C)",
        "Persistent localized distress (right ear)"
      ],
      potentialConsiderations: [
        "Acute Otitis Media (middle ear infection)",
        "Upper Respiratory Tract Infection (viral)",
        "Teething discomfort (secondary)"
      ],
      questionsForDoctor: [
        "Does the tympanic membrane show erythema or bulging indicative of bacterial otitis?",
        "What is the recommended weight-adjusted antipyretic dosing (Paracetamol/Ibuprofen)?",
        "What are the watch-and-wait guidelines versus immediate antibiotic therapy?"
      ],
      soapNote: {
        subjective: "3yo female brought in with 24-hr fever (39.1°C), inconsolable crying, and right ear tugging. Following recent viral URI. Fluid intake preserved, normal urinary output.",
        objective: "Febrile, irritable, interactive. No nuchal rigidity reported.",
        assessmentTriage: "Probable Acute Otitis Media secondary to viral URI. Urgent pediatric evaluation recommended.",
        planRecommended: "Pediatric assessment within 12-24 hrs. Weight-appropriate antipyretics for comfort. Immediate ED evaluation if lethargy, rash, or breathing difficulty occurs."
      },
      safetyDisclaimer: "Pediatric Advisory: Consult a pediatrician or call emergency services if child becomes unresponsive, refuses all fluids, or exhibits a stiff neck."
    }
  },
  {
    id: "lumbar-strain",
    title: "🏃 Lower Back Ache After Heavy Lifting",
    category: "Orthopedics / Non-Urgent",
    data: {
      age: "42",
      sex: "Male",
      symptoms: "Dull aching pain across lower lumbar region after lifting heavy furniture yesterday. Pain worsens when bending forward. No bowel/bladder changes, no numbness down legs.",
      duration: "2 days",
      painLevel: 4,
      conditions: "Sedentary desk job, otherwise healthy",
    },
    expectedTriage: {
      triageLevel: "NON_URGENT",
      urgencyColor: "yellow",
      recommendedSpecialty: "Physical Therapy / Sports Medicine / General Practice",
      recommendedAction: "Standard appointment with General Practitioner or Physical Therapist within 3-5 days. Gentle mobility encouraged.",
      redFlagsIdentified: [
        "None. No cauda equina signs (bowel/bladder intact, no saddle anesthesia, no progressive motor deficits)."
      ],
      potentialConsiderations: [
        "Acute Musculoskeletal Lumbar Strain",
        "Mechanical facet irritation",
        "Minor postural myofascial pain"
      ],
      questionsForDoctor: [
        "Are targeted core stabilization exercises indicated once acute discomfort subsides?",
        "Are short-term NSAIDs or heat/ice cycling recommended?",
        "When is it safe to resume resistance training or heavy lifting?"
      ],
      soapNote: {
        subjective: "42yo male with mechanical lower back ache (4/10) following heavy lifting 48 hrs ago. Aggravated by flexion. Negative for radiculopathy, numbness, or sphincter disturbance.",
        objective: "Ambulatory with guarded gait. Localized paraspinal tenderness.",
        assessmentTriage: "Acute mechanical lumbar strain without neurologic involvement. Non-urgent category.",
        planRecommended: "Conservative management: heat therapy, avoiding prolonged bed rest, gentle walking. Primary care / physical therapy follow-up if symptoms persist past 14 days."
      },
      safetyDisclaimer: "Standard Advisory: Contact a healthcare provider immediately if you develop numbness in the groin/buttocks or lose control of bowel or bladder."
    }
  }
];

// Algorithmic / Prompt-driven fallback triage generator
export function analyzePatientIntake(intake) {
  const text = `${intake.symptoms} ${intake.conditions || ''}`.toLowerCase();
  const pain = Number(intake.painLevel) || 5;

  // Red Flag rule matching (Chest, Stroke, Severe Dyspnea)
  const isEmergency = 
    text.includes("chest") || 
    text.includes("heart") || 
    text.includes("crushing") || 
    text.includes("stroke") || 
    text.includes("facial droop") || 
    text.includes("slurred") || 
    text.includes("cannot breathe") || 
    text.includes("unconscious") ||
    (pain >= 9 && (text.includes("severe") || text.includes("sudden")));

  if (isEmergency) {
    return {
      triageLevel: "EMERGENCY",
      urgencyColor: "red",
      recommendedSpecialty: "Emergency Medicine / Trauma Services",
      recommendedAction: "IMMEDIATE EMERGENCY RESPONSE REQUIRED. Call 911 / 000 / 112 immediately. Do not transport yourself.",
      redFlagsIdentified: [
        "Acute presentation with potential vital organ involvement",
        "High pain/distress score requiring immediate physician assessment",
        "Critical signs consistent with acute cardiovascular or neurologic urgency"
      ],
      potentialConsiderations: [
        "Acute Cardiopulmonary or Neurological Event",
        "Severe Acute Presentation requiring rapid stabilization"
      ],
      questionsForDoctor: [
        "Has emergency diagnostic stabilization been initiated?",
        "Are vital signs monitored continuously?"
      ],
      soapNote: {
        subjective: `Patient (${intake.age || 'Adult'}yo, ${intake.sex || 'Unknown'}) presents with acute symptoms: "${intake.symptoms}". Duration: ${intake.duration}. Pain: ${intake.painLevel}/10.`,
        objective: "High triage distress index triggered by critical keyword markers.",
        assessmentTriage: "EMERGENCY Category 1. Potential life-threatening presentation.",
        planRecommended: "Dispatch emergency medical services. Avoid oral intake until medical evaluation."
      },
      safetyDisclaimer: "CRITICAL: Urgent medical assistance required immediately. This tool does not provide diagnosis."
    };
  }

  // Urgent criteria
  const isUrgent = 
    pain >= 7 || 
    text.includes("fever") || 
    text.includes("vomiting") || 
    text.includes("infection") || 
    text.includes("ear") || 
    text.includes("migraine") || 
    text.includes("bleeding");

  if (isUrgent) {
    return {
      triageLevel: "URGENT",
      urgencyColor: "orange",
      recommendedSpecialty: "Urgent Care / Specialist Clinic",
      recommendedAction: "Schedule a same-day or priority appointment within 12-24 hours.",
      redFlagsIdentified: [
        `Elevated pain scale reported (${pain}/10)`,
        "Acute symptom cluster requiring direct physical examination"
      ],
      potentialConsiderations: [
        "Acute inflammatory, infectious, or moderate pain condition requiring clinical investigation"
      ],
      questionsForDoctor: [
        "What targeted laboratory or imaging tests are recommended?",
        "What is the symptom management plan during the next 48 hours?"
      ],
      soapNote: {
        subjective: `Patient (${intake.age || 'Adult'}yo, ${intake.sex || 'Unknown'}) reports: "${intake.symptoms}". Duration: ${intake.duration}. Pain: ${intake.painLevel}/10. Pre-existing: ${intake.conditions || 'None'}.`,
        objective: "Non-critical distress index, acute symptom burden noted.",
        assessmentTriage: "URGENT Priority 2. Clinical review recommended within 24 hours.",
        planRecommended: "Urgent ambulatory clinic or outpatient consultation. Supportive care as advised by doctor."
      },
      safetyDisclaimer: "Informational Triage Only: Not a definitive medical diagnosis. Escalate if symptoms worsen abruptly."
    };
  }

  // Non-urgent
  return {
    triageLevel: "NON_URGENT",
    urgencyColor: "yellow",
    recommendedSpecialty: "Primary Care / Family Physician / Allied Health",
    recommendedAction: "Schedule a routine general practitioner consultation at your convenience.",
    redFlagsIdentified: [
      "No acute red flags detected in current intake parameters"
    ],
    potentialConsiderations: [
      "Subacute or mild musculoskeletal / functional symptom presentation"
    ],
    questionsForDoctor: [
      "Are lifestyle or supportive physical therapies recommended?",
      "Under what conditions should follow-up care be scheduled?"
    ],
    soapNote: {
      subjective: `Patient (${intake.age || 'Adult'}yo, ${intake.sex || 'Unknown'}) presents with: "${intake.symptoms}". Duration: ${intake.duration}. Pain: ${intake.painLevel}/10.`,
      objective: "Stable presentation with low acuity index.",
      assessmentTriage: "NON-URGENT Priority 3/4. Outpatient management appropriate.",
      planRecommended: "Routine primary care follow-up. Standard symptom monitoring and hydration."
    },
    safetyDisclaimer: "Notice: AI Triage Assistant provides guidance, not diagnosis. Always consult a qualified physician."
  };
}
