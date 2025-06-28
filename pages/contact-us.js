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
const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
const isActive = router.pathname === '/contact-us';
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      if (currentScrollPos < 10) {
        setVisible(true); // always visible at top
      } else {
        setVisible(isScrollingUp);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);
  return (
    <>
      <Head>
        <title>Contact Us – I&A International</title>
        <meta name="description" content="Get in touch with I&A International – Our story, vision, and contact information." />
      </Head>

      <section className="relative font-termina scroll-smooth">
        <header
          className={`w-full bg-white text-black z-50 fixed top-0 left-0 right-0 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'
            } shadow-[0_2px_8px_rgba(0,0,0,0.75)]`}
        >
          {/* Top Logo */}
          <div className="flex justify-center items-center py-3 bg-[#eaeaea]">
            <Link href="/" passHref>
            <Image
              src="/img/logo.png"
              alt="I&A International Logo"
              width={100}
              height={40}
              priority
            />
            </Link>
          </div>

          {/* Desktop Header Bottom Bar */}
          <div className="hidden md:flex py-3 px-6 items-center relative max-w-7xl mx-auto text-sm">
            <div className="flex items-center gap-4 ml-auto">
              <button className="hover:text-black transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              <Link
                href="/contact-us"
                className="px-4 py-1 border border-black text-black font-medium hover:bg-black hover:text-white transition duration-300"
              >
                Get in Touch
              </Link>
            </div>

            {/* Center Nav */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6 font-sans text-[15px] tracking-wide">

              <Link href="/" className="relative transition hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                Home
              </Link>

              <Link href="/press" className="relative transition hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                Press
              </Link>

              {/* Dropdown Nav */}
              <div className="relative group flex items-center">
                <Link
                  href="/our-brands"
                  className="relative flex items-center transition hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                >
                  <span>Our Brands</span>
                  <svg
                    className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:rotate-180"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    />
                  </svg>
                </Link>

                <div className="absolute top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50 divide-y divide-gray-200 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                  {brands.map((b) => (
                    <Link key={b.name} href={b.href} className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap transition">
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link href="/about-us" className="relative transition hover:font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                About Us
              </Link>

            </div>

          </div>

          {/* Mobile Header */}
          <div className="flex md:hidden items-center justify-between px-4 py-3 border-t border-black/20">
            <button onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <button className="hover:text-gray-300 transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          {/* Mobile Nav Drawer */}
            <div
              className={`md:hidden bg-white border-t border-black/10 text-black overflow-hidden transition-all duration-500 ease-in-out 
    ${mobileNavOpen ? 'max-h-[800px] opacity-100 py-4 px-4 space-y-4' : 'max-h-0 opacity-0 py-0 px-4'}
  `}
            >
              <Link href="/" className="block transition-opacity duration-300">Home</Link>
              <div className="pt-1">
                          <Link
                              href="/press"
                              className={`relative transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:bg-black after:transition-all after:duration-300
    ${isActive ? 'font-semibold after:w-full' : 'after:w-0'} hover:after:w-full hover:font-semibold`}
                          >
                              Press
                          </Link>

              </div>
             <details className="group">
  <summary className="cursor-pointer flex items-center justify-between">
    <div className="flex items-center gap-1">
      <span className="transition group-open:underline group-open:font-semibold">
        Our Brands
      </span>
      <svg
        className="w-4 h-4 ml-2 transform transition-transform group-open:rotate-90"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </summary>

  <div className="pl-4 pt-2 space-y-2">
    {brands.map((b) => (
      <a
        key={b.name}
        href={b.href}
        className="block hover:text-gray-300 transition"
      >
        {b.name}
      </a>
    ))}
  </div>
</details>


            <Link
              href="/about-us"
              className={`block transition-opacity duration-300 relative ${router.pathname === '/about-us' ? 'font-semibold underline underline-offset-4' : ''
                }`}
            >
              About Us
            </Link>


              {/* Fixed Get in Touch button spacing and visibility */}
              <div className="pt-1">
                <Link
                  href="/contact-us"
                  className="inline-block border border-black text-sm px-4 py-2 font-medium hover:bg-black hover:text-white transition"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

        </header>
        {/* === Breadcrumb Section === */}
        <div className="pt-40 bg-white border-t border-gray-200 w-full text-sm font-medium text-[#003049] tracking-wide">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-center items-center text-center">
            <div>
              <span className="text-[#333] font-thin">HOME</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-[#000] font-semibold uppercase">Contact US</span>
            </div>
          </div>
        </div>
      </section>
<section className="bg-[#fff] py-16 px-4 sm:px-6 md:px-10 lg:px-12 font-serif text-center">
  <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-light text-[#555] leading-snug tracking-tight">
    Contact Us
  </h1>
</section>
<section className="bg-[#f2f2f2] py-20 px-4 md:px-12 font-serif">
  <div className="max-w-container-xl mx-auto">
    <h2 className="text-[2rem] md:text-[2.5rem] font-serif text-[#555] mb-12">
      Contact details and key resources
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      {/* === Card 1: Investor Contacts === */}
      <div>
        <div className="aspect-[3/2] w-full overflow-hidden shadow-sm rounded-none">
          <Image
            src="/img/investor-contact.jpg"
            alt="Investor Relations"
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-[1.4rem] sm:text-[2.2rem] font-light text-[#555] leading-snug tracking-tight">
          Investor & Analyst Inquiries
        </h3>
        <a href="/contact/investors" className="font-sans font-normal not-italic inline-block mt-4 sm:mt-6  hover:font-semibold">
          → Read more
        </a>
      </div>

      {/* === Card 2: Media Relations === */}
      <div>
        <div className="aspect-[3/2] w-full overflow-hidden shadow-sm rounded-none">
          <Image
            src="/img/media-relations.jpg"
            alt="Media Relations"
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-[1.4rem] sm:text-[2.2rem] font-light text-[#555] leading-snug tracking-tight">
          Media & Press Contacts
        </h3>
        <a href="/contact/media" className="font-sans font-normal not-italic inline-block mt-4 sm:mt-6  hover:font-semibold">
          → Read more
        </a>
      </div>

      {/* === Card 3: Visit Our Stores === */}
      <div>
        <div className="aspect-[3/2] w-full overflow-hidden shadow-sm rounded-none">
          <Image
            src="/img/store-locations.jpg"
            alt="Store Locations"
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-[1.4rem] sm:text-[2.2rem] font-light text-[#555] leading-snug tracking-tigh">
          Visit Our Stores Across Albania
        </h3>
        <a href="/locations" className="font-sans font-normal not-italic inline-block mt-4 sm:mt-6  hover:font-semibold">
          → View locations
        </a>
      </div>

      {/* === Card 4: General Support === */}
      <div>
        <div className="aspect-[3/2] w-full overflow-hidden shadow-sm rounded-none">
          <Image
            src="/img/customer-support.jpg"
            alt="Customer Support"
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-[1.4rem] sm:text-[2.2rem] font-light text-[#555] leading-snug tracking-tight">
          Customer Support & FAQs
        </h3>
        <a href="/contact/support" className="font-sans font-normal not-italic inline-block mt-4 sm:mt-6  hover:font-semibold">
          → Get help
        </a>
      </div>
    </div>
  </div>
</section>

      {/* === Contact Section === */}
      <section id="contact" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
          {/* Contact Info */}
          <div className="md:w-1/2 bg-gradient-to-b from-[#000000] to-[#4b4b4b] text-white p-10 flex flex-col justify-center">
            <img src="/img/logo.png" alt="Logo" className="w-28 mb-6 mx-auto filter brightness-0 invert" />
            <h3 className="text-[2rem] md:text-[2.5rem] font-serif text-[#fff] mb-12 text-center">Get in Touch</h3>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm text-white">
              <div>
                <h4 className="text-[1.5rem] md:text-[1.5rem] font-serif text-[#fff] mb-5">Head Office</h4>
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
                <h4 className="text-[1.5rem] md:text-[1.5rem] font-serif text-[#fff] mb-5">Marketing</h4>
                <div className="flex items-center gap-2">
                  <MailIcon className="w-4 h-4" />
                  <span>marketing@ia-international.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:w-1/2 bg-gradient-to-b from-white to-gray-100 p-10">
            <h4 className="text-[2rem] md:text-[2.5rem] font-serif text-[#555] mb-12">Let’s Talk</h4>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              <input type="email" placeholder="Your Mail" className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              <textarea placeholder="Type your message here..." rows="4" className="w-full border border-gray-300 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-600" />
              <div className="flex items-center justify-between mt-6">
              <div className="flex items-center justify-between bg-white border border-gray-300 rounded shadow-sm px-4 py-3 w-100 max-w-sm">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border border-gray-400 rounded focus:ring-0 focus:outline-none"
                    />
                    <span className="text-sm text-gray-800 font-medium">I'm not a robot</span>
                  </div>
                  <img
                    src="/svg/RecaptchaLogo.svg" // replace with actual logo path
                    alt="reCAPTCHA"
                    className="h-10 w-10"
                  />
                </div>

                <button type="submit" className="bg-gradient-to-r from-[#000000] to-[#4b4b4b] text-white px-6 py-2 rounded-full hover:opacity-90 transition-all flex items-center gap-2">
                  <SendIcon className="w-4 h-4" />
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

  <footer className="bg-[#222] text-white border-t border-[#9db1b4] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 text-sm leading-relaxed">

          {/* === Logo & Copyright === */}
          <div className="space-y-4">
            <Link href="/" passHref>
              <Image
                src="/img/logo.png"
                alt="I&A International Logo"
                width={140}
                height={40}
                priority
                className="filter brightness-0 invert mb-4 cursor-pointer"
              />
            </Link>
            <p className="text-xs text-white">
              © {new Date().getFullYear()} I&A International.<br />All Rights Reserved.
            </p>
          </div>

          {/* === Contact Us === */}
          <div>
            <h4 className="font-serif text-lg text-[#fff] mb-3 border-b border-[#fff] pb-1">Contact Us</h4>
            <p className="mb-2">info@ia-international.com</p>

            {/* Optional: Email input box styled like Richemont */}
            <div className="flex mt-4 border border-white bg-white text-gray-700 overflow-hidden max-w-xs">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-3 py-2 text-sm outline-none bg-white"
              />
              <button className="bg-[#000] text-white px-4 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Social icons */}
            <div className="flex gap-4 mt-4 text-[#fff]">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* === Explore Links (Your site sections) === */}
          <div>
            <h4 className="font-serif text-lg text-[#fff] mb-3 border-b border-[#fff] pb-1">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/our-brands">Our Brands</Link></li>
              <li><Link href="/press">Press</Link></li>
            </ul>
          </div>

          {/* === Our Address === */}
          <div>
            <h4 className="font-serif text-lg text-[#fff] mb-3 border-b border-[#fff] pb-1">Our Address</h4>
            <p>Rr.Kavajës, Pallati Mio 2000<br />Tirana, Albania</p>
          </div>
        </div>
      </footer>

     {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-[99] p-3 rounded-full bg-black text-white shadow-xl hover:bg-gray-800 transition-all duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
}