"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, Zap, Home, Users, Sun, Battery, DollarSign, ArrowRight } from "lucide-react";

type Step = {
  id: string;
  question: string;
  icon: React.ReactNode;
  options: { label: string; value: string; eligible: boolean | null }[];
};

const STEPS: Step[] = [
  {
    id: "state",
    question: "Which state do you live in?",
    icon: <Home size={28} />,
    options: [
      { label: "NSW", value: "nsw", eligible: true },
      { label: "VIC", value: "vic", eligible: true },
      { label: "QLD", value: "qld", eligible: true },
      { label: "SA / WA / Other", value: "other", eligible: true },
    ],
  },
  {
    id: "ownership",
    question: "Do you own or rent your home?",
    icon: <Users size={28} />,
    options: [
      { label: "I own my home", value: "own", eligible: true },
      { label: "I rent my home", value: "rent", eligible: false },
      { label: "I own a business property", value: "business", eligible: true },
    ],
  },
  {
    id: "roof",
    question: "What type of roof does your property have?",
    icon: <Sun size={28} />,
    options: [
      { label: "Tiled roof", value: "tiled", eligible: true },
      { label: "Colorbond / metal", value: "metal", eligible: true },
      { label: "Flat / concrete", value: "flat", eligible: true },
      { label: "Rented / strata building", value: "strata", eligible: false },
    ],
  },
  {
    id: "bill",
    question: "What is your average quarterly electricity bill?",
    icon: <DollarSign size={28} />,
    options: [
      { label: "Under $200", value: "low", eligible: true },
      { label: "$200 – $500", value: "medium", eligible: true },
      { label: "$500 – $1,000", value: "high", eligible: true },
      { label: "Over $1,000", value: "very_high", eligible: true },
    ],
  },
  {
    id: "battery",
    question: "Are you interested in battery storage?",
    icon: <Battery size={28} />,
    options: [
      { label: "Yes, definitely", value: "yes", eligible: true },
      { label: "Maybe, tell me more", value: "maybe", eligible: true },
      { label: "Solar only is fine", value: "no", eligible: true },
    ],
  },
];

const REBATE_INFO: Record<string, { name: string; amount: string; detail: string }> = {
  nsw: { name: "NSW Peak Demand Reduction Scheme", amount: "Up to $1,400", detail: "NSW residents with eligible solar + battery can receive rebates via the Peak Demand Reduction Scheme (PDRS)." },
  vic: { name: "Solar Homes Program", amount: "Up to $1,400", detail: "Victorian homeowners can access interest-free loans and rebates up to $1,400 for rooftop solar systems." },
  qld: { name: "QLD Battery Booster", amount: "Up to $3,000", detail: "Queensland's Battery Booster offers rebates of up to $3,000 for adding battery storage to your solar system." },
  other: { name: "Federal STCs (Small-scale Technology Certificates)", amount: "Up to $3,500", detail: "All Australians are eligible for STCs — a federal government incentive that significantly reduces your solar system cost." },
};

export default function RebateChecker() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [ineligible, setIneligible] = useState(false);
  const [complete, setComplete] = useState(false);

  const step = STEPS[currentStep];

  const handleSelect = (value: string, eligible: boolean | null) => {
    setSelected(value);
    if (eligible === false) {
      setIneligible(true);
    }
  };

  const handleNext = () => {
    if (!selected) return;
    const newAnswers = { ...answers, [step.id]: selected };
    setAnswers(newAnswers);
    setSelected(null);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelected(answers[STEPS[currentStep - 1].id] || null);
      setIneligible(false);
    }
  };

  const rebate = REBATE_INFO[answers.state || "other"];
  const progress = ((currentStep) / STEPS.length) * 100;

  if (ineligible) {
    return (
      <div className="rebate-checker">
        <div className="rebate-card rebate-result ineligible">
          <XCircle size={52} color="#ef4444" />
          <h3>You May Not Qualify for Government Rebates</h3>
          <p>Unfortunately, most solar rebates are available to homeowners — renters typically need landlord approval. However, you may still benefit from solar through a <strong>Virtual Power Plant (VPP)</strong> or a <strong>community solar arrangement</strong>.</p>
          <a href="/contact" className="rebate-cta secondary">Speak to an Advisor →</a>
          <button className="rebate-restart" onClick={() => { setIneligible(false); setCurrentStep(0); setAnswers({}); setSelected(null); }}>Start Over</button>
        </div>
      </div>
    );
  }

  if (complete) {
    return (
      <div className="rebate-checker">
        <div className="rebate-card rebate-result eligible">
          <CheckCircle2 size={52} color="#22c55e" />
          <h3>🎉 Great News — You're Likely Eligible!</h3>
          <div className="rebate-info-box">
            <span className="rebate-scheme-name">{rebate.name}</span>
            <span className="rebate-amount">{rebate.amount} in rebates</span>
            <p className="rebate-detail">{rebate.detail}</p>
          </div>
          <p className="rebate-note">Plus, all Australians qualify for federal <strong>Small-scale Technology Certificates (STCs)</strong> which can reduce your upfront cost by <strong>$2,000–$5,000</strong> depending on system size.</p>
          <a href="/get-quote" className="rebate-cta">
            Claim My Rebate — Get Free Quote <ArrowRight size={16} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rebate-checker">
      <div className="rebate-card">
        {/* Header */}
        <div className="rebate-header">
          <Zap size={20} />
          <span>Solar Rebate Eligibility Checker</span>
        </div>

        {/* Progress */}
        <div className="rebate-progress-bar">
          <div className="rebate-progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="rebate-step-label">Step {currentStep + 1} of {STEPS.length}</p>

        {/* Question */}
        <div className="rebate-question">
          <div className="rebate-icon">{step.icon}</div>
          <h3>{step.question}</h3>
        </div>

        {/* Options */}
        <div className="rebate-options">
          {step.options.map((opt) => (
            <button
              key={opt.value}
              className={`rebate-option${selected === opt.value ? " selected" : ""}`}
              onClick={() => handleSelect(opt.value, opt.eligible)}
            >
              {selected === opt.value && <CheckCircle2 size={16} />}
              {opt.label}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="rebate-nav">
          {currentStep > 0 && (
            <button className="rebate-back" onClick={handleBack}>
              <ChevronLeft size={16} /> Back
            </button>
          )}
          <button
            className="rebate-next"
            onClick={handleNext}
            disabled={!selected}
          >
            {currentStep === STEPS.length - 1 ? "Check Eligibility" : "Next"} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
