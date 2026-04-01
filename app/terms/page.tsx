"use client";

import { motion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  User, 
  Smartphone, 
  CreditCard, 
  XCircle, 
  MessageSquare, 
  Key, 
  FileText, 
  Copyright, 
  AlertTriangle, 
  ShieldAlert, 
  Scale, 
  Globe, 
  Mail,
  ChevronRight,
  ArrowUp
} from "lucide-react";

export default function TermsPage() {
  const sections = [
    { title: "1. Eligibility", icon: Shield },
    { title: "2. Registration and Account Data", icon: User },
    { title: "3. Software", icon: Smartphone },
    { title: "4. Payment", icon: CreditCard },
    { title: "5. Cancellation Policy", icon: XCircle },
    { title: "6. Consumer Grievances", icon: MessageSquare },
    { title: "7. License", icon: Key },
    { title: "8. Content", icon: FileText },
    { title: "9. Intellectual Property", icon: Copyright },
    { title: "10. Disclaimer", icon: AlertTriangle },
    { title: "11. Indemnity", icon: ShieldAlert },
    { title: "12. Limitation of Liability", icon: Scale },
    { title: "13. Privacy", icon: Lock },
    { title: "14. Miscellaneous", icon: Globe },
    { title: "15. Contact Information", icon: Mail },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            Legal Agreement
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white"
          >
            Terms and Conditions
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-gray-400 text-lg">Last updated: April 2026</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="hidden lg:block space-y-2 sticky top-28 h-fit max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar">
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest ml-4 mb-4">Table of contents</p>
            {sections.map((s, i) => (
              <a 
                key={i} 
                href={`#section-${i + 1}`}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-white hover:text-[#0B132B] transition-all group border border-transparent hover:border-gray-100 hover:shadow-sm"
              >
                <s.icon size={16} className="text-gray-400 group-hover:text-emerald-600 flex-shrink-0" />
                <span className="truncate">{s.title.split('. ')[1]}</span>
              </a>
            ))}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 p-8 md:p-12 space-y-12 text-gray-600 leading-relaxed">
              
              <section className="space-y-6">
                <p className="text-lg font-black text-[#0B132B] uppercase tracking-wide border-b border-gray-100 pb-4">TERMS AND CONDITIONS</p>
                <p>
                  This WebApp /Mobile Application i.e. the Mobile App of Ryngo user and Ryngo Driver  (the <strong>“Application”, “App”</strong>) is owned and operated by <strong>JET 1 TECHNOLOGY PRIVATE LIMITED</strong> registered with GOVERNMENT OF INDIA MINISTRY OF CORPORATE AFFAIRS having registration number <strong>U52290MH2026PTC467201</strong>. By using this App whether through computer, mobile, or any other electronic device, you agree to be bound by the terms and conditions (the <strong>“Terms and Conditions”</strong>) set forth below. The App may, in its sole discretion, revise these Terms and Conditions at any time as and when necessary and it shall not be required to notify you of any changes made to these Terms & Conditions. The revised Terms & Conditions shall be made available on the App. You are requested to regularly visit the App to view the most current Terms & Conditions.  [t1]  the same shall be notified to you whenever you first use the app after the aforesaid revision. Continued usage of the app shall amount to your acceptance to be bound by the revised Terms & Conditions.
                </p>
                <p>
                  Your use of the App is subject to the most current version of the Terms & Conditions made available on the App  at the time of such use.
                </p>
                <p className="p-6 bg-gray-50 rounded-3xl border border-gray-100 italic text-sm">
                  This document is an electronic record in terms of Information Technology Act, 2000 and rules thereunder as applicable and the provisions pertaining to electronic records in various statutes as amended by the Information Technology Act, 2000. This electronic record is generated by a computer system and does not require any physical or digital signatures.
                </p>
                <div className="flex items-center gap-4 p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white flex-shrink-0">
                    <Shield size={24} />
                  </div>
                  <p className="text-sm font-bold text-emerald-900 leading-tight">
                    By clicking on the "I ACCEPT" button, You are consenting to be bound by these Terms & Conditions. Please ensure that you read and understand all these terms & conditions before you use the app. If You do not accept any of the Terms & Conditions, then please do not use the App or avail any of the services being provided therein. Your agreement to these terms & conditions shall operate as a binding agreement between you and the App in respect of the use and services of the app.
                  </p>
                </div>
                <p>
                  The App provides technology-based software for finding two wheelers, three wheelers and four wheelers (<strong>“Vehicle”</strong>) to you (<strong>“You”</strong> or <strong>“Users”</strong>) through the App so that you can avail services offered by third party drivers or vehicle operators (<strong>"Drivers"</strong>) who  are on-boarded on the App. These Terms shall govern the relationship between you and the Society in relation to the software.
                </p>
              </section>

              <section id="section-1" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                  ELIGIBILITY
                </h2>
                <div className="space-y-4">
                  <p><strong>A.</strong> You will be "Eligible" to use the Services only when You fulfil all of the following conditions:</p>
                  <ul className="list-none pl-5 space-y-2">
                    <li>1.1.1. You have attained at least 18 (eighteen) years of age.[t2] </li>
                    <li>1.1.2. You are competent to enter into a contract under the Applicable Laws.</li>
                  </ul>
                  <p className="p-4 bg-gray-50 rounded-2xl border-l-4 border-emerald-500 font-medium font-serif italic">
                    <strong>B.</strong> A person under the age of 18 years can use this app provided they are accompanied with a person fulfilling the abovementioned criteria.
                  </p>
                </div>
              </section>

              <section id="section-2" className="space-y-6">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                  REGISTRATION AND ACCOUNT DATA
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>A.</strong> In order to use the software, you must register and maintain an active personal user Account (<strong>“Account”</strong>) with us which contains your valid, true and accurate name, email ID, phone number and such other information as may be required from the you from time to time for registration on the Application. (<strong>“Customer Data”</strong>).
                  </p>
                  <p>
                    <strong>B.</strong> You shall ensure that the Customer Data provided by you is accurate, complete, current, valid, true and is updated from time to time. We shall bear no liability for false, incomplete, or incorrect Customer Data provided by You.
                  </p>
                  <p>
                    <strong>C.</strong> This App is intended solely for users who are eighteen (18) years of age or older and competent to contract within the meaning of the Indian Contract Act, 1872.[t3] 
                  </p>
                  <p>
                    <strong>D.</strong> You are responsible for maintaining the confidentiality of your account and will be liable for all activities and transactions that occur through your Account, whether initiated by You or any third party. Your Customer Data cannot be transferred, assigned or sold to a third party. We shall not be liable for any loss that You may incur as a result of any unauthorised third party using your Customer Data, either with or without Your knowledge.
                  </p>
                  <p>
                    <strong>E.</strong> We reserve the right to suspend or terminate Your Customer Data with immediate effect and for an indefinite period, if we have a reason to believe that the Account Data or any other data provided by You is incorrect or false, or that the security of Your Customer Data has been compromised in any way, or if we suspect unauthorised use of your Customer Data, or for any other reason we may find just or equitable.
                  </p>
                  <p>
                    <strong>F.</strong> We allow you to open only one Account in association with the Customer Data provided by you. In case of any unauthorized use of Your Customer Data please immediately reach us at <strong>support@ryngo.in</strong> .
                  </p>
                  <p>
                    <strong>G.</strong> In case, you are unable to access Your Account, please inform Us at <strong>support@ryngo.in</strong> or <strong>+91 77188 52504</strong> and make a written request for blocking your Account. We will not be liable for any unauthorized transactions made through your Account prior to the expiry of <strong>72 (seventy two) hours</strong> after you have made a request in writing for blocking your Account.
                  </p>
                </div>
              </section>

              <section id="section-3" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                  SOFTWARE
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>A.</strong> The software enables you to discover and connect with Drivers of two, three, [t4] or four-wheelers who independently offer transportation services. The Driver has sole and complete discretion to accept or reject each request for Service. If the Driver accepts a request, the App notifies you and provides information regarding the Driver - including Driver name, Vehicle license number, telephone contact details of the Driver and such other necessary details as the App may determine.
                  </p>
                  <p>
                    <strong>B.</strong> You further agree that: (i) You will only use the software or download the App for your sole, personal use and will not resell or assign it to a third party; (ii) You will not use the software for unlawful purposes; (iii) You will not try to harm the software in any way whatsoever; (iv) You will comply with all relevant applicable laws;
                  </p>
                  <p>
                    <strong>C.</strong> The App reserves the right to immediately terminate the Service and the use of the Application in the event of non-compliance with any of the above requirements. Further, the App will store the information provided by you or record your calls for contacting you for all Service-related matters.
                  </p>
                  <p>
                    <strong>D.</strong> The App bears no responsibility and liability for non-completion of rides, delays and losses suffered by you or caused to you as a consequence of the breakdown of the Vehicle.
                  </p>
                  <p>
                    <strong>E.</strong> The provisioning and quality of Driver services is solely the responsibility of the Driver and the App has no control over such Driver services. Any dispute between you and the Driver is your responsibility and the App shall not be liable for the same.
                  </p>
                  <p>
                    <strong>F.</strong> The App shall, upon receiving the booking request from you, will show on the application all the available Vehicles of Drivers and proceed to confirm or decline the booking based on the availability of Vehicles at the pickup time, which shall be informed to you vide an SMS or email[t5] . However, the Society shall not be responsible for arranging any Driver services for you. In the event the booking is confirmed, you shall check the booking details including but not limited to pick up time and pick up place on the app, and if there is incorrect detail, the same needs to be informed to the Driver.
                  </p>
                  <p>
                    <strong>G.</strong> If you leave any goods in the Vehicle, it shall be reported immediately to the Driver. We shall not be responsible for any loss or damage caused to such items.
                  </p>
                  <p>
                    <strong>H.</strong> You shall bear the consequences and damages for any delay that may be caused to you due to your failure to check the confirmation SMS or email [t6] or failure to inform the Society of the incorrect details immediately.
                  </p>
                </div>
              </section>

              <section id="section-4" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                  PAYMENT
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>A.</strong> You shall be required to pay charges to the Driver for the services used by you to the Driver directly in a manner as decided between you and the driver. The estimated rate of the services shall be notified to You while placing the booking request on the App.
                  </p>
                  <p>
                    <strong>B.</strong> You may be facilitated with a copy of fare receipt by the App, for the services provided to you by them via email or SMS[t7] .
                  </p>
                  <p>
                    <strong>C.</strong> You shall be required to pay such Cancellation Fee in terms of clause 5, which will form part of the receipt of the Total Ride Fee.
                  </p>
                  <p>
                    <strong>D.</strong> All applicable taxes in respect of the Fare, Cancellation Fee or any Additional Fee shall be borne and payable by You to the Services, as the case may be.
                  </p>
                  <p>
                    <strong>E.</strong> The fare is based on the State Government Rules factoring charges applied by the Driver and is not determined by the App.
                  </p>
                </div>
              </section>

              <section id="section-5" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                   CANCELLATION POLICY
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>A.</strong> You agree and acknowledge that You may cancel Your request for a Vehicle from a Driver at any point of time subject to a Cancellation Fee if, (i) you cancel after 5 minutes after the cab is allotted; or (ii) a driver cancels after waiting at your location for more than 5 minutes. But, if the Driver is delayed by more than 5 minutes to pick You, You will not be charged any Cancellation Fee.
                  </p>
                  <p>
                    <strong>B.</strong> You shall be notified of the applicable Cancellation Fee in advance whenever You attempt to cancel a booking/service request. The notification shall be on the Application and/or the App.
                  </p>
                  <p>
                    <strong>C.</strong> The Cancellation Fee shall be payable by You at the completion of Your subsequent Ride.
                  </p>
                  <p>
                    <strong>D.</strong> The mode of payment of the Cancellation Fee shall be in a manner as decided between you and the next driver so engaged by you in the course of using the App.
                  </p>
                </div>
              </section>

              <section id="section-6" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                   CONSUMER GRIEVANCES
                </h2>
                <p>
                  <strong>A.</strong> If you have any questions, concerns, or complaints regarding the services, you shall report it to the App within <strong>10 days</strong> of the happening of the issue, failing which, such issue may not be addressed. The App shall endeavor to respond to your issues within 3 working days of Your reporting the same and efforts shall be made to resolve it at the earliest possible. However the App shall not be liable for any damages or losses in the event You are not satisfied with any such resolution.
                </p>
              </section>

              <section id="section-7" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                   LICENSE
                </h2>
                <div className="space-y-4 text-sm leading-relaxed">
                  <p>
                    <strong>A.</strong> You shall not (i) license, sublicense, sell, resell, transfer, assign, distribute or otherwise commercially exploit or make available to any third party the software or App in any way; (ii) modify or make derivative works based upon the software or App; (iii) create Internet “links” to the software or “frame” or “mirror” any App on any other server or wireless or internet-based device; (iv) reverse engineer or access the App in order to (a) design or build a competitive product or software, (b) design or build a product using similar ideas, features, functions or graphics of the software or App, or (c) copy, reproduce, record, or make available to the public any ideas, features, functions or graphics of the software or App, or (v) launch an automated program or script, including, but not limited to, web spiders, web crawlers, web robots, web ants, web indexers, bots, viruses or worms, or any program which may make multiple server requests per second, or unduly burdens or hinders the operation and/or performance of the software or App.
                  </p>
                  <p>
                    <strong>B.</strong> You shall not: (i) send spam or otherwise duplicative or unsolicited messages on the software in violation of applicable laws; (ii) send or store infringing, obscene, threatening, libellous, or otherwise unlawful or tortious material, including material harmful to children or violative of third party privacy rights, if applicable; (iii) send or store material containing software viruses, worms, Trojan horses or other harmful computer code, files, scripts, agents or programs; (iv) interfere with or disrupt the integrity or performance of the App or software or the data contained therein; or (v) attempt to gain unauthorized access to the App or software or its related systems or networks.
                  </p>
                  <p>
                    <strong>C.</strong> The App will have the right to investigate and prosecute for violation of any of the above to the fullest extent permitted under law. The App shall cooperate with law enforcement authorities in prosecuting users who violate these Terms and Conditions.
                  </p>
                </div>
              </section>

              <section id="section-8" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                   CONTENT
                </h2>
                <p className="text-sm">
                  The App may in its sole discretion permit you or you may be able to submit, upload, publish content and information, including comments and feedback related to the software or App (<strong>“User Content”</strong>) on the application. Any User Content provided by you remains your property. However, by providing User Content, you grant the App and its Owner a worldwide, perpetual, irrevocable, transferrable, royalty-free license, with the right to sublicense, to use, copy, modify, create derivative works of, distribute, publicly display, publicly perform, and otherwise exploit in any manner such User Content in all formats and distribution channels now known or hereafter devised without further notice to or consent from you, and without the requirement of payment to you or any other person or entity. You represent and warrant that: (i) you either are the sole and exclusive owner of all User Content or you have all rights, licenses, consents and releases necessary to grant the App and its Owner the license to the User Content as set forth above; and (ii) neither the User Content nor your submission, uploading, publishing or otherwise making available of such User Content nor the App’s ors its Owner’s use of the User Content as permitted herein will infringe, misappropriate or violate a third party’s intellectual property or proprietary rights, or rights of publicity or privacy, or result in the violation of any applicable law or regulation. You agree to not provide User Content on the App or otherwise that is defamatory, libelous, hateful, violent, obscene, pornographic, unlawful, or otherwise offensive, as determined by the App or its Owner in its sole discretion, whether or not such material may be protected by law. The App and its Owner may, but shall not be obligated to, review, monitor, or remove User Content provided to it, at its sole discretion and at any time and for any reason, without notice to you.
                </p>
              </section>

              <section id="section-9" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                   INTELLECTUAL PROPERTY
                </h2>
                <div className="space-y-4">
                  <p>
                    <strong>A.</strong> The App and its Owner shall own all right, title and interest, including all related intellectual property rights, in and to (i) the Application, software and any suggestions, ideas, enhancement requests, feedback, recommendations or any other offering; (ii) text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork and computer code; or (iii) other information provided by You or any other party relating to the Application or the software.
                  </p>
                  <p>
                    <strong>B.</strong> These Terms and Conditions do not constitute a sale and do not convey to you any rights of ownership in or related to the Application or the software, or any intellectual property rights owned by the App and its Owner. You shall be solely responsible for any violations of any laws and for any infringements of any intellectual property rights caused by use of the software or the Application.
                  </p>
                </div>
              </section>

              <section id="section-10" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                   DISCLAIMER
                </h2>
                <div className="p-8 bg-yellow-50 rounded-[32px] border border-yellow-100 space-y-4 text-sm font-medium">
                  <p>
                    You agree that the App is merely an electronic platform to facilitate aggregation of vehicles and does not in any manner provide transportation services.  The Owner or the App does not endorse, advertise, advise or recommend you to avail the services of any driver. The Owner or the App also does not guarantee or provide assurance in respect of the behaviour, actions or data of the users posted on the app.
                  </p>
                  <p>
                    We do not authorize anyone to make a warranty on our behalf and you shall not rely on any statement of warranty as a warranty by us.
                  </p>
                  <p>
                    The Owner does not warrant that the app will operate error-free or that the app and its server are free of computer viruses or other harmful material.[t8]  However, the Owner and the App shall always endeavour to keep itself safe from the aforesaid harmful materials to the best of its abilities.
                  </p>
                  <p>
                    The software and app are provided on an <strong>“as is”</strong>, <strong>“as available basis”</strong>. The Owner and its affiliates, employees, agents, suppliers and licensors, disclaim all warranties of any kind, including but not limited to implied warranties of merchantability or fitness for a particular purpose. The Owner and its affiliates, employees, agents, suppliers and licensors make no representations or warranties as to the accuracy, reliability of the material or content of any information provided through the application. The Owner and its affiliates, employees, agents, suppliers and licensors are not liable, and expressly disclaim any liability, for the content of any data transferred either from you while using the app. No advice or information given by Owner or Owner’s representatives shall create a warranty.
                  </p>
                </div>
              </section>

              <section id="section-11" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                   INDEMNITY
                </h2>
                <p className="text-sm">
                  By using this App, You agree to indemnify, defend and hold harmless the Owner and its affiliates or its officers, directors, employees, agents from and against any and all claims, damages, losses, liabilities, suits, actions, demands, proceedings (whether legal or administrative), and expenses (including, but not limited to, reasonable attorney's fees) threatened, asserted, or filed by a third party against the Owner or its officers, directors, employees, agents arising out of or relating to (i) your use of the software or Application, (ii) any breach or violation by you of Terms and Conditions; or (iii) any of your acts or omissions (including without limitation fraud, negligence or willful misconduct), except to the extent any of the foregoing directly results from Owner’s own gross negligence or willful misconduct[t9] . The Owner reserves the right to assume or participate, at your expense, in the investigation, settlement and defense of any such action or claim.
                </p>
              </section>

              <section id="section-12" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                   LIMITATION OF LIABILITY
                </h2>
                <p className="text-sm">
                  The Owner shall not be liable for indirect, incidental, special, exemplary, punitive or consequential damages, including lost profits, lost data, personal injury or property damage related to, in connection with, or otherwise resulting from any use of the software, even if Owner has been advised of the possibility of such damages. Owner shall not be liable for any damages, liability or losses arising out of: (i) your use of the software or application or your inability to access or use the software or application; or (ii) any transaction or relationship between you and driver, even if Owner has been advised of the possibility of such damages[t10] . Owner shall not be liable for delay or failure in performance of driver services. Owner’s software or application may be used by you to find  drivers who are willing to offer their services, and you agree that Owner has no responsibility or liability to you related to any ride or services provided to you by driver.
                </p>
              </section>

              <section id="section-13" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                   PRIVACY
                </h2>
                <div className="space-y-4 text-sm">
                  <p>
                    Our collection and use of customer data and user content provided by you in connection with the Software or Application is as provided in  . Your acceptance of the Terms and Conditions shall be deemed to include your acceptance of the privacy policy.
                  </p>
                  <p>
                    In the event that the Owner enters into a transaction that alters the structure of our business, such as reorganization, merger, sale, transfer, change of control, or other disposition of all or any portion of our business, we shall transfer, share, assign data including your customer data and user content that we access, process, collect, store, use or otherwise deal with, to the relevant entity. Such entity(ies) shall ensure that there is no adverse material change in the manner of managing, accessing, storing or handling the data and shall implement adequate measures to protect the confidentiality and security of the information, in accordance with applicable law.
                  </p>
                </div>
              </section>

              <section id="section-14" className="space-y-4">
                <h2 className="text-2xl font-black text-[#0B132B] flex items-center gap-3 uppercase">
                   MISCELLANEOUS
                </h2>
                <div className="space-y-4 text-sm">
                  <p>
                    If the software or application’s performance is prevented, hindered or delayed by a Force Majeure Event, in such case our obligations under Terms and Conditions shall be suspended for so long as the Force Majeure Event continues.
                  </p>
                  <p>
                    Any controversy or claim arising out of or relating to Terms and Conditions, including any claim based upon or arising from an alleged tort, shall be governed by the substantive laws of India and the courts in <strong>Mumbai</strong> shall have exclusive jurisdiction.
                  </p>
                  <p>
                    If any provision or portion of Terms and Conditions shall be held to be illegal, invalid or unenforceable by a court of competent jurisdiction, the invalidity of such provision shall not affect the validity of remaining provisions and all such remaining provisions or portions (unless otherwise specified) thereof shall remain in full force and effect.
                  </p>
                  <p>
                    Owner’s failure or delay in exercising its right or remedy hereunder shall not operate as a waiver nor shall any single or partial exercise of any right or remedy by Owner preclude it from further exercise thereof or the exercise of any other right or remedy.
                  </p>
                </div>
              </section>

              <section id="section-15" className="bg-[#0B132B] text-white rounded-[32px] p-8 md:p-12 space-y-6">
                <h2 className="text-2xl font-black uppercase">CONTACT INFORMATION</h2>
                <div className="space-y-4 text-gray-300">
                  <p>If you have any questions about Terms and Conditions or the software or Application, please contact us at:</p>
                  <p className="font-bold text-white text-lg">JET 1 TECHNOLOGY PRIVATE LIMITED.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <Mail size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-500">Email Us</p>
                        <p className="text-white font-bold text-sm">support@ryngo.in</p>
                        <p className="text-gray-400 text-xs">jet1technology@ryngo.in</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 group">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <Smartphone size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-500">Call Us</p>
                        <p className="text-white font-bold">+91 77188 52504</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 flex items-center justify-center hover:bg-emerald-600 transition-all z-50 group active:scale-95"
        >
          <ArrowUp className="group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
