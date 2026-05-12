import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Ryngo Help Center",
  description: "Find answers to all your common queries about booking rides, fares, safety, and Mumbai routes with Ryngo.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Banner Section */}
      <section className="bg-[#0B4619] py-20 px-4 text-center mt-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
            How can we help?
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            Search our comprehensive help center for answers to questions about booking, payments, safety, and Mumbai routes.
          </p>
        </div>
      </section>

      {/* FAQ Component */}
      <section className="py-20">
        <FAQ />
      </section>

      <Footer />
    </main>
  );
}
