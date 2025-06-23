// pages/index.js

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ArrowRight,
  MailIcon,
  UserIcon,
  MessageSquareIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
} from 'lucide-react';
import { Typewriter } from 'react-simple-typewriter';

// ——————————————————————————
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

// ——————————————————————————
// Main Page Component
// ——————————————————————————

export default function Home() {
  const isMobile = useIsMobile();
  const navRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);
  const [showHeader, setShowHeader] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);



  const images = ['/img/hero1-min.png', '/img/hero2-min.png'];
  const timelineData = [
    { year: '2025 — New Digital Experience', text: 'Launch of our new website…' },
    { year: '2015 — Exclusive Brand Partnerships', text: 'Secured exclusive selling rights…' },
    { year: '2000s — Expansion Across Albania', text: 'Grew presence with multiple retail stores…' },
    { year: '1991', text: 'I&A International was established…' },
  ];
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  // — Effects: track which section is in view
  useEffect(() => {
    const ids = ['about', 'brands', 'contact'];
    const onScroll = () => {
      const y = window.scrollY, offset = 200;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (y >= offsetTop - offset && y < offsetTop + offsetHeight - offset) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // — Effects: toggle sticky header
  useEffect(() => {
    const onScroll = () => {
      const about = document.getElementById('about');
      if (!about) return;
      setShowHeader(about.getBoundingClientRect().top <= 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // — Effects: mobile menu height
  useEffect(() => {
    if (mobileMenuOpen && navRef.current) {
      setNavHeight(navRef.current.scrollHeight);
    }
  }, [mobileMenuOpen]);

  // 1️⃣ When mobileMenuOpen toggles, grab the height if the ref exists:
  useEffect(() => {
    if (mobileMenuOpen) {
      const height = navRef.current?.scrollHeight ?? 0
      setNavHeight(height)
    }
  }, [mobileMenuOpen])

  // 2️⃣ ResizeObserver only when navRef.current is non-null
  useEffect(() => {
    const el = navRef.current
    if (!el) return

    const observer = new ResizeObserver(() => {
      if (mobileMenuOpen) {
        setNavHeight(el.scrollHeight)
      }
    })
    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [mobileMenuOpen])

  // — Effects: scroll & slideshow
  useEffect(() => {
    const onScrollY = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScrollY);
    const iv = setInterval(() => setCurrentSlide(p => (p + 1) % images.length), 5000);
    window.addEventListener('scroll', onScrollY);
    return () => {
      clearInterval(iv);
      window.removeEventListener('scroll', onScrollY);
    };
  }, [images.length]);

  const sliderSettings = {
    dots: true, infinite: true, speed: 800,
    slidesToShow: 1, slidesToScroll: 1,
    autoplay: true, autoplaySpeed: 3500,
    arrows: false,
  };


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
        <title>I&A International – Where Luxury Meets Elegance</title>
        <meta name="description" content="Discover I&A International’s luxury jewelry and fashion brands. Explore craftsmanship, recruitment, and world-class collections." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>


      <>
        {/* === Sticky Header (Visible after Hero scroll) === */}
        {showHeader && (
          <header
            className={cn(
              "fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-md text-black font-termina text-sm",
              "transition-all duration-500 ease-out animate-slideDown"
            )}
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" passHref legacyBehavior>
                <a>
                  <Image src="/img/logo.png" alt="Logo" width={90} height={36} />
                </a>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-8">
                <Link
                  href="/about-us"
                  className="relative group flex items-center gap-1 transition text-black"
                >
                  About Us
                  <span
                    className="absolute -bottom-1 left-0 h-[1.5px] bg-black w-0 group-hover:w-full transition-all duration-300"
                  />
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

                <Link href="/contact-us" passHref legacyBehavior>
                  <a
                    className={`relative group flex items-center gap-1 text-sm transition "text-black font-semibold" : "text-gray-700 hover:text-black"
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
                      <path d="M21 10l-6 6-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-black group-hover:w-full transition-all duration-300" />
                  </a>
                </Link>

                {/* Search Icon */}
                <button className="hover:text-gray-300 transition">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </nav>

              {/* Mobile Toggle Button */}
              <button
                className="md:hidden focus:outline-none z-50 relative"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                <motion.svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  initial={false}
                  animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {mobileMenuOpen ? (
                    <motion.path
                      d="M6 18L18 6M6 6l12 12"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  ) : (
                    <motion.path
                      d="M4 6h16M4 12h16M4 18h16"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  )}
                </motion.svg>
              </button>
            </div>

            {/* === Mobile Navigation Menu === */}
            <AnimatePresence initial={false}>
              {mobileMenuOpen && (
                <motion.div
                  key="mobile-nav"
                  className="md:hidden px-4 pt-2 overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: navHeight, opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                    opacity: { duration: 0.2, ease: "easeOut" },
                  }}
                >
                  <div ref={navRef}>
                    {/* Divider */}
                    <div className="w-full h-[1.5px] bg-black mb-4" />

                    {/* Mobile Nav List */}
                    <nav className="flex flex-col items-center gap-4 pb-4">
                      {/* About Us */}
                      <Link href="/about-us" passHref legacyBehavior>
                        <a
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-sm  hover:text-black transition"
                        >
                          About Us
                        </a>
                      </Link>

                      {/* === Our Brands Dropdown (click‑twice) === */}
                      <div ref={containerRef} className="relative w-full text-center">
                        {/* Trigger Row */}
                        <div className="flex items-center justify-center w-full py-2 text-sm">
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

                      {/* Contact */}
                      <Link href="/contact-us" passHref legacyBehavior>
                        <a
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-1 text-sm hover:text-black transition px-4 py-2"
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

        )}
        {/* === Hero Section === */}
        <section className="relative h-[100vh] sm:h-screen w-full overflow-hidden font-termina">
          {/* Static Logo top-left */}
          <div className="absolute top-10 left-6 z-50">
            <Image
              src="/img/logo.png"
              alt="I&A International Logo"
              width={100}
              height={40}
              priority
              className="filter brightness-0 invert"
            />
          </div>

          {/* Vertical Side Navigation (Right) */}
          <div className="absolute top-16 right-4 z-50 text-white flex flex-col items-end space-y-5 text-sm">
            {/* Search Button */}
            <button className="hover:text-gray-300 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {["about", "brands", "contact"].map((section) => {
              if (section === "about") {
                return (
                  <Link key={section} href="/about-us" passHref>
                    <div className="relative group cursor-pointer text-white hover:text-gray-300 transition flex items-center gap-1">
                      About Us
                      <span className="absolute -bottom-1 left-0 h-[1.5px] bg-white w-0 group-hover:w-full transition-all duration-300" />
                    </div>
                  </Link>
                );
              }

              if (section === "brands") {
                return (
                  <div ref={containerRef} className="relative">
                    {/* Main Link */}
                    <Link
                      href="/our-brands"
                      onClick={handleClick}
                      className="group flex items-center gap-1 text-white transition cursor-pointer relative"
                      passHref
                    >
                      <div className="flex items-center gap-1">
                        Our Brands
                        <span
                          className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-white
                   transition-all duration-300 group-hover:w-full"
                        />
                        <svg
                          className={`w-4 h-4 mt-[1px] transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
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
                      </div>
                    </Link>

                    {/* Dropdown Menu: below on mobile, to the left on desktop */}
                    {isOpen && (
                      <div
                        className="
      absolute
      top-full inset-x-0              /* mobile: full‑width below trigger */
      md:top-0 md:right-full md:inset-x-auto  /* desktop: beside trigger */
      md:mr-2                          /* small gap on desktop */
      w-full md:min-w-[12rem]          /* full width mobile, at least 18rem on desktop */
      bg-white text-black rounded-md shadow-lg z-50
      max-h-[60vh] overflow-y-auto divide-y divide-gray-200
      px-2 md:px-0
    "
                      >
                        {brands.map((b) => (
                          <Link
                            key={b.name}
                            href={b.href}
                            className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap transition"
                          >
                            {b.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              // section === "contact"
              return (
                <Link key={section} href="/contact-us" passHref>
                  <div className="relative group flex items-center gap-1 text-white hover:opacity-80 transition">
                    GET IN TOUCH
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 10l-6 6-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-white group-hover:w-full transition-all duration-300" />
                  </div>
                </Link>

              );
            })}
          </div>


          {/* Hero Background Images with Fade + Parallax */}
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"
                }`}
              style={{ transform: `translateY(${scrollY * 0.2}px)` }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={img}
                  alt={`Hero image ${index + 1}`}
                  fill
                  className={`object-cover transition-transform ease-in-out duration-[5000ms] ${index === currentSlide ? "scale-110" : "scale-100"
                    }`}
                  style={{ objectPosition: "center top" }}
                  quality={90}
                  priority={index === 0}
                  sizes="100vw"
                />

                {/* Gradient overlay + black vignette */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Faded dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

                  {/* Black vignette */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.5) 100%)',
                    }}
                  />
                </div>
              </div>
            </div>

          ))}

          {/* Hero Text */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
              <Typewriter
                words={["I&A International", "Luxury Redefined", "Where Fashion Meets Elegance"]}
                loop
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </h1>
            <p className="text-base sm:text-lg md:text-2xl max-w-2xl">
              Explore timeless elegance and high fashion with I&A International.
            </p>
          </div>
        </section>
      </>




      <section id="about" className="py-20 bg-white text-black px-4 sm:px-6 max-w-6xl mx-auto font-termina">
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg">
            Discover our legacy, mission, and passion for luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">
              I&A <span className="font-light">INTERNATIONAL</span>
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-sm sm:text-base">
              Where luxury meets elegance and quality. I&A International is a well-established Albanian jewelry retailer founded by Artan Cuci in 1991. Now a leader in the jewelry industry with internationally acclaimed luxury brands.
            </p>
            <a href="#" className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-md font-medium hover:bg-gray-800 transition">
              View More <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="w-full">
            <Slider {...sliderSettings}>
              <div>
                <Image
                  src="/img/mansitting.png"
                  alt="Jewelry close‑up"
                  width={500}
                  height={500}
                  className="rounded-md w-full h-auto object-cover"
                />
              </div>
              <div>
                <Image
                  src="/img/handsring.jpg"
                  alt="Hand with rings"
                  width={500}
                  height={500}
                  className="rounded-md w-full h-auto object-cover"
                />
              </div>
            </Slider>
          </div>

        </div>
      </section>

    {/* === Timeline Section === */}
<section className="py-24 px-6 bg-white font-termina" id="timeline">
  <div className="max-w-4xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
      Our Journey
    </h2>

    <motion.div
      ref={ref}
      className="relative space-y-12"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
    >
      {/* Vertical center line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gray-300" />

      {timelineData.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className={`relative flex flex-col items-center text-center`}
        >
          {/* Dot */}
          <div className="z-10 w-4 h-4 bg-black rounded-full mb-3"></div>
          {/* Content */}
          <div className="bg-white px-4 py-2 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800">{item.year}</h3>
            <p className="text-sm text-gray-600 mt-2">{item.text}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>


      <section id="brands" className="py-20 bg-gray-100 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-10 sm:mb-12">Our Brands</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
            {[
              { name: "Altinbas", img: "/img/necklacebrad.jpeg", productImg: "/img/necklace.jpg" },
              { name: "BELMA", img: "/img/belmajewelry.jpeg", productImg: "/img/rings.jpeg" },
              { name: "BOSS", img: "/img/boss.jpg", productImg: "/img/bossing.jpeg" },
              { name: "Estee", img: "/img/esteljewel.jpeg", productImg: "/img/ladyblack.jpeg" },
              { name: "GELOSIA", img: "/img/gelosiaa.png", productImg: "/img/gayblack.jpg" },
              { name: "Lagerfeld", img: "/img/karllagerfeld.png", productImg: "/img/karl.webp" },
              { name: "ZEN", img: "/img/zen-diamond-logo.jpg", productImg: "/img/zen.webp" },
              { name: "KORS", img: "/img/michael kors.webp", productImg: "/img/womankors.webp" },
              { name: "Pandora", img: "/img/pandora.jpg", productImg: "/img/pandorabracelet.jpeg" },
              { name: "Bravo", img: "/img/roberto bravo.png", productImg: "/img/noahsark.webp" },
            ].map((brand, idx) => (
              <div key={idx} className="relative w-full aspect-square [perspective:1000px]">
                <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] hover:[transform:rotateY(180deg)]">

                  {/* Front Face */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded overflow-hidden shadow-md flex items-center justify-center">
                    <img
                      src={brand.img}
                      alt={brand.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Back Face (Product Image Fill) */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded overflow-hidden shadow-md">
                    <img
                      src={brand.productImg}
                      alt={`${brand.name} Product`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20 bg-beige-50 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-900">Recruitment</h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base mb-4">
              Join our team of jewelry and sales experts and help us bring unparalleled quality and customer service to the world of luxury jewelry retail.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              At our company, we are dedicated to providing our customers with an unforgettable shopping experience, and we believe that our employees are key to achieving this goal.
            </p>
            <a href="#" className="mt-6 inline-block text-black font-medium hover:underline transition-all duration-200">
              View More →
            </a>
          </div>
          <div className="w-full aspect-video">
            <video
              src="/img/recruitement.mp4"
              autoPlay
              muted
              loop
              playsInline
              controls
              className="rounded-md w-full h-full object-cover shadow-md"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl sm:text-4xl font-bold mb-4 text-gray-900">Craftsmanship</h3>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg mb-6">
              From the delicate filigree work to the precision setting of diamonds, we believe every detail matters. We’re proud to offer jewelry crafted with utmost care and attention to detail.
            </p>
            <Link href="/contact-us" passHref className="inline-block border px-6 py-2 border-black rounded-full hover:bg-black hover:text-white transition-colors duration-300">
              Contact Us
            </Link>
          </div>
          <div className="overflow-hidden rounded-md shadow-md group">
            <img src="/img/craftsmanship.jpg" alt="Craftsman working" className="w-full h-auto object-cover transition-transform duration-1000 ease-in-out group-hover:scale-105" />
          </div>
        </div>
      </section>

      <section id="contact" className="relative bg-gray-100 py-24 px-4 sm:px-6">
        <div className="absolute inset-0 z-0">
          <Image src="/img/handsring.jpg" alt="Jewelry on hand" layout="fill" objectFit="cover" className="opacity-30" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto bg-white/30 backdrop-blur-[10px] border border-white/40 rounded-2xl p-6 sm:p-10 shadow-2xl">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
            Get in touch or <span className="underline">visit us</span>
          </h3>
          <p className="mb-6 text-sm sm:text-base text-gray-700">
            Rr.Kavajës, Pallati Mio 2000, Tirana, Albania<br />
            info@ia-international.com
          </p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex items-center border border-gray-300/50 rounded-md px-3 py-2 bg-white/60 shadow-sm">
              <UserIcon className="w-5 h-5 text-gray-500 mr-2" />
              <input type="text" placeholder="Your name" className="w-full outline-none bg-transparent text-sm text-gray-800 placeholder-gray-500" />
            </div>
            <div className="flex items-center border border-gray-300/50 rounded-md px-3 py-2 bg-white/60 shadow-sm">
              <MailIcon className="w-5 h-5 text-gray-500 mr-2" />
              <input type="email" placeholder="Email address" className="w-full outline-none bg-transparent text-sm text-gray-800 placeholder-gray-500" />
            </div>
            <div className="flex items-start border border-gray-300/50 rounded-md px-3 py-2 bg-white/60 shadow-sm md:col-span-2">
              <MessageSquareIcon className="w-5 h-5 text-gray-500 mt-1 mr-2" />
              <textarea placeholder="Your message" rows="4" className="w-full outline-none bg-transparent text-sm text-gray-800 resize-none placeholder-gray-500"></textarea>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <button type="submit" className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors duration-300 shadow-md">
                Send →
              </button>
            </div>
          </form>
        </div>
      </section>



      <footer className="bg-black text-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">

          {/* Logo and Copyright */}
          <div className="flex flex-col items-center sm:items-start">
            <Image
              src="/img/logo.png"
              alt="I&A International Logo"
              width={120}
              height={40}
              priority
              className="filter brightness-0 invert mb-4"
            />
            <p className="text-sm text-gray-400 leading-relaxed">
              © {new Date().getFullYear()} I&A International.<br className="hidden sm:inline" /> All Rights Reserved.
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-semibold text-white mb-3 text-lg">Contact Us</h4>
            <p className="text-gray-400 text-sm break-words">info@ia-international.com</p>
          </div>

          {/* Address & Socials */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-semibold text-white mb-3 text-lg">Our Address</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Rr.Kavajës, Pallati Mio 2000<br />
              Tirana, Albania
            </p>
            <div className="flex justify-center sm:justify-start gap-4">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

        </div>
      </footer>

    </>
  );
}
