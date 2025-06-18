// pages/about.js

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LinkedinIcon, FacebookIcon, InstagramIcon } from 'lucide-react';

export default function About() {
  const [activeSection, setActiveSection] = useState(null);
  const [showHeader, setShowHeader] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cn = (...classes) => classes.filter(Boolean).join(" ");
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (!aboutSection) return;

      const rect = aboutSection.getBoundingClientRect();
      setShowHeader(rect.top <= 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Head>
        <title>About Us – I&A International</title>
        <meta name="description" content="Learn more about I&A International – Our story, vision, and values." />
      </Head>

      {/* === Banner Backdrop Section with Scroll Animation === */}
      <div className="w-full h-64 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-300 ease-out"
          style={{
            backgroundImage: 'url("/img/aboutusbanner.png")',
            transform: `translateY(${offsetY * 0.3}px)`, // adjust speed here
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center justify-between text-white">


          {/* === Main Banner Content Centered === */}
          <div className="relative z-10 mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold">About Us</h2>
          </div>
        </div>


      </div>

      {/* === Sticky Header (with backdrop blur) === */}
      {showHeader && (
        <header
          className={cn(
            "fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-md text-black font-termina text-sm",
            "transition-all duration-500 ease-out animate-slideDown"
          )}
        >
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Clickable Logo in Header */}
            <Link href="/" passHref legacyBehavior>
              <a>
                <Image src="/img/logo.png" alt="Logo" width={90} height={36} />
              </a>
            </Link>

            {/* === Desktop Navigation === */}
            <nav className="hidden md:flex items-center gap-8">
              {["about", "brands", "contact"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`relative group transition ${section === "about" ? "text-black" : "hover:text-gray-600"} flex items-center gap-1`}
                >
                  {section === "contact" ? (
                    <Link
                      href="/contact-us"
                      className={`text-sm transition flex items-center gap-1 ${activeSection === "contact"
                          ? "text-black font-semibold"
                          : "text-gray-700 hover:text-black"
                        }`}
                    >
                      GET IN TOUCH
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M21 10l-6 6-4-4-6 6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>
                  ) : section === "brands" ? (
                    <Link key={section} href="/our-brands" passHref>
                      <div className="relative group hover:text-black-900 transition flex items-center gap-1 cursor-pointer">
                        Our Brands
                        <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-white transition-all duration-300 group-hover:w-full" />
                      </div>
                    </Link>
                  ) : (
                    section.charAt(0).toUpperCase() + section.slice(1) + " US"
                  )}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1.5px] bg-black transition-all duration-300 ${section === "about" ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </a>
              ))}
              <button className="hover:text-gray-300 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </nav>

            {/* Mobile Toggle Button */}
            <button
              className="md:hidden focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* === Mobile Navigation === */}
          {mobileMenuOpen && (
            <div className="md:hidden px-4 pb-4 pt-2">
              <nav className="flex flex-col items-start gap-4">
                <Link
                  href="/about-us"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-black underline underline-offset-4"
                >
                  About Us
                </Link>

                <Link
                  href="/our-brands"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm text-gray-700 hover:text-black"
                >
                  Our Brands
                </Link>

                <Link href="/contact-us" legacyBehavior>
                  <a
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-sm transition flex items-center gap-1 ${activeSection === "contact"
                        ? "text-black font-semibold"
                        : "text-gray-700 hover:text-black"
                      }`}
                  >
                    GET IN TOUCH
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M21 10l-6 6-4-4-6 6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </Link>
              </nav>
            </div>
          )}

        </header>
      )}

      {/* === About Section === */}
      <section id="about" className="bg-white pt-32 pb-24 px-6 font-termina">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Where Luxury Meets Elegance & Quality</h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
            I&A International is a well-established Albanian jewelry retailer founded by Artan Caushi in 1991. We’ve grown into a trusted name for iconic global brands in jewelry and luxury timepieces.
          </p>
        </div>

        {/* === Image and Content Block === */}
        <div className="mt-16 grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="relative">
            <img
              src="/img/girlwithring.png"
              alt="Elegant woman wearing jewelry"
              className="rounded-lg shadow-xl object-cover w-full h-full"
            />
          </div>

          {/* Content */}
          <div className="text-left space-y-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">About I&A International</h2>
            <p className="text-gray-600 leading-relaxed">
              As the official reseller of world-renowned jewelry brands such as <strong>Anna Maria Cammilli</strong>, <strong>Fope</strong>, <strong>Mirco Visconti</strong>, and <strong>Ititoli</strong>, we offer an exquisite and diverse collection for all tastes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our portfolio also includes luxury timepieces from <strong>Eberhard & Co</strong>, <strong>Louis Erard</strong>, <strong>Bomberg</strong>, <strong>Eterna</strong>, and <strong>Wainer</strong>. Each brand we represent is carefully selected to ensure timeless quality and prestige.
            </p>
          </div>
        </div>

        {/* === Mission, Vision, Values === */}
        <div className="mt-20 max-w-5xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {/* Mission */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To deliver exceptional jewelry and accessories that reflect each customer's unique style, while upholding the highest standards in service and satisfaction.
            </p>
          </div>

          {/* Vision */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              To become Albania’s leading luxury jewelry retailer, expanding internationally with a commitment to quality, trust, and refined luxury.
            </p>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Values</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We value <strong>integrity</strong>, <strong>innovation</strong>, and <strong>excellence</strong>. We embrace diversity, uphold transparency, and consistently aim to exceed expectations in everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* === Corporate Responsibility Section === */}
      <section className="bg-gray-50 py-24 px-6 font-termina">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Corporate Responsibility</h2>
            <p className="text-md md:text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              We believe in doing business the right way — ethically, sustainably, and with a deep sense of community responsibility.
            </p>
          </div>

          {/* Main content grid */}
       <div className="grid md:grid-cols-2 gap-10 items-start">
  {/* Left column - Paragraphs */}
  <div className="space-y-6 text-gray-700 text-[15px] leading-relaxed order-2 md:order-1">
    <p>
      At I&A International, we take our role in the community seriously. We are committed to reducing our environmental impact by integrating sustainable practices into every part of our operations — from minimizing waste and using eco-friendly packaging to implementing energy-efficient lighting.
    </p>
    <p>
      We proudly support local and global charitable causes, especially those promoting <strong>education</strong>, <strong>healthcare</strong>, and <strong>environmental sustainability</strong>. Our partnerships with suppliers are based on shared values of ethical sourcing, safety, and fairness in working conditions.
    </p>
    <p>
      Diversity and inclusion are integral to our identity. We foster a workplace that celebrates differences, ensuring every individual feels respected, heard, and empowered.
    </p>
    <p>
      For us, corporate responsibility isn’t a trend — it’s a cornerstone of how we operate. We remain dedicated to making a positive impact both within and beyond our industry.
    </p>
  </div>

  {/* Right column - Image + Quote (shared for all screens) */}
  <div className="relative order-1 md:order-2">
    <div className="w-full rounded-lg overflow-hidden shadow-md">
      <img
        src="/img/discussing-document-min.jpg"
        alt="Corporate responsibility in action"
        className="object-cover w-full h-full"
      />
    </div>
    <div className="absolute bottom-4 left-4 right-4 bg-white/90 px-4 py-3 rounded shadow-md">
      <p className="text-sm text-gray-800 italic whitespace-nowrap overflow-hidden border-r-2 border-gray-800 animate-typewriter">
        "Sustainability and responsibility are not choices — they are our commitments."
      </p>
    </div>
  </div>
</div>

        </div>
      </section>

      {/* === Our Commitments Section === */}
      <section className="py-24 px-6 bg-white font-termina">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Commitments</h2>
          <p className="text-gray-600 text-md md:text-lg max-w-2xl mx-auto mb-12">
            At I&A International, we are driven by a deep sense of responsibility in every aspect of our business. Our commitments reflect our values and guide our actions.
          </p>

          {/* Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Card: Business Ethics */}
            <div className="bg-gray-50 rounded-lg shadow-md p-8 transition hover:shadow-xl">
              <div className="flex justify-center items-center w-16 h-16 mb-4 mx-auto bg-gray-100 rounded-full">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 2a10 10 0 1010 10A10 10 0 0012 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Ethics</h3>
              <p className="text-sm text-gray-600">
                We uphold integrity, transparency, and fairness in all our dealings. Ethical standards are the foundation of our company’s success.
              </p>
            </div>

            {/* Card: Social Performance */}
            <div className="bg-gray-50 rounded-lg shadow-md p-8 transition hover:shadow-xl">
              <div className="flex justify-center items-center w-16 h-16 mb-4 mx-auto bg-gray-100 rounded-full">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a3 3 0 00-3-3h-2m-4 5v-6a3 3 0 00-3-3H7a3 3 0 00-3 3v6h6zm-3-8V4a4 4 0 118 0v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Social Performance</h3>
              <p className="text-sm text-gray-600">
                We value people. From fair working conditions to inclusive practices, our social commitment drives long-term positive impact.
              </p>
            </div>

            {/* Card: Environmental Performance */}
            <div className="bg-gray-50 rounded-lg shadow-md p-8 transition hover:shadow-xl">
              <div className="flex justify-center items-center w-16 h-16 mb-4 mx-auto bg-gray-100 rounded-full">
                <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3A9 9 0 113 12a9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Environmental Performance</h3>
              <p className="text-sm text-gray-600">
                We are dedicated to minimizing our environmental footprint through sustainable operations and eco-conscious packaging.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="bg-black text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" passHref legacyBehavior>
              <a>
                <Image
                  src="/img/logo.png"
                  alt="I&A International Logo"
                  width={120}
                  height={40}
                  priority
                  className="filter brightness-0 invert mb-4"
                />
              </a>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              © {new Date().getFullYear()} I&A International.<br className="hidden sm:inline" /> All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-semibold text-white mb-3 text-lg">Contact Us</h4>
            <p className="text-gray-400 text-sm break-words">info@ia-international.com</p>
          </div>

          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-semibold text-white mb-3 text-lg">Our Address</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Rr.Kavajës, Pallati Mio 2000<br />
              Tirana, Albania
            </p>
            <div className="flex justify-center sm:justify-start gap-4">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition duration-300">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-white transition duration-300">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-white transition duration-300">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
