import Link from "next/link";
import Image from "next/image";
import { Youtube, Instagram } from "lucide-react";

const links = {
  Services: [
    { label: "RynGO Cab", href: "#" },
    { label: "RynGO Auto", href: "#" },
    { label: "Corporate", href: "/business" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Safety", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Newsroom", href: "#" },
  ],
  Support: [
    { label: "Help Center", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Settings", href: "#" },
  ],
};

const socialIcons = [
  {
    label: "X (Twitter)",
    content: <span className="font-normal text-sm">𝕏</span>,
    href: "https://x.com/ryngo139826?s=21",
  },
  {
    label: "LinkedIn",
    content: <span className="font-serif italic text-sm">in</span>,
    href: "https://www.linkedin.com/in/ryngo-admin-6334893a8",
  },
  {
    label: "Facebook",
    content: <span className="font-bold text-sm">f</span>,
    href: "https://www.facebook.com/share/18CfxaCPhg/?mibextid=wwXIf",
  },
  {
    label: "YouTube",
    content: <Youtube size={16} />,
    href: "https://youtube.com/@adminryngo?si=Oq0xbMQ1dUrhBpSB",
  },
  {
    label: "Instagram",
    content: <Instagram size={16} />,
    href: "https://www.instagram.com/ryngo.in?igsh=b2ZhMmhpN3hyZjR3",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B132B] text-white pt-12 md:pt-16 lg:pt-20 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16">

        {/* Main grid — single col mobile → 2 col sm → 4 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 mb-10 md:mb-14">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-5 group w-fit">
              <div className="relative h-16 w-16">
                <Image
                  src="/images/logo.png"
                  alt="RynGO Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs mb-6 leading-relaxed">
              Revolutionizing urban mobility with a focus on luxury, efficiency,
              and reliability. Join thousands of satisfied riders daily.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 flex-wrap">
              {socialIcons.map((icon) => (
                <a
                  key={icon.label}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={icon.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#0B4619] transition-all cursor-pointer hover-shadow-teal"
                >
                  {icon.content}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h3 className="text-sm font-black text-white uppercase tracking-wider mb-4">
                {section}
              </h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm leading-relaxed"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-gray-500 text-xs leading-relaxed">
            &copy; {new Date().getFullYear()} JET 1 TECHNOLOGY PRIVATE LIMITED.
            All rights reserved.
            <br className="sm:hidden" />
            <span className="hidden sm:inline"> · </span>
            Mumbai, Maharashtra ·{" "}
            <a
              href="mailto:admin@ryngo.in"
              className="hover:text-gray-300 transition-colors"
            >
              admin@ryngo.in
            </a>
          </p>
          <div className="flex gap-4 text-gray-500 text-xs font-semibold">
            <button className="hover:text-white transition-colors uppercase tracking-wide">
              English (IN)
            </button>
            <button className="hover:text-white transition-colors uppercase tracking-wide">
              Help
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
