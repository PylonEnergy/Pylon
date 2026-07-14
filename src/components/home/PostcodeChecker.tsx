"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function PostcodeChecker() {
  const router = useRouter();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    e.target.value = val ? val[val.length - 1]! : "";
    if (val && index < 3) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    digits.split("").forEach((d, i) => {
      if (inputsRef.current[i]) inputsRef.current[i]!.value = d;
    });
    inputsRef.current[Math.min(digits.length, 3)]?.focus();
  };

  const handleSubmit = () => {
    const postcode = inputsRef.current.map((el) => el?.value ?? "").join("");
    if (postcode.length === 4) {
      const codeNum = parseInt(postcode, 10);
      
      // Determine redirection route based on Australian Postcode ranges
      if (codeNum >= 4000 && codeNum <= 4999) {
        // Queensland
        router.push(`/services/residential-solar?state=QLD&postcode=${postcode}`);
      } else if (codeNum >= 2000 && codeNum <= 2999) {
        // New South Wales
        router.push(`/services/residential-solar?state=NSW&postcode=${postcode}`);
      } else if (codeNum >= 3000 && codeNum <= 3999) {
        // Victoria
        router.push(`/services/residential-solar?state=VIC&postcode=${postcode}`);
      } else if (codeNum >= 5000 && codeNum <= 5999) {
        // South Australia
        router.push(`/services/residential-solar?state=SA&postcode=${postcode}`);
      } else if (codeNum >= 6000 && codeNum <= 6999) {
        // Western Australia
        router.push(`/services/residential-solar?state=WA&postcode=${postcode}`);
      } else {
        // Default fallback to get-quote page
        router.push(`/get-quote?postcode=${postcode}`);
      }
    } else {
      inputsRef.current.find((el) => !el?.value)?.focus();
    }
  };

  return (
    <div className="bg-white shadow-[0_4px_30px_rgba(0,43,92,0.08)] border-b border-pe-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Label */}
          <div className="text-center sm:text-left">
            <p className="font-black text-pe-navy text-sm uppercase tracking-widest">
              Check for Battery Offers
            </p>
            <p className="text-pe-gray-500 text-xs mt-0.5">Enter your postcode to see local deals</p>
          </div>

          {/* Postcode inputs */}
          <div className="flex items-center gap-2">
            <p className="text-pe-gray-500 text-sm mr-1 hidden md:block">Enter Your Postcode!</p>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  ref={(el) => { inputsRef.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  placeholder="0"
                  aria-label={`Postcode digit ${i + 1}`}
                  onChange={(e) => handleInput(i, e)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-black text-pe-navy border-2 border-pe-navy/30 rounded-xl focus:border-pe-navy focus:outline-none transition-colors bg-pe-gray-50"
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className="btn-primary flex items-center gap-2 whitespace-nowrap"
          >
            Enter Postcode for Special Offer! <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
