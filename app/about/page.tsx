export default function About() {
  return (
    <div className="bg-transparent">
      {/* Hero Section */}
      <section className="bg-[#0B132B] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">About Ryngo</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We are redefining urban mobility with a relentless focus on luxury, efficiency, and reliability.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-[#0B132B] mb-6">Our Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              To provide the most reliable, comfortable, and safe ride-hailing experience globally, empowering both riders and drivers through innovative technology and uncompromising standards.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#0B132B] mb-6">Our Vision</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              A world where premium transportation is accessible, seamless, and sustainable. We envision cities connected by intelligent mobility solutions that elevate the everyday journey.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-[#0B132B] mb-12">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="glass-card p-8 rounded-2xl hover-shadow-teal">
              <h3 className="font-bold text-[#0B132B] mb-2">Corporate Office</h3>
              <p className="text-gray-600">JET 1 TECHNOLOGY PRIVATE LIMITED<br />Mumbai, Maharashtra</p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover-shadow-teal">
              <h3 className="font-bold text-[#0B132B] mb-2">Support</h3>
              <p className="text-gray-600">
                admin@ryngo.in<br />
                +91 77188 52504<br />
                24/7 Availability
              </p>
            </div>
            <div className="glass-card p-8 rounded-2xl hover-shadow-teal">
              <h3 className="font-bold text-[#0B132B] mb-2">Partnerships</h3>
              <p className="text-gray-600">admin@ryngo.in<br />Join our network</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
