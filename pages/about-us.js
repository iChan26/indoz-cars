// pages/about.js

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
import { LinkedinIcon, FacebookIcon, InstagramIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import Slider from 'react-slick';
import {
  ArrowRight,
  MailIcon,
  UserIcon,
  MessageSquareIcon,
} from 'lucide-react';

// Helpers & Hooks


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

  const router = useRouter();
  const isBrandsPage = router.pathname === '/about-us';
  const [activeSection, setActiveSection] = useState(null);
  const [offsetY, setOffsetY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cn = (...classes) => classes.filter(Boolean).join(" ");
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);
  const isMobile = useIsMobile();


  const [showHeader, setShowHeader] = useState(false);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);


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

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
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
  
  return (
    <>
      <Head>
        <title>About Us – I&A International</title>
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
                <Link href="/press" className="relative hover:font-semibold transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">Press</Link>

              {/* Dropdown Nav */}
              <div className="relative group">
                <Link href="/our-brands" className="flex items-center gap-1 relative hover:font-semibold transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                  Our Brands
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
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
                  className="relative hover:font-semibold transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
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
              <span className="text-[#000] font-semibold">ABOUT US</span>
            </div>
          </div>
        </div>
      </section>


<section id="about" className="bg-[#fff] py-16 px-4 sm:px-6 md:px-10 lg:px-12 font-serif">
  <div className="max-w-container-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-16 items-start">

    {/* === Left: Text Content === */}
    <div className="text-left order-2 lg:order-1">
      <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-light text-[#555] leading-snug tracking-tight">
        Defining Elegance Since 1991
      </h2>

      <p className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.7] sm:leading-[1.8] text-[#444] font-normal tracking-normal mt-4">
        Where luxury meets elegance and quality. I&A International Company is a well-established Albanian jewelry retailer that was founded by Artan Caushi in 1991. The company has since grown to become a leading player in the jewelry industry, with several stores across Albania and an extensive collection of internationally acclaimed jewelry brands.
      </p>

      <p className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] text-[#555] leading-[1.9] sm:leading-[2.1] mt-4 mb-6 font-[500] tracking-wide">
        As an official reseller of some of the world’s most prestigious jewelry brands, I&A International Company has built a reputation for offering exquisite and high-quality jewelry pieces to its customers. With exclusive selling rights in Albania for major brands such as Anna Maria Cammilli, Fope, Mirco Visconti, and Ititoli, the company provides a diverse range of jewelry that caters to the varied tastes and preferences of its customers.

        <br className="hidden sm:block" />

        In addition to its jewelry collection, I&A International Company also has exclusive selling rights for several luxury watch brands, including Eberhard & Co, Louis Erard, Bomberg, Eterna, and Wainer. The company is committed to offering its customers an unparalleled shopping experience, which is why it strives to offer only the finest luxury brands in the industry.
      </p>
    </div>

    {/* === Right: Image === */}
    <div className="w-full order-1 lg:order-2">
      <div className="aspect-[3/2] w-full overflow-hidden shadow-sm">
        <Image
          src="/img/girlwithring.png"
          alt="Elegant woman wearing jewelry"
          width={720}
          height={480}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    
  </div>
</section>



<section className="bg-[#f2f2f2] py-16 px-4 sm:px-6 md:px-10 lg:px-12 font-serif">
  <div className="max-w-container-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-16 items-start">

    {/* === Left: Image === */}
    <div className="w-full order-1">
      <div className="aspect-[3/2] w-full overflow-hidden shadow-sm">
        <Image
          src="/img/legacy-of-elegance.jpg"
          alt="Luxury design process"
          width={720}
          height={480}
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* === Right: Text === */}
    <div className="text-left order-2">
      <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-[3rem] font-light text-[#555] leading-snug tracking-tight">
        A Legacy of Elegance, Born in Albania
      </h2>

      <p className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.7] sm:leading-[1.9] text-[#555] font-normal tracking-normal mt-4">
        I&A International Company is a distinguished name in Albania’s luxury landscape. Founded by Artan Caushi in 1991, the company has consistently raised the standard in fine jewelry through a deep commitment to quality, elegance, and refinement.
      </p>

      <p className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.7] sm:leading-[1.9] text-[#555] font-normal tracking-normal mt-4">
        With multiple boutiques across Albania and a handpicked selection of internationally acclaimed jewelry brands, we offer more than just adornments—we offer stories of heritage, artistry, and excellence. Our growth reflects a passion for luxury that continues to shape the future of jewelry in the region.
      </p>

      {/* === Read More Button === */}
      <div className="flex sm:justify-start justify-center">
        <a
          href="/about-us"
          className="mt-6 border border-black text-black px-4 sm:px-6 py-2 text-[0.95rem] sm:text-[1.23rem] hover:bg-[#000] hover:text-white transition"
        >
          Read more
        </a>
      </div>
    </div>

  </div>
</section>






<section className="bg-[#fff] py-16 px-4 sm:px-6 md:px-10 lg:px-12 font-serif">
  <div className="max-w-container-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-12 lg:gap-x-16 items-start">

    {/* === Right: Image (shown first on mobile) === */}
    <div className="order-1 lg:order-2 w-full">
      <div className="aspect-[3/2] w-full overflow-hidden shadow-sm">
        <Image
          src="/img/what-set-us-apart.jpg"
          alt="I&A International Team Discussion"
          width={800}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* === Left: Text Content === */}
    <div className="order-2 lg:order-1 text-left">
      <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-light text-[#555] leading-snug tracking-tight">
        What Sets Us Apart?
      </h2>

      <p className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.8] text-[#555] font-normal tracking-normal mt-4">
        At I&A International, luxury is not just a product, it’s a legacy. Since 1991, our company has redefined elegance in Albania by blending heritage craftsmanship with modern excellence. Founded by Artan Caushi, we’ve built more than a business—we’ve cultivated a symbol of prestige and refinement.
      </p>

      <p className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.8] text-[#555] font-normal tracking-normal mt-4">
        With a curated collection of world-renowned jewelry brands and multiple boutiques across Albania, we offer an experience where quality, authenticity, and attention to detail are paramount. Our commitment goes beyond aesthetics—it lies in delivering timeless pieces that speak of individuality and sophistication.
      </p>

      {/* Responsive Button */}
      <div className="mt-6 flex justify-center lg:justify-start">
        <a
          href="/about-us"
          className="inline-block border border-black text-black px-5 py-2 text-[1rem] sm:text-[1.125rem] hover:bg-black hover:text-white transition"
        >
          Read more
        </a>
      </div>
    </div>
  </div>
</section>






 <section className="bg-[#ececec] py-16 px-4 sm:px-6 md:px-8 lg:px-10">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center font-serif">

    {/* === Mission === */}
    <div className="px-2 sm:px-4">
      <div className="flex justify-center mb-4 sm:mb-6">
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#4a4a4a]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-xl sm:text-2xl font-[520] text-[#2e2e2e] mb-3 sm:mb-4 tracking-wide">
        Our Mission
      </h3>
      <p className="text-[0.95rem] sm:text-[1.0625rem] text-[#3a3a3a] leading-[1.7] sm:leading-[1.9] font-[450] tracking-wide">
        To deliver exceptional jewelry and accessories that reflect each customer's unique style, while upholding the highest standards in service and satisfaction.
      </p>
    </div>

    {/* === Vision === */}
    <div className="px-2 sm:px-6 border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-gray-300">
      <div className="flex justify-center mb-4 sm:mb-6">
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#4a4a4a]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-xl sm:text-2xl font-[520] text-[#2e2e2e] mb-3 sm:mb-4 tracking-wide">
        Our Vision
      </h3>
      <p className="text-[0.95rem] sm:text-[1.0625rem] text-[#3a3a3a] leading-[1.7] sm:leading-[1.9] font-[450] tracking-wide">
        To become Albania’s leading luxury jewelry retailer, expanding internationally with a commitment to quality, trust, and refined luxury.
      </p>
    </div>

    {/* === Values === */}
    <div className="px-2 sm:px-4">
      <div className="flex justify-center mb-4 sm:mb-6">
        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#4a4a4a]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M12 2l7 4v5c0 5-3 9-7 11-4-2-7-6-7-11V6l7-4z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-xl sm:text-2xl font-[520] text-[#2e2e2e] mb-3 sm:mb-4 tracking-wide">
        Our Values
      </h3>
      <p className="text-[0.95rem] sm:text-[1.0625rem] text-[#3a3a3a] leading-[1.7] sm:leading-[1.9] font-[450] tracking-wide">
        We value <strong>integrity</strong>, <strong>innovation</strong>, and <strong>excellence</strong>. We embrace diversity, uphold transparency, and consistently aim to exceed expectations in everything we do.
      </p>
    </div>

  </div>
</section>


<section className="py-20 px-4 sm:px-6 bg-white font-serif" id="timeline">
  <div className="max-w-4xl mx-auto font-[450]">
    <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#2e2e2e] font-[520] text-center mb-14 sm:mb-16 tracking-wide">
      Our Journey
    </h2>

    <motion.div
      ref={ref}
      className="relative"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
    >
      {/* Center vertical line */}
      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-[2px] bg-gray-300 h-full z-0 hidden sm:block" />

      <div className="space-y-12 sm:space-y-16">
        {timelineData.map((item, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`
                relative flex flex-col sm:flex-row items-start sm:items-center 
                ${isEven ? 'sm:justify-end' : 'sm:justify-start'} group
              `}
            >
              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full z-10 hidden sm:block" />

              {/* Timeline Text Block */}
              <div
                className={`
                  w-full sm:w-[calc(50%-1rem)] md:w-[calc(50%-2rem)]
                  ${isEven ? 'text-left sm:pr-4' : 'text-left sm:text-right sm:pl-4'}
                `}
              >
                <h3 className="text-base sm:text-lg font-[520] text-[#333] mb-2 tracking-wide">
                  {item.year}
                </h3>
                <p className="text-sm sm:text-[1.0625rem] text-[#4a4a4a] leading-[1.75] sm:leading-[1.9] font-[450] tracking-wide">
                  {item.text}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  </div>
</section>







{/* === Corporate Responsibility Section === */}
<section className="bg-[#ececec] py-20 px-4 sm:px-6 md:px-12 lg:px-20 font-serif font-[450]">
  <div className="max-w-[1320px] mx-auto">

    {/* Section Heading */}
    <div className="text-center mb-12 sm:mb-14">
      <h2 className="text-[1.75rem] sm:text-[2.25rem] md:text-4xl text-[#2f2f2f] font-[520] tracking-wide">
        Corporate Responsibility
      </h2>
      <p className="text-[1rem] sm:text-[1.0625rem] md:text-[1.125rem] text-[#555] mt-3 sm:mt-4 max-w-3xl mx-auto leading-[1.8] sm:leading-[1.9] font-[450]">
        We believe in doing business the right way — ethically, sustainably, and with a deep sense of community responsibility.
      </p>
    </div>

    {/* Grid: Content + Image */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 items-start">

      {/* === Left Column: Text Content === */}
      <div className="space-y-5 sm:space-y-6 text-[#3a3a3a] text-[0.95rem] sm:text-[1.0625rem] leading-[1.8] sm:leading-[1.9] order-2 md:order-1 font-[450] tracking-wide">
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

      {/* === Right Column: Image with Overlay Quote === */}
      <div className="relative order-1 md:order-2">
        <div className="w-full rounded-md overflow-hidden shadow-md aspect-[4/3] sm:aspect-[3/2]">
          <img
            src="/img/discussing-document-min.jpg"
            alt="Corporate responsibility in action"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute bottom-3 left-3 right-3 bg-white/90 px-4 py-3 rounded shadow-md">
          <p className="text-xs sm:text-sm text-gray-800 italic font-[460] tracking-wide whitespace-nowrap overflow-hidden border-r-2 border-gray-800 animate-typewriter">
            "Sustainability and responsibility are not choices — they are our commitments."
          </p>
        </div>
      </div>

    </div>
  </div>
</section>



   <section className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 md:px-20 bg-white font-serif font-[450]">
  <div className="max-w-[1320px] mx-auto text-center">

    {/* Section Heading */}
    <h2 className="text-[2rem] sm:text-3xl md:text-4xl text-[#2f2f2f] font-[520] tracking-wide mb-3 sm:mb-4">
      Our Commitments
    </h2>
    <p className="text-[1rem] sm:text-[1.0625rem] md:text-[1.125rem] text-[#555] max-w-2xl mx-auto mb-10 sm:mb-14 leading-[1.8] sm:leading-[1.9] font-[450] px-2 sm:px-0">
      At I&A International, we are driven by a deep sense of responsibility in every aspect of our business. Our commitments reflect our values and guide our actions.
    </p>

    {/* Grid Cards */}
    <div className="grid gap-6 sm:gap-8 md:gap-10 md:grid-cols-3">

      {/* Card Template */}
      {[
        {
          title: "Business Ethics",
          icon: (
            <path d="M9 12l2 2 4-4M12 2a10 10 0 1010 10A10 10 0 0012 2z" />
          ),
          text: "We uphold integrity, transparency, and fairness in all our dealings. Ethical standards are the foundation of our company’s success."
        },
        {
          title: "Social Performance",
          icon: (
            <path d="M17 20h5v-2a3 3 0 00-3-3h-2m-4 5v-6a3 3 0 00-3-3H7a3 3 0 00-3 3v6h6zm-3-8V4a4 4 0 118 0v8" />
          ),
          text: "We value people. From fair working conditions to inclusive practices, our social commitment drives long-term positive impact."
        },
        {
          title: "Environmental Performance",
          icon: (
            <path d="M12 8v4l3 3m6-3A9 9 0 113 12a9 9 0 0118 0z" />
          ),
          text: "We are dedicated to minimizing our environmental footprint through sustainable operations and eco-conscious packaging."
        }
      ].map((card, index) => (
        <div
          key={index}
          className="bg-[#f8f8f8] rounded-lg shadow-sm p-6 sm:p-8 transition hover:shadow-md text-center sm:text-left"
        >
          <div className="flex justify-center sm:justify-start items-center w-14 h-14 sm:w-16 sm:h-16 mb-4 sm:mb-5 mx-auto sm:mx-0 bg-gray-100 rounded-full">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              {card.icon}
            </svg>
          </div>
          <h3 className="text-lg sm:text-xl text-[#2e2e2e] font-[520] mb-2 sm:mb-3 tracking-wide">
            {card.title}
          </h3>
          <p className="text-[0.9375rem] sm:text-[0.975rem] text-[#666] leading-relaxed font-[450]">
            {card.text}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>


<section className="bg-[#ececec] py-16 px-4 sm:px-6 md:px-12 font-serif">
  <div className="max-w-7xl mx-auto">
    
    {/* Title */}
    <div className="mb-10 sm:mb-12 text-center sm:text-left">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-800 font-normal border-b-2 border-gray-300 inline-block pb-2">
        Our Presence
      </h2>
    </div>

    {/* Locations Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      
      {/* Tirana */}
      <div>
        <div className="w-full h-48 sm:h-56 overflow-hidden rounded-md shadow-md mb-3 sm:mb-4">
          <img
            src="/img/location-tirana.jpg"
            alt="Tirana Boutique"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xs text-gray-500 uppercase mb-1 sm:mb-2 tracking-wide">
          Tirana
        </p>
        <h3 className="text-base sm:text-lg text-gray-800 font-normal leading-snug">
          Our flagship boutique is located in the heart of Tirana, showcasing exclusive international jewelry collections.
        </h3>
      </div>

      {/* Durres */}
      <div>
        <div className="w-full h-48 sm:h-56 overflow-hidden rounded-md shadow-md mb-3 sm:mb-4">
          <img
            src="/img/location-durres.jpg"
            alt="Durres Boutique"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xs text-gray-500 uppercase mb-1 sm:mb-2 tracking-wide">
          Durres
        </p>
        <h3 className="text-base sm:text-lg text-gray-800 font-normal leading-snug">
          A luxurious shopping experience by the Adriatic coast, our Durres location highlights timeless elegance.
        </h3>
      </div>

      {/* Global Partnerships */}
      <div>
        <div className="w-full h-48 sm:h-56 overflow-hidden rounded-md shadow-md mb-3 sm:mb-4">
          <img
            src="/img/location-global.jpg"
            alt="Global Brand Presence"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-xs text-gray-500 uppercase mb-1 sm:mb-2 tracking-wide">
          Global
        </p>
        <h3 className="text-base sm:text-lg text-gray-800 font-normal leading-snug">
          Through our partnerships with brands like Fope, Anna Maria Cammilli, and Eberhard & Co, we bring global excellence to Albania.
        </h3>
      </div>

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