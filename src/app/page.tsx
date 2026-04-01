"use client";

import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { HeroBanner } from "../components/sections/HeroBanner";
import { PartnerSection } from "../components/sections/PartnerSection";
import { ExamRules } from "../components/sections/ExamRules";
import { RegistrationForm } from "../components/sections/RegistrationForm";
import { LookupSection } from "../components/sections/LookupSection";

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main>
        <HeroBanner />
        <PartnerSection />
        <ExamRules />
        <RegistrationForm />
        <LookupSection />
      </main>
      <Footer />
    </div>
  );
}

