"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, ChevronRight } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    { title: "1. Scope and applicability", icon: Shield },
    { title: "2. Information we collect", icon: Eye },
    { title: "3. How we use your information", icon: FileText },
    { title: "4. Legal bases for processing", icon: Lock },
    { title: "5. Sharing of your information", icon: Shield },
    { title: "6. Data retention", icon: FileText },
    { title: "7. Cookies and similar technologies", icon: Eye },
    { title: "8. Your rights", icon: Shield },
    { title: "9. Data security", icon: Lock },
    { title: "10. Children's data", icon: FileText },
    { title: "11. Changes to this Privacy Policy", icon: FileText },
    { title: "12. Contact and grievances", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-[#ECF4E8] pb-20">
      {/* Header */}
      <div className="bg-[#0B132B] pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent" />
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full text-emerald-400 text-sm font-bold border border-emerald-500/30"
          >
            <Shield size={16} />
            Privacy & Trust
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white"
          >
            Privacy Policy
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-gray-400 text-lg">Last updated: March 2026</p>
            <a 
              href="/privacypolicy/Privacy Policy.docx" 
              download
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white text-sm font-black transition-all flex items-center gap-2 active:scale-95"
            >
              <FileText size={18} />
              DOWNLOAD ORIGINAL POLICY
            </a>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="hidden lg:block space-y-2 sticky top-28 h-fit">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4 mb-4">Table of contents</p>
            {sections.map((s, i) => (
              <a 
                key={i} 
                href={`#section-${i + 1}`}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-white hover:text-[#0B132B] transition-all group border border-transparent hover:border-gray-100 hover:shadow-sm"
              >
                <s.icon size={16} className="text-gray-400 group-hover:text-emerald-600" />
                {s.title.split('. ')[1]}
              </a>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-12 space-y-12 text-gray-600 leading-relaxed">
              
              <section className="space-y-6">
                <p>
                  This Privacy Policy explains how <strong>JET 1 TECHNOLOGY PRIVATE LIMITED.</strong>, operating the Ryngo driver application and related services, collects, uses, shares, and protects information about you when you use our mobile application, website <a href="https://www.ryngo.in" className="text-emerald-600 font-bold hover:underline">https://www.ryngo.in</a>, and any services offered through them (together called the Platform).
                </p>
                <p>
                  By downloading, registering on, or using the Platform you agree to the terms of this Privacy Policy and consent to the collection and use of your information as described here, in line with applicable Indian laws including the Information Technology Act 2000, the rules made under it, and the Digital Personal Data Protection Act 2023, as and when notified.
                </p>
              </section>

              <section id="section-1" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">1</span>
                  Scope and applicability
                </h2>
                <p>
                  This Privacy Policy applies to drivers, driver partners, owners, and any other users who access or use the Platform to receive or provide transport services through <strong>JET 1 TECHNOLOGY PRIVATE LIMITED.</strong>
                </p>
              </section>

              <section id="section-2" className="space-y-6">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center text-sm">2</span>
                  Information we collect
                </h2>
                <p>
                  We collect different types of information when you use the Platform. Some of this information is collected directly from you, some is generated during use of the Platform, and some is collected automatically from your device.
                </p>
                
                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="font-black text-[#0B132B] text-lg">2.1 Information you provide directly</h3>
                    <ul className="list-disc pl-5 space-y-3 text-sm">
                      <li><strong>Profile information</strong>, such as your name, mobile number, email address, date of birth, photograph, language preference and communication preferences.</li>
                      <li><strong>Identity and KYC information</strong>, such as driving licence details, PAN, Aadhaar number, voter ID, address proof, and any other documents submitted during registration or verification.</li>
                      <li><strong>Vehicle and permit information</strong>, such as registration certificate, vehicle make, model and year, fitness certificate, insurance details, permit details, taxi badge, and any related documents required by law or by the cooperative.</li>
                      <li><strong>Banking and payment information</strong>, such as bank account details, UPI ID, subscription payment information, or other payment instrument details needed to settle payouts or subscriptions.</li>
                      <li><strong>Support and communication information</strong>, such as queries, feedback, complaints, and any documents or screenshots you share with our support or grievance team.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-black text-[#0B132B] text-lg">2.2 Information collected automatically</h3>
                    <ul className="list-disc pl-5 space-y-3 text-sm">
                      <li><strong>Location data</strong>, including precise or approximate location of your device while the app is running in the foreground or background. This is used to offer rides, match you to riders, track trips, calculate fares, and ensure safety and compliance.</li>
                      <li><strong>Usage data</strong>, such as dates and times of access, pages or screens viewed, app features used, ride acceptance and completion details, search queries, and crash or performance logs.</li>
                      <li><strong>Device data</strong>, such as device model, operating system and version, device identifiers, app version, IP address, network type, language, and other technical details that help improve stability and security.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-black text-[#0B132B] text-lg">2.3 Information from communications and interactions</h3>
                    <ul className="list-disc pl-5 space-y-3 text-sm">
                      <li><strong>Communications data</strong>, including time and date of calls, messages, and in app chats between you and riders or support teams, as well as the content of those communications where recording or storage is necessary for safety, dispute resolution, or quality checks, subject to applicable law.</li>
                      <li><strong>Feedback and ratings</strong> given by riders about you and your service, and any responses or explanations you provide.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="section-3" className="space-y-6">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-sm">3</span>
                  How we use your information
                </h2>
                <p>We use the information described above for the following purposes.</p>
                
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-black text-[#0B132B]">3.1 To operate and provide the Platform</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm italic">
                      <li>To create, verify, and manage your driver account on the Platform.</li>
                      <li>To onboard you as a cooperative member or driver partner in line with the cooperative bye laws and policies.</li>
                      <li>To match you with riders requesting trips, determine routes, calculate fares, and enable navigation.</li>
                      <li>To process payments from riders where applicable and settle payouts or subscriptions owed by you.</li>
                      <li>To provide customer and driver support, resolve technical issues, and respond to your requests.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-black text-[#0B132B]">3.2 Safety, security, and compliance</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm italic">
                      <li>To verify your identity, eligibility, and driving credentials as required under law or by transport authorities.</li>
                      <li>To detect and prevent fraud, misuse, unsafe behaviour, or violations of cooperative rules or platform policies.</li>
                      <li>To investigate incidents, accidents, safety complaints, or disputes between riders and drivers.</li>
                      <li>To comply with directions issued by courts, law enforcement agencies, or government departments.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-black text-[#0B132B]">3.3 Improvement and analytics</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm italic">
                      <li>To monitor usage of the Platform and improve performance, reliability, and user experience.</li>
                      <li>To analyse ride patterns, demand and supply, pricing, safety incidents, and cooperative operations.</li>
                      <li>To develop new features, services, training modules, and welfare schemes for drivers and riders.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-black text-[#0B132B]">3.4 Communication</h3>
                    <ul className="list-disc pl-5 space-y-2 text-sm italic">
                      <li>To send you information about rides, payments, subscriptions, safety alerts, app updates, and policy changes.</li>
                      <li>To share cooperative news, training programmes, welfare initiatives, and other information relevant to drivers.</li>
                      <li>To send legally required notices and information relating to your membership or use of the Platform.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="section-4" className="space-y-4">
                 <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">4</span>
                  Legal bases for processing
                </h2>
                <p>Where required by law, we process your personal data based on one or more of the following legal bases.</p>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  <li>Your consent to use specific types of data or enable particular features.</li>
                  <li>Performance of a contract with you, such as the terms of service or cooperative membership terms.</li>
                  <li>Compliance with legal obligations under transport, taxation, cooperative, and data protection laws.</li>
                  <li>Legitimate interests of the cooperative and its members, including safety, security, improvement of services, and prevention of fraud, provided your rights are not overridden.</li>
                </ul>
              </section>

              <section id="section-5" className="space-y-6">
                 <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center text-sm">5</span>
                  Sharing of your information
                </h2>
                <p>We do not sell your personal data. We share your information only as necessary for the operation of the Platform, delivery of services, compliance with law, or protection of rights and safety.</p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-black text-[#0B132B]">5.1 Sharing with riders and other users</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm italic">
                      <li>With riders, we may share your name, photograph, vehicle details, location during an active trip, ratings, and other information needed for a safe and transparent trip experience.</li>
                      <li>Where ride sharing or pooling features are introduced in future, certain trip related information may be shared among riders in the same trip.</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-[#0B132B]">5.2 Service providers and partners</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm italic">
                      <li>Payment and banking partners who process rider payments and driver payouts or subscriptions.</li>
                      <li>Hosting, cloud, and information technology service providers that store or process Platform data for us.</li>
                      <li>Analytics, safety, and security service providers who help detect fraud, improve safety, and maintain system health.</li>
                      <li>Agencies and partners who assist in driver training, welfare schemes, insurance offerings, or support services.</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-[#0B132B]">5.3 Government, regulators, and law enforcement</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm italic">
                      <li>Transport authorities, enforcement agencies, or courts, where disclosure is required under applicable law, regulation, or court order.</li>
                      <li>Government departments or statutory bodies that oversee cooperative societies, transport operations, taxation, or data protection compliance.</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-black text-[#0B132B]">5.4 Business and cooperative structure</h3>
                    <ul className="list-disc pl-5 space-y-1 text-sm italic">
                      <li>Within Sahakar Taxi Cooperative Ltd. and its authorised committees or entities, for internal reporting, compliance, and governance.</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="section-6" className="space-y-4">
                 <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center text-sm">6</span>
                  Data retention
                </h2>
                <p>We retain your information only for as long as necessary to fulfil the purposes described in this Privacy Policy, to comply with legal, regulatory, accounting, or reporting requirements, and to resolve disputes.</p>
                <ul className="list-disc pl-5 space-y-2 text-sm italic">
                  <li>Ride, payment, and transaction records may be kept for periods prescribed by tax, transport, cooperative, and other applicable laws.</li>
                  <li>Location and trip data may be kept for a limited period for safety, investigation, fraud prevention, and operational analysis.</li>
                  <li>Support and grievance records may be stored for as long as required to address issues and maintain audit trails.</li>
                </ul>
                <p>You may request deletion of your account and personal data, and we will act on such requests in line with applicable laws and legitimate business or legal needs to retain certain data.</p>
              </section>

              <section id="section-7" className="space-y-4">
                 <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-sm">7</span>
                  Cookies and similar technologies
                </h2>
                <p>Our website and Platform may use cookies and similar technologies to recognise your browser, remember your preferences, improve performance, and measure usage. You can set your browser to block or alert you about cookies, although some features may not work correctly if cookies are disabled.</p>
              </section>

              <section id="section-8" className="space-y-4">
                 <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">8</span>
                  Your rights
                </h2>
                <p>Subject to applicable law, you may have the following rights in relation to your personal data.</p>
                <ul className="list-disc pl-5 space-y-2 text-sm italic font-medium">
                  <li>Right to access the information we hold about you.</li>
                  <li>Right to correct or update inaccurate or incomplete information.</li>
                  <li>Right to withdraw consent for specific processing where processing is based on consent.</li>
                  <li>Right to request deletion of your data, subject to legal and contractual obligations.</li>
                  <li>Right to raise concerns or complaints about how your data is handled.</li>
                </ul>
                <p>To exercise these rights, you can use the options available inside the app where enabled, or contact us using the details in the Contact and grievances section.</p>
              </section>

              <section id="section-9" className="space-y-4">
                 <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-sm">9</span>
                  Data security
                </h2>
                <p>We use a combination of technical and organisational measures to protect your personal data from unauthorised access, disclosure, alteration, or destruction. These measures may include encryption in transit, access controls, secure storage, and regular monitoring of systems.</p>
                <p>While we take reasonable steps to secure your data, no system is completely immune to security risks, and you are encouraged to also take steps such as keeping your device secure, using strong passwords or screen locks, and not sharing one time passwords or login details with anyone.</p>
              </section>

              <section id="section-10" className="space-y-4">
                 <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center text-sm">10</span>
                  Children's data
                </h2>
                <p>The Platform is intended for adult drivers who meet the legal age and eligibility criteria to hold a driving licence and to enter into binding contracts. We do not knowingly collect personal data from children. If you believe that a child has provided data through the Platform, please contact us and we will take appropriate steps.</p>
              </section>

              <section id="section-11" className="space-y-4 border-t border-gray-100 pt-8">
                 <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 flex items-center justify-center text-sm">11</span>
                  Changes to this Privacy Policy
                </h2>
                <p>We may update this Privacy Policy from time to time to reflect changes in law, technology, or our services. When we make material changes, we will update the effective date at the top of this page and may provide additional notice through the app or by other means.</p>
                <p>Continued use of the Platform after changes are published will mean that you accept those changes, to the extent permitted by law.</p>
              </section>

              <section id="section-12" className="bg-[#0B132B] text-white rounded-[32px] p-8 md:p-12 space-y-6">
                <h2 className="text-2xl font-black">12. Contact and grievances</h2>
                <div className="space-y-4 text-gray-300">
                  <p>If you have any questions, concerns, or complaints regarding this Privacy Policy or our data handling practices, you can contact us at:</p>
                  <p className="font-bold text-white text-lg">JET 1 TECHNOLOGY PRIVATE LIMITED.</p>
                  <p className="text-sm">Tulsi Height, Shop 18, Plot 25, Sec 22, Kamothe, Raigad, Raigad- 410209, Maharashtra</p>
                  <div className="flex flex-col md:flex-row gap-6 pt-2">
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-500">Email Us</p>
                        <p className="text-white font-bold">support@ryngo.in</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-500">Call Us</p>
                        <p className="text-white font-bold">+91 77188 52504</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 pt-4">For grievances related to your personal data, you may address them to the designated Grievance Officer at the same postal address and email id, with the subject line <strong>"Data protection grievance"</strong>.</p>
                </div>
              </section>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
