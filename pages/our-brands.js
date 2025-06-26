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
        <div className="flex justify-between items-center text-white hover:text-gray-300 cursor-pointer transition w-full ">
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

  const isActive = router.pathname === '/our-brands';
  // ─── Inline “click‑twice” dropdown state & handler ─────────────────────────

  const [tappedOnce, setTappedOnce] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
 const [mobileNavOpen, setMobileNavOpen] = useState(false);
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
        <title>Our Brands – I&A International</title>
        <meta name="description" content="Learn more about I&A International – Our story, vision, and values." />
      </Head>

       <section className="relative font-termina">
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
              <Link href="/" className="relative hover:font-semibold transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">Home</Link>
                          <Link
                              href="/press"
                              className={`relative transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:bg-black after:transition-all after:duration-300
    hover:after:w-full hover:font-semibold`}
                          >
                              Press
                          </Link>

              {/* Dropdown Nav */}
              <div className="relative group">
                <Link
                  href="/our-brands"
                  className={`flex items-center gap-1 relative transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:bg-black after:transition-all after:duration-300
        ${isActive ? 'font-semibold after:w-full' : 'hover:font-semibold after:w-0 hover:after:w-full'}`}
                >
                  Our Brands
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
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
              <Link
                href="/about-us"
                className={`relative hover:font-semibold transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:bg-black after:transition-all after:duration-300 ${router.pathname === '/about-us' ? 'after:w-full font-semibold' : 'after:w-0'
                  }`}
              >
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
                    <Link href="/our-brands" className="hover:font-semibold transition">
                      Our Brands
                    </Link>
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
                    <Link key={b.name} href={b.href} className="block hover:text-gray-300 transition">
                      {b.name}
                    </Link>
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
              <span className="text-[#000] font-semibold">Our Brands</span>
            </div>
          </div>
        </div>
      </section>


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
              { name: "ROBERTO BRAVO", img: "/img/roberto bravo.png", productImg: "/img/noahsark.png", tagline: "Jewelry Brand" },
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
