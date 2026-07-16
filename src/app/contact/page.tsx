import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Pylon Energy",
  description: "Reach our local NSW support office. Ask questions, file support requests, or request solar system consultations.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Pylon Energy"
        subtitle="Get in touch with our team of clean energy experts. We're here to help you make the transition to solar energy."
        breadcrumbs={[{ label: "Contact Us" }]}
      />

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            
            {/* Phone */}
            <div className="card p-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#E8F7FD] flex items-center justify-center mb-4">
                <Phone className="text-pe-cyan" size={20} />
              </div>
              <h3 className="font-bold text-pe-navy mb-2">Phone</h3>
              <p className="text-pe-gray-500 text-sm mb-4">Call our local NSW support team</p>
              <a href="tel:1300001598" className="font-mono font-bold text-pe-navy hover:text-pe-cyan transition-colors">
                1300 001 598
              </a>
            </div>

            {/* Email */}
            <div className="card p-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#E8F7FD] flex items-center justify-center mb-4">
                <Mail className="text-pe-cyan" size={20} />
              </div>
              <h3 className="font-bold text-pe-navy mb-2">Email</h3>
              <p className="text-pe-gray-500 text-sm mb-4">Send us your queries at any time</p>
              <a href="mailto:info@pylonenergy.com.au" className="font-bold text-pe-navy hover:text-pe-cyan transition-colors">
                info@pylonenergy.com.au
              </a>
            </div>

            {/* Address */}
            <div className="card p-8 text-center flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#E8F7FD] flex items-center justify-center mb-4">
                <MapPin className="text-pe-cyan" size={20} />
              </div>
              <h3 className="font-bold text-pe-navy mb-2">Office Address</h3>
              <p className="text-pe-gray-500 text-sm mb-4">Corporate headquarters</p>
              <p className="font-semibold text-pe-navy">Sydney, NSW 2000</p>
            </div>

          </div>

          <div className="max-w-3xl mx-auto bg-pe-gray-50 rounded-3xl border border-pe-gray-200 p-8 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-pe-navy mb-2">Send us a Message</h2>
              <p className="text-pe-gray-500 text-sm">Have a general query? Fill out the form below and we will respond shortly.</p>
            </div>
            <QuoteForm />
          </div>
        </div>
      </section>
    </>
  );
}
