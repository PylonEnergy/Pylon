import type { Metadata } from "next";
import HeroBanner from "@/components/home/HeroBanner";
import TrustStats from "@/components/home/TrustStats";
import Accreditations from "@/components/home/Accreditations";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ServicesSection from "@/components/home/ServicesSection";
import BrandsCarousel from "@/components/home/BrandsCarousel";
import CustomerReviews from "@/components/home/CustomerReviews";
import InstallationProcess from "@/components/home/InstallationProcess";
import SolarPackages from "@/components/home/SolarPackages";
import SolarCalculator from "@/components/SolarCalculator";
import EVChargingSection from "@/components/home/EVChargingSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "Pylon Energy — Solar Panels & Battery Storage | NSW Australia",
  description:
    "Pylon Energy Pty Ltd — Premium solar panels, battery storage & EV charger installation across NSW. CEC Approved. 25-Year Warranties. Save up to $3,500 with 2026 government rebates. Get a free quote today.",
  alternates: {
    canonical: "https://pylonenergy.com.au",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <TrustStats />
      <Accreditations />
      <WhyChooseUs />
      <ServicesSection />
      <BrandsCarousel />
      <CustomerReviews />
      <InstallationProcess />
      <SolarPackages />
      <SolarCalculator />
      <EVChargingSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
