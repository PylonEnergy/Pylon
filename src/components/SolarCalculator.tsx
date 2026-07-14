"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calculator, Zap, DollarSign, Trees, ArrowRight, Sun, Battery } from "lucide-react";

export default function SolarCalculator() {
  const router = useRouter();
  const [bill, setBill] = useState(400); // default quarterly bill $400
  const [direction, setDirection] = useState<"North" | "East" | "West" | "South">("North");
  const [hasBattery, setHasBattery] = useState(false);

  // Constants for calculation
  const getSystemRecommendations = () => {
    if (bill < 250) {
      return { size: "5kW", cost: 4500, rebate: 2000, batterySize: "5kWh" };
    } else if (bill < 450) {
      return { size: "6.6kW", cost: 5500, rebate: 2500, batterySize: "10kWh" };
    } else if (bill < 700) {
      return { size: "10kW", cost: 7800, rebate: 3200, batterySize: "14kWh" };
    } else {
      return { size: "13.2kW", cost: 9800, rebate: 3500, batterySize: "28kWh" };
    }
  };

  const rec = getSystemRecommendations();

  // Efficiency factors
  const directionMultiplier = {
    North: 1.0,
    East: 0.85,
    West: 0.85,
    South: 0.6,
  };

  const baseSavingsPct = 0.7; // base solar offsets 70% of bill
  const batteryBonusPct = 0.15; // battery adds 15% savings

  const savingsPct = Math.min(
    (baseSavingsPct + (hasBattery ? batteryBonusPct : 0)) * directionMultiplier[direction],
    0.95
  );

  const annualBill = bill * 4;
  const annualSavings = Math.round(annualBill * savingsPct);

  // ROI / Payback calculations
  const netSystemCost = rec.cost + (hasBattery ? 9500 : 0) - rec.rebate;
  const paybackYears = (netSystemCost / annualSavings).toFixed(1);

  // Environmental impact (1.35 tons of CO2 offset per kW of solar per year)
  const systemSizeNum = parseFloat(rec.size);
  const co2Offset = (systemSizeNum * 1.35).toFixed(1);
  const treesPlanted = Math.round(parseFloat(co2Offset) * 16.5);

  const handleClaim = () => {
    const interestType = hasBattery ? "solar-battery" : "solarSystem";
    router.push(
      `/get-quote?postcode=&interest=${interestType}&bill=${bill}&system=${rec.size}&battery=${hasBattery ? "yes" : "no"}`
    );
  };

  return (
    <section id="calculator" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pe-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pe-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">
            <Calculator size={12} className="inline mr-1 -mt-0.5" /> ROI Calculator
          </span>
          <h2 className="section-title">
            Calculate Your <span>Solar Savings</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Find out how much you can save with premium solar systems and active NSW rebates.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls - Left side (7 cols) */}
          <div className="lg:col-span-7 bg-pe-gray-50 border border-pe-gray-200 rounded-3xl p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-8">
              {/* Bill Slider */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-bold text-pe-navy uppercase tracking-wider">
                    Average Quarterly Electricity Bill
                  </label>
                  <span className="text-2xl font-black text-pe-cyan font-mono bg-white px-3 py-1 rounded-xl shadow-sm border border-pe-gray-200">
                    ${bill}
                  </span>
                </div>
                <input
                  type="range"
                  min="150"
                  max="1500"
                  step="50"
                  value={bill}
                  onChange={(e) => setBill(Number(e.target.value))}
                  className="w-full h-2 bg-pe-gray-200 rounded-lg appearance-none cursor-pointer accent-[#29ABE2]"
                />
                <div className="flex justify-between text-xs text-pe-gray-400 font-bold mt-2">
                  <span>$150</span>
                  <span>$500</span>
                  <span>$1,000</span>
                  <span>$1,500+</span>
                </div>
              </div>

              {/* Roof Direction Selection */}
              <div>
                <label className="block text-sm font-bold text-pe-navy uppercase tracking-wider mb-3">
                  Roof Facing Direction
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {(["North", "East", "West", "South"] as const).map((dir) => (
                    <button
                      key={dir}
                      type="button"
                      onClick={() => setDirection(dir)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                        direction === dir
                          ? "bg-pe-navy border-pe-navy text-white shadow-sm"
                          : "bg-white border-pe-gray-200 text-pe-gray-600 hover:bg-pe-gray-100"
                      }`}
                    >
                      {dir} {dir === "North" && "☀️"}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-pe-gray-400 font-bold mt-2">
                  * North-facing roofs receive maximum solar production in Australia.
                </p>
              </div>

              {/* Battery Inclusion */}
              <div>
                <label className="block text-sm font-bold text-pe-navy uppercase tracking-wider mb-3">
                  Include Battery Storage?
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setHasBattery(true)}
                    className={`flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-black border transition-all ${
                      hasBattery
                        ? "bg-pe-cyan border-pe-cyan text-white shadow-sm"
                        : "bg-white border-pe-gray-200 text-pe-gray-600 hover:bg-pe-gray-100"
                    }`}
                  >
                    <Battery size={16} /> Yes, include Battery
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasBattery(false)}
                    className={`flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-black border transition-all ${
                      !hasBattery
                        ? "bg-pe-navy border-pe-navy text-white shadow-sm"
                        : "bg-white border-pe-gray-200 text-pe-gray-600 hover:bg-pe-gray-100"
                    }`}
                  >
                    <Sun size={16} /> Solar Panels Only
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-pe-gray-200">
              <button
                onClick={handleClaim}
                className="btn-primary w-full py-4 text-base font-black justify-center gap-2"
              >
                Claim My NSW Rebate &amp; Get Quote <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* Results Display - Right side (5 cols) */}
          <div className="lg:col-span-5 bg-pe-navy text-white rounded-3xl p-8 flex flex-col justify-between shadow-md relative overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 19px, #fff 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, #fff 20px)",
              }} />
            </div>

            <div className="relative z-10 space-y-6">
              <h3 className="text-lg font-black tracking-wide border-b border-white/10 pb-3 flex items-center gap-2">
                <Zap className="text-pe-cyan fill-pe-cyan" size={20} /> Projected Outcomes
              </h3>

              {/* Recommended System Size */}
              <div>
                <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest">
                  Recommended System
                </p>
                <p className="text-3xl font-black text-pe-cyan font-mono">
                  {rec.size}
                  {hasBattery && <span className="text-white text-lg font-sans font-medium ml-1"> + {rec.batterySize} Battery</span>}
                </p>
              </div>

              {/* Estimated Annual Savings */}
              <div>
                <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest">
                  Estimated Annual Savings
                </p>
                <p className="text-4xl font-black text-green-400 font-mono flex items-center">
                  <DollarSign size={28} className="-mr-1.5" />
                  {annualSavings.toLocaleString()}
                  <span className="text-white/60 text-xs font-sans font-semibold ml-2">/ year</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                {/* Payback Period */}
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest">
                    Payback Period
                  </p>
                  <p className="text-2xl font-black font-mono mt-0.5">
                    {paybackYears} <span className="text-xs font-sans font-medium text-white/60">Years</span>
                  </p>
                </div>

                {/* Govt Rebate Saved */}
                <div>
                  <p className="text-[10px] uppercase font-bold text-white/50 tracking-widest">
                    Upfront Rebate
                  </p>
                  <p className="text-2xl font-black text-pe-cyan font-mono mt-0.5">
                    ${rec.rebate}
                  </p>
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 mt-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Trees className="text-green-400" size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-green-400">Green Impact</p>
                  <p className="text-xs text-white/70 mt-0.5">
                    Off-setting <strong className="text-white font-mono">{co2Offset}</strong> tons of CO2 annually. That is equivalent to planting <strong className="text-white font-mono">{treesPlanted}</strong> trees every single year!
                  </p>
                </div>
              </div>
            </div>

            <div className="relative z-10 text-[10px] text-white/40 font-semibold mt-8 text-center">
              * Calculations are estimations based on standard NSW residential usage and feed-in tariffs. Actual results may vary.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
