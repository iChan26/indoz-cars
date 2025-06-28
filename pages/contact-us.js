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
    : 'after:w-0'} hover:after:w-full hover:font-semibold`}
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
  <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem]  font-light text-[#555] leading-snug tracking-tight">
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

     <section id="contact" className="py-20 px-4 sm:px-6 bg-white">
  <div className="max-w-5xl mx-auto bg-white overflow-hidden">
    <h3 className="text-center text-[1.500rem] mb-6 text-[#555] font-light font-serif">
      For all other enquiries, please use the following contact form:
    </h3>

    <form className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 md:px-12 pb-10">
      {/* Title */}
      <div className="col-span-1 md:col-span-2">
        <label className="text-[1.200rem] block text-sm font-medium text-[#111] mb-1">
          Title <span className="text-red-500">*</span>
        </label>
        <select className="w-full border border-gray-300 rounded px-3 py-2">
          <option>Select</option>
           <option>Mr</option>
            <option>Ms</option>
             <option>Mrs</option>
              <option>Dr</option>
               <option>Other</option>
        </select>
      </div>

      {/* First Name */}
      <div>
        <label className="text-[1.200rem] block text-sm font-medium text-[#111] mb-1">
          First Name <span className="text-red-500">*</span>
        </label>
        <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>

      {/* Last Name */}
      <div>
        <label className="text-[1.200rem] block text-sm font-medium text-[#111] mb-1">
          Last Name <span className="text-red-500">*</span>
        </label>
        <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>

      {/* Company */}
      <div className="col-span-1 md:col-span-2">
        <label className="text-[1.200rem] block text-sm font-medium text-[#111] mb-1">
          Company <span className="text-red-500">*</span>
        </label>
        <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>

      {/* Confirm Email */}
      <div>
        <label className="text-[1.200rem] block text-sm font-medium text-[#111] mb-1">
          Confirm Email <span className="text-red-500">*</span>
        </label>
        <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
      </div>

      {/* Location */}
      <div>
        <label className="text-[1.200rem] block text-sm font-medium text-[#111] mb-1">
          Location <span className="text-red-500">*</span>
        </label>
        <select className="w-full border border-gray-300 rounded px-3 py-2">
          <option>Select</option>
                <option disabled>A</option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="American Samoa">American Samoa</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Anguilla">Anguilla</option>
    <option value="Antarctica">Antarctica</option>
    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Aruba">Aruba</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option disabled>B</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Barbados">Barbados</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bermuda">Bermuda</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia, Plurinational State of">Bolivia, Plurinational State of</option>
    <option value="Bonaire, Sint Eustatius and Saba">Bonaire, Sint Eustatius and Saba</option>
    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
    <option value="Botswana">Botswana</option>
    <option value="Bouvet Island">Bouvet Island</option>
    <option value="Brazil">Brazil</option>
    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
    <option value="Brunei Darussalam">Brunei Darussalam</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Burundi">Burundi</option>
    <option disabled>C</option>
    <option value="Cabo Verde">Cabo Verde</option>
    <option value="Cambodia">Cambodia</option>
    <option value="Cameroon">Cameroon</option>
    <option value="Canada">Canada</option>
    <option value="Cayman Islands">Cayman Islands</option>
    <option value="Central African Republic">Central African Republic</option>
    <option value="Chad">Chad</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Christmas Island">Christmas Island</option>
    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
    <option value="Colombia">Colombia</option>
    <option value="Comoros">Comoros</option>
    <option value="Congo">Congo</option>
    <option value="Congo, The Democratic Republic of the">Congo, The Democratic Republic of the</option>
    <option value="Cook Islands">Cook Islands</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Croatia">Croatia</option>
    <option value="Cuba">Cuba</option>
    <option value="Curaçao">Curaçao</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czechia">Czechia</option>
    <option value="Côte d'Ivoire">Côte d'Ivoire</option>
    <option disabled>D</option>
    <option value="Denmark">Denmark</option>
    <option value="Djibouti">Djibouti</option>
    <option value="Dominica">Dominica</option>
    <option value="Dominican Republic">Dominican Republic</option>
    <option disabled>E</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="El Salvador">El Salvador</option>
    <option value="Equatorial Guinea">Equatorial Guinea</option>
    <option value="Eritrea">Eritrea</option>
    <option value="Estonia">Estonia</option>
    <option value="Eswatini">Eswatini</option>
    <option value="Ethiopia">Ethiopia</option>
    <option disabled>F</option>
    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
    <option value="Faroe Islands">Faroe Islands</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="French Guiana">French Guiana</option>
    <option value="French Polynesia">French Polynesia</option>
    <option value="French Southern Territories">French Southern Territories</option>
    <option disabled>G</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Gibraltar">Gibraltar</option>
    <option value="Greece">Greece</option>
    <option value="Greenland">Greenland</option>
    <option value="Grenada">Grenada</option>
    <option value="Guadeloupe">Guadeloupe</option>
    <option value="Guam">Guam</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Guernsey">Guernsey</option>
    <option value="Guinea">Guinea</option>
    <option value="Guinea-Bissau">Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option disabled>H</option>
    <option value="Haiti">Haiti</option>
    <option value="Heard Island and McDonald Islands">Heard Island and McDonald Islands</option>
    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
    <option value="Honduras">Honduras</option>
    <option value="Hong Kong">Hong Kong</option>
    <option value="Hungary">Hungary</option>
    <option disabled>I</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Isle of Man">Isle of Man</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option disabled>J</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jersey">Jersey</option>
    <option value="Jordan">Jordan</option>
    <option disabled>K</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
    <option value="Korea, Republic of">Korea, Republic of</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Kyrgyzstan">Kyrgyzstan</option>
    <option disabled>L</option>
    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
    <option value="Latvia">Latvia</option>
    <option value="Lebanon">Lebanon</option>
    <option value="Lesotho">Lesotho</option>
    <option value="Liberia">Liberia</option>
    <option value="Libya">Libya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option disabled>M</option>
    <option value="Macao">Macao</option>
    <option value="Madagascar">Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marshall Islands">Marshall Islands</option>
    <option value="Martinique">Martinique</option>
    <option value="Mauritania">Mauritania</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mayotte">Mayotte</option>
    <option value="Mexico">Mexico</option>
    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
    <option value="Moldova, Republic of">Moldova, Republic of</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="Montenegro">Montenegro</option>
    <option value="Montserrat">Montserrat</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Myanmar">Myanmar</option>
    <option disabled>N</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="New Caledonia">New Caledonia</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Niger">Niger</option>
    <option value="Nigeria">Nigeria</option>
    <option value="Niue">Niue</option>
    <option value="Norfolk Island">Norfolk Island</option>
    <option value="North Macedonia">North Macedonia</option>
    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
    <option value="Norway">Norway</option>
    <option disabled>O</option>
    <option value="Oman">Oman</option>
    <option disabled>P</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Palestine, State of">Palestine, State of</option>
    <option value="Panama">Panama</option>
    <option value="Papua New Guinea">Papua New Guinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Pitcairn">Pitcairn</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Puerto Rico">Puerto Rico</option>
    <option disabled>Q</option>
    <option value="Qatar">Qatar</option>
    <option disabled>R</option>
    <option value="Romania">Romania</option>
    <option value="Russian Federation">Russian Federation</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Réunion">Réunion</option>
    <option disabled>S</option>
    <option value="Saint Barthélemy">Saint Barthélemy</option>
    <option value="Saint Helena, Ascension and Tristan da Cunha">Saint Helena, Ascension and Tristan da Cunha</option>
    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
    <option value="Saint Lucia">Saint Lucia</option>
    <option value="Saint Martin (French part)">Saint Martin (French part)</option>
    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="Serbia">Serbia</option>
    <option value="Seychelles">Seychelles</option>
    <option value="Sierra Leone">Sierra Leone</option>
    <option value="Singapore">Singapore</option>
    <option value="Sint Maarten (Dutch part)">Sint Maarten (Dutch part)</option>
    <option value="Slovakia">Slovakia</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Solomon Islands">Solomon Islands</option>
    <option value="Somalia">Somalia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Georgia and the South Sandwich Islands">South Georgia and the South Sandwich Islands</option>
    <option value="South Sudan">South Sudan</option>
    <option value="Spain">Spain</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="Sudan">Sudan</option>
    <option value="Suriname">Suriname</option>
    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
    <option disabled>T</option>
    <option value="Taiwan, Province of China">Taiwan, Province of China</option>
    <option value="Tajikistan">Tajikistan</option>
    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
    <option value="Thailand">Thailand</option>
    <option value="Timor-Leste">Timor-Leste</option>
    <option value="Togo">Togo</option>
    <option value="Tokelau">Tokelau</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Turkey">Turkey</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
    <option value="Tuvalu">Tuvalu</option>
    <option disabled>U</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States">United States</option>
    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Uzbekistan">Uzbekistan</option>
    <option disabled>V</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="Venezuela, Bolivarian Republic of">Venezuela, Bolivarian Republic of</option>
    <option value="Viet Nam">Viet Nam</option>
    <option value="Virgin Islands, British">Virgin Islands, British</option>
    <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
    <option disabled>W</option>
    <option value="Wallis and Futuna">Wallis and Futuna</option>
    <option value="Western Sahara">Western Sahara</option>
    <option disabled>Y</option>
    <option value="Yemen">Yemen</option>
    <option disabled>Z</option>
    <option value="Zambia">Zambia</option>
    <option value="Zimbabwe">Zimbabwe</option>
        </select>
      </div>

      {/* Profile */}
      <div>
        <label className="text-[1.200rem] block text-sm font-medium text-[#111] mb-1">
          Profile <span className="text-red-500">*</span>
        </label>
        <select className="w-full border border-gray-300 rounded px-3 py-2">
          <option>Select</option>
            <option>Analyst/Institutional investor</option>
          <option>Individual shareholder</option>
          <option>Media</option>
          <option>Candidate</option>
          <option>Student</option>
          <option>Other</option>
        </select>
      </div>

      {/* Subject of Enquiry */}
      <div className="col-span-1 md:col-span-2">
        <label className="text-[1.200rem] block text-sm font-medium text-[#111] mb-1">
          Subject of enquiry <span className="text-red-500">*</span>
        </label>
        <select className="w-full border border-gray-300 rounded px-3 py-2">
          <option>Select</option>
            <option>EGM/AGM</option>
              <option>Annual Report</option>
                <option>Dividend information</option>
                  <option>Shareholder information</option>
                    <option>Sustainability</option>
                      <option>Human Resources</option>
                        <option>Media enquiry</option>
                          <option>Advertising (paid media)</option>
                            <option>Sponsorship</option>
                              <option>Other</option>
        </select>
      </div>

  {/* Message */}
<div className="col-span-1 md:col-span-2">
  <label className="text-[1.200rem] block text-sm font-medium text-[#111] mb-1">
    Message <span className="text-red-500">*</span>
  </label>
  <textarea
    rows="5"
    className="w-full border border-gray-300 rounded px-3 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-yellow-600"
    placeholder=""
  ></textarea>
</div>


      {/* Consent */}
      <div className="col-span-1 md:col-span-2">
         <label className="text-[1.200rem] block text-sm font-medium text-[#111] mb-1">
          Consent for storing submitted data <span className="text-red-500">*</span>
        </label>
        <label className="inline-flex items-start gap-2 text-sm text-gray-700">
          <input type="checkbox" className="mt-1" />
          <span>I accept I&A International’s Terms of Use and Privacy Policy</span>
        </label>
      </div>

    {/* reCAPTCHA */}
<div className="col-span-1 md:col-span-2">
  <span className="text-red-500">*</span>
  <div
    className="bg-[#f5f5f5] border border-gray-300 rounded-md p-4 flex items-center justify-between"
    style={{ maxWidth: '15rem' }}
  >
    <label className="flex items-center gap-3">
      <input type="checkbox" className="w-4 h-4" />
      <span className="text-sm text-[#222]">I'm not a robot</span>
    </label>
    <img src="/svg/RecaptchaLogo.svg" alt="reCAPTCHA" className="h-10 w-10" />
  </div>
</div>


  <label className="block text-m text-[#555] font-medium mb-1">
       <span className="text-red-500">*</span> Mandatory fields
        </label>
      {/* Submit */}
      <div className="col-span-1 md:col-span-2">
        <button type="submit" className="border border-[#000] px-6 py-2 hover:bg-[#000] hover:text-white">
          Submit
        </button>
        <p className="font-serif text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.9] text-[#555] font-normal tracking-normal sm:text-left mt-10">
          Your personal details are intended for use solely by I&A International. We will not send you any information other than what you have requested. Before submitting, please review our{' '}
          <a href="#" className="underline">Terms of Use</a> and <a href="#" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </form>
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