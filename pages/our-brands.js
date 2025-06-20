import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { LinkedinIcon, FacebookIcon, InstagramIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
 import Slider from 'react-slick';
 import {
  ArrowRight,
  MailIcon,
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

export default function About() {

  const cn = (...classes) => classes.filter(Boolean).join(" ");
  

    const router = useRouter();
    const isBrandsPage = router.pathname === '/our-brands';
   const [activeSection, setActiveSection] = useState(null);
  const [offsetY, setOffsetY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const isMobile = useIsMobile();
  
  const [showHeader, setShowHeader] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

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
                <title>Our Brands – I&A International</title>
                <meta name="description" content="Learn more about I&A International – Our story, vision, and values." />
            </Head>

            {/* === Banner Section === */}
            <div className="w-full h-64 relative overflow-hidden banner-section">
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-300 ease-out"
                    style={{
                        backgroundImage: 'url("/img/ourbrandsbanner.png")',
                        transform: `translateY(${offsetY * 0.3}px)`,
                    }}
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center justify-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase">Our Brands</h2>
                </div>
            </div>

        <header className={cn(
          "fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-md text-black font-termina text-sm",
          "transition-all duration-500 ease-out animate-slideDown"
        )}>
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" passHref legacyBehavior>
              <a>
                <Image src="/img/logo.png" alt="Logo" width={90} height={36} />
              </a>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/about-us" className="relative group transition text-black flex items-center gap-1">
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

              <Link href="/contact-us" passHref legacyBehavior>
                <a className="relative group text-sm transition flex items-center gap-1 text-gray-700 hover:text-black">
                  GET IN TOUCH
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M21 10l-6 6-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                </a>
              </Link>

              {/* Search Icon */}
              <button className="hover:text-gray-300 transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </nav>

            {/* Mobile Toggle Button */}
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
        height: 'auto',
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
      <div>
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
                        <div className="flex items-center justify-center w-full py-2 text-sm text-gray-700">
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
              className="text-sm flex items-center gap-1 text-gray-700 hover:text-black transition"
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


<section id="brands" className="py-24 bg-white px-4 sm:px-6">
  <div className="max-w-6xl mx-auto text-center">
    {/* Luxury intro content */}
    <div className="mb-16">
      <h3 className="text-3xl sm:text-4xl font-semibold tracking-wide uppercase text-gray-900 mb-4">
        Representing <span className="text-[#D4AF37]">Timeless Luxury</span>
      </h3>
      <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        We proudly represent a curated selection of global luxury brands that embody timeless elegance, craftsmanship, and iconic design. Each brand in our portfolio reflects a legacy of sophistication and innovation.
      </p>
    </div>

    {/* Brand cards */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-10">
      {[
        { name: "Altınbaş", img: "/img/necklacebrad.jpeg", productImg: "/img/necklace.jpg", tagline: "Jewelry Brand" },
        { name: "BELMA", img: "/img/belmajewelry.jpeg", productImg: "/img/rings.jpeg", tagline: "Jewelry Brand" },
        { name: "BOSS", img: "/img/boss.jpg", productImg: "/img/bossing.jpeg", tagline: "Fashion Brand" },
        { name: "ESTÉE", img: "/img/esteljewel.jpeg", productImg: "/img/ladyblack.jpeg", tagline: "Jewelry Brand" },
        { name: "GELOSIA", img: "/img/gelosiaa.png", productImg: "/img/gayblack.jpg", tagline: "Jewelry Brand" },
        { name: "LAGERFELD", img: "/img/karllagerfeld.png", productImg: "/img/karl.webp", tagline: "Fashion Brand" },
        { name: "ZEN", img: "/img/zen-diamond-logo.jpg", productImg: "/img/zen.webp", tagline: "Jewelry Brand" },
        { name: "MICHAEL KORS", img: "/img/michael kors.webp", productImg: "/img/womankors.webp", tagline: "Fashion Brand" },
        { name: "PANDORA", img: "/img/pandora.jpg", productImg: "/img/pandorabracelet.jpeg", tagline: "Jewelry Brand" },
        { name: "ROBERTO BRAVO", img: "/img/roberto bravo.png", productImg: "/img/noahsark.webp", tagline: "Jewelry Brand" },
      ].map((brand, idx) => (
        <div key={idx} className="group flex flex-col items-center transition-transform duration-300 hover:scale-[1.02]">
          {/* Image Card */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] rounded-xl overflow-hidden shadow-xl border border-gray-200">
            <img
              src={brand.productImg}
              alt={`${brand.name} Product`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Brand Name */}
          <h4 className="mt-4 text-sm font-semibold text-gray-900 tracking-wide">{brand.name}</h4>

          {/* Tagline with hover effect */}
          <p className="text-xs italic text-gray-500 mt-1 transition duration-300 group-hover:text-[#D4AF37]">
            {brand.tagline}
          </p>
        </div>
      ))}
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
