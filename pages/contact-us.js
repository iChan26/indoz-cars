import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LinkedinIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, SendIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
 import Slider from 'react-slick';
 import {
  ArrowRight,
  UserIcon,
  MessageSquareIcon,
} from 'lucide-react';

// Helpers & Hooks
// ——————————————————————————

const cn = (...classes) => classes.filter(Boolean).join(' ');

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
};

// ——————————————————————————
// NavBrands Component
// ——————————————————————————

const NavBrands = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [tappedOnce, setTappedOnce] = useState(false)


  // Handler for mobile double‑tap behavior
  const handleMobileClick = (e) => {
    if (!isOpen) {
      e.preventDefault()      // first tap opens
      setIsOpen(true)
      setTappedOnce(true)
      setTimeout(() => setTappedOnce(false), 1500)
    } else if (tappedOnce) {
      setIsOpen(false)        // second tap allows navigation
    }
  }

  const brands = [
    { name: 'Altınbaş', href: '/our-brands/altinbas' },
    { name: 'BELMA', href: '/our-brands/belma' },
    { name: 'BOSS', href: '/our-brands/boss' },
    { name: 'ESTÉE', href: '/our-brands/estee' },
    { name: 'GELOSIA', href: '/our-brands/gelosia' },
    { name: 'LAGERFELD', href: '/our-brands/lagerfeld' },
    { name: 'ZEN', href: '/our-brands/zen' },
    { name: 'MICHAEL KORS', href: '/our-brands/michael-kors' },
    { name: 'PANDORA', href: '/our-brands/pandora' },
    { name: 'ROBERTO BRAVO', href: '/our-brands/roberto-bravo' },
  ]


  return (
    <div className="relative group w-full">
      <Link
        href="/our-brands"
        onClick={isMobile ? handleMobileClick : undefined}
        passHref
      >
        <div className="flex justify-between items-center text-white hover:text-gray-300 cursor-pointer transition w-full">
          <span className="relative">
            Our Brands
            <span className="absolute -bottom-1 left-0 h-[1.5px] bg-white w-0 group-hover:w-full transition-all duration-300" />
          </span>
          <svg
            className={cn(
              'w-4 h-4 transform transition-transform duration-300',
              (isMobile && isOpen) || (!isMobile && 'group-hover:rotate-180')
                ? 'rotate-180'
                : ''
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 
                 111.08 1.04l-4.25 4.25a.75.75 0 
                 01-1.08 0L5.21 8.27a.75.75 0 
                 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </Link>

      <div
        className={cn(
          'absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-md z-50 transition-all duration-300',
          isMobile
            ? isOpen
              ? 'opacity-100 translate-y-1'
              : 'opacity-0 pointer-events-none'
            : 'opacity-0 group-hover:opacity-100 group-hover:translate-y-1'
        )}
      >
        {brands.map((b) => (
          <Link key={b.name} href={b.href} className="block px-4 py-2 hover:bg-gray-100">
            {b.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function Contact() {
const isMobile = useIsMobile();
  const [showHeader, setShowHeader] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const router = useRouter();
  const isBrandsPage = router.pathname === '/contact-us';
  const cn = (...classes) => classes.filter(Boolean).join(" ");

  const [activeSection, setActiveSection] = useState(null);
  const [offsetY, setOffsetY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    if (mobileMenuOpen && navRef.current) {
      // Measure height
      const height = navRef.current.scrollHeight;
      setNavHeight(height);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const ref = navRef.current;
    if (!ref) return;

    const observer = new ResizeObserver(() => {
      if (mobileMenuOpen) {
        setNavHeight(ref.scrollHeight);
      }
    });

    observer.observe(ref);
    return () => observer.disconnect();
  }, [mobileMenuOpen]);
 // ─── Inline “click‑twice” dropdown state & handler ─────────────────────────

  const [tappedOnce, setTappedOnce] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  const handleClick = (e) => {
    if (!isOpen) {
      e.preventDefault()     // first click: open
      setIsOpen(true)
      setTappedOnce(true)
      setTimeout(() => setTappedOnce(false), 1500)
    } else if (tappedOnce) {
      setIsOpen(false)       // second click: close & allow nav
    }
  }
  useEffect(() => {
    const handleOutside = (e) => {
      // if open and the click is outside our dropdown container, close it
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [isOpen])
useEffect(() => {
  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
  const brands = [
    { name: 'Altınbaş', href: '/our-brands/altinbas' },
    { name: 'BELMA', href: '/our-brands/belma' },
    { name: 'BOSS', href: '/our-brands/boss' },
    { name: 'ESTÉE', href: '/our-brands/estee' },
    { name: 'GELOSIA', href: '/our-brands/gelosia' },
    { name: 'LAGERFELD', href: '/our-brands/lagerfeld' },
    { name: 'ZEN', href: '/our-brands/zen' },
    { name: 'MICHAEL KORS', href: '/our-brands/michael-kors' },
    { name: 'PANDORA', href: '/our-brands/pandora' },
    { name: 'ROBERTO BRAVO', href: '/our-brands/roberto-bravo' },
  ]

  return (
    <>
      <Head>
        <title>Contact Us – I&A International</title>
        <meta name="description" content="Get in touch with I&A International – Our story, vision, and contact information." />
      </Head>

      {/* === Banner Section === */}
      <div className="w-full h-64 relative overflow-hidden banner-section">
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-300 ease-out"
          style={{
            backgroundImage: 'url("/img/contactusbanner.png")',
            transform: `translateY(${offsetY * 0.3}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center justify-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold uppercase mt-[100px]">Contact Us</h2>
        </div>
      </div>

      {/* === Sticky Header (Always Visible) === */}
      <header className={cn(
        "fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-md text-black font-termina text-sm",
        "transition-all duration-500 ease-out animate-slideDown"
      )}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" passHref legacyBehavior>
            <a>
              <Image src="/img/logo.png" alt="Logo" width={90} height={36} />
            </a>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about-us" className="relative group text-black flex items-center gap-1">
              About Us
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-black group-hover:w-full transition-all duration-300" />
            </Link>

            {/* === Our Brands Dropdown (click‑twice) === */}
                <div ref={containerRef} className="relative">
                  {/* Main Link: click twice to open/close */}
                  <Link
                    href="/our-brands"
                    onClick={handleClick}
                    className="group flex items-center gap-1 text-black transition cursor-pointer relative"
                  >
                    Our Brands
                    <span
                      className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-black 
               group-hover:w-full transition-all duration-300"
                    />
                    <svg
                      className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                        }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71
         a.75.75 0 111.08 1.04l-4.25 4.25
         a.75.75 0 01-1.08 0L5.21 8.27
         a.75.75 0 01.02-1.06z"
                      />
                    </svg>
                  </Link>


                  {/* Dropdown Menu: only when open */}
                  {isOpen && (
                    <div className="
    absolute left-0 mt-2 w-48
    bg-white text-black
    rounded shadow-md z-50
    divide-y divide-gray-200
    overflow-hidden
  ">
                      {brands.map((b) => (
                        <Link
                          key={b.name}
                          href={b.href}
                          className="block px-4 py-2 hover:bg-gray-100 transition"
                        >
                          {b.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

            <Link href="/contact-us" className="relative group  hover:text-black flex items-center gap-1">
              GET IN TOUCH
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M21 10l-6 6-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-black transition-all duration-300" />
            </Link>

            <button className="hover:text-gray-300 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </nav>

          {/* Mobile Nav Toggle */}
          <button className="md:hidden focus:outline-none" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      <AnimatePresence initial={false}>
  {mobileMenuOpen && (
    <motion.div
      key="mobile-nav"
      className="md:hidden px-4 pt-2 overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: navHeight,
        opacity: 1,
      }}
      exit={{
        height: 0,
        opacity: 0,
      }}
      transition={{
        height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: 0.2, ease: 'easeOut' },
      }}
    >
      <div ref={navRef}>
        {/* Divider under logo */}
        <div className="w-full h-[1.5px] bg-black mb-4" />

        {/* Navigation list */}
        <nav className="flex flex-col items-center gap-4 pb-4">
          <Link href="/about-us" passHref legacyBehavior>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-black hover:underline underline-offset-4"
            >
              About Us
            </a>
          </Link>

        {/* === Mobile Our Brands Dropdown (click‑twice) === */}
                      <div ref={containerRef} className="relative w-full text-center">
                        {/* Trigger Row */}
                        <div className="flex items-center justify-center w-full py-2 text-sm ">
                          {/* Main “Our Brands” link (always navigates) */}
                          <Link href="/our-brands" className="mr-1">
                            Our Brands
                          </Link>

                          {/* Toggle arrow */}
                          <button
                            type="button"
                            onClick={handleClick}
                            aria-label={isOpen ? "Close brands menu" : "Open brands menu"}
                            className="p-1 focus:outline-none"
                          >
                            <svg
                              className={`w-4 h-4 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71
             a.75.75 0 111.08 1.04l-4.25 4.25
             a.75.75 0 01-1.08 0L5.21 8.27
             a.75.75 0 01.02-1.06z"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Sub‑menu */}
                        {isOpen && (
                          <div className="w-full divide-y divide-gray-200 overflow-hidden">
                            {brands.map((b) => (
                              <Link key={b.name} href={b.href} legacyBehavior>
                                <a
                                  onClick={() => setIsOpen(false)}
                                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                                >
                                  {b.name}
                                </a>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>

          <Link href="/contact-us" passHref legacyBehavior>
            <a
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-1 text-sm ${
                isBrandsPage
                  ? 'text-black underline underline-offset-4'
                  : ' hover:text-black'
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
    </motion.div>
  )}
</AnimatePresence>

      </header>

      {/* === Contact Section === */}
      <section id="contact" className="py-20 px-4 sm:px-6 bg-gray-100">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Contact Info */}
          <div className="md:w-1/2 bg-gradient-to-b from-[#000000] to-[#4b4b4b] text-white p-10 flex flex-col justify-center">
            <img src="/img/logo.png" alt="Logo" className="w-28 mb-6 mx-auto filter brightness-0 invert" />
            <h3 className="text-3xl font-bold mb-6 text-center">get in touch</h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm text-white">
              <div>
                <h4 className="font-semibold text-lg mb-2">Head Office</h4>
                <div className="flex items-center gap-2 mb-1">
                  <PhoneIcon className="w-4 h-4" />
                  <span>+355 69 206 0515</span>
                </div>
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4" />
                  <span>info@ia-international.com</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-2">Marketing</h4>
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4" />
                  <span>marketing@ia-international.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2 bg-gradient-to-b from-white to-gray-100 p-10">
            <h4 className="text-2xl font-semibold text-black mb-6">let’s talk</h4>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              <input type="email" placeholder="Your Mail" className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              <textarea placeholder="Type your message here..." rows="4" className="w-full border border-gray-300 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              <div className="flex items-center justify-between mt-6">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="w-4 h-4 border-gray-400 rounded" />
                  <span className="text-sm text-gray-600">I'm not a robot</span>
                </label>
                <button type="submit" className="bg-gradient-to-r from-[#000000] to-[#4b4b4b] text-white px-6 py-2 rounded-full hover:opacity-90 transition-all flex items-center gap-2">
                  <SendIcon className="w-4 h-4" />
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* === Footer === */}
      <footer className="bg-black text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <Link href="/" passHref legacyBehavior>
              <a>
                <Image src="/img/logo.png" alt="I&A International Logo" width={120} height={40} priority className="filter brightness-0 invert mb-4" />
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
