// pages/contact-us.js

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  MapPin, Clock, Phone, Mail
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

// Utility
const cn = (...classes) => classes.filter(Boolean).join(' ');

export default function Contact() {
  const router = useRouter();
  const isBrandsPage = router.pathname === '/our-brands';
  const navRef = useRef(null);
  const containerRef = useRef(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [tappedOnce, setTappedOnce] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

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
  ];

  const storeImages = [
  "/img/altinbas-store-1.jpg",
  "/img/altinbas-store-2.jpg",
  "/img/altinbas-store-3.jpg",
];

const isActive = router.pathname === '/our-brands';
const [mobileNavOpen, setMobileNavOpen] = useState(false);
useEffect(() => {
  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
  // Double-click handler for mobile
  const handleClick = (e) => {
    if (!isOpen) {
      e.preventDefault();
      setIsOpen(true);
      setTappedOnce(true);
      setTimeout(() => setTappedOnce(false), 1500);
    } else if (tappedOnce) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (mobileMenuOpen && navRef.current) {
      setNavHeight(navRef.current.scrollHeight);
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (mobileMenuOpen && navRef.current) {
        setNavHeight(navRef.current.scrollHeight);
      }
    });

    if (navRef.current) observer.observe(navRef.current);
    return () => observer.disconnect();
  }, [mobileMenuOpen]);

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (isOpen && containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    return () => document.removeEventListener('mousedown', closeOnOutsideClick);
  }, [isOpen]);


   const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % storeImages.length);
    }, 4000); // 4 seconds
    return () => clearInterval(interval);
  }, []);
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
    <>
      <Head>
        <title>Altinbas | Our Brands</title>
        <meta name="description" content="Get in touch with I&A International – Our story, vision, and contact information." />
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
  className={`flex items-center gap-1 relative transition
    after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:bg-black after:transition-all after:duration-300
    ${isActive ? 'font-semibold after:w-full' : 'hover:font-semibold after:w-0 hover:after:w-full'}`}
>
  Our Brands
  <svg
    className={`w-4 h-4 transition-transform duration-300 
      ${isActive ? 'rotate-180' : 'group-hover:rotate-180'}`}
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
              <span className="text-[#000] font-semibold">Our Brands</span>
            </div>
          </div>
        </div>
      </section>

       {/* === Altinbas Brand Section === */}
<section className="max-w-6xl mx-auto px-4 py-16">
  <div className="text-center mb-10">
    <h2 className="text-3xl md:text-4xl font-semibold mb-4">About Altınbaş</h2>
    <p className="text-gray-600 max-w-2xl mx-auto">
      Altınbaş is synonymous with elegance and quality, known for exquisite craftsmanship and contemporary design in luxury jewelry. With decades of heritage, Altınbaş continues to innovate while preserving its legacy of excellence.
    </p>
  </div>

  {/* Swiper Slider */}
  <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] mb-12 rounded-lg overflow-hidden shadow-lg">
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      className="w-full h-full"
    >
      {storeImages.map((src, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-full">
            <Image
              src={src}
              alt={`Altinbas Store ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>

  {/* Responsive Grid Info Section with Line Separation */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-gray-200 pt-6">
    {/* Store Address */}
    <div className="flex items-start gap-3">
      <MapPin className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
      <div>
        <h3 className="font-semibold text-lg">Store Address</h3>
        <p className="text-gray-600 text-sm">
          Rr.Kavajës, Pallati Mio 2000<br />
          Tirana, Albania
        </p>
      </div>
    </div>

    {/* Opening Hours */}
    <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
      <Clock className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
      <div>
        <h3 className="font-semibold text-lg">Opening Hours</h3>
        <p className="text-gray-600 text-sm">
          Monday - Friday: 9:00 AM - 7:00 PM<br />
          Saturday: 10:00 AM - 5:00 PM<br />
          Sunday: Closed
        </p>
      </div>
    </div>

    {/* Contact Info */}
    <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
      <Phone className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
      <div>
        <h3 className="font-semibold text-lg">Contact Information</h3>
        <p className="text-gray-600 text-sm mb-1">
          <Mail className="inline w-4 h-4 mr-1" />
          <a href="mailto:info@ia-international.com" className="text-blue-600 hover:underline">
            info@ia-international.com
          </a>
        </p>
        <p className="text-gray-600 text-sm">Phone: +355 123 4567</p>
      </div>
    </div>
  </div>
</section>


    </>

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

      {/* === Scroll to Top Button === */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-[99] p-3 rounded-full bg-black text-white shadow-xl hover:bg-gray-800 transition-all duration-300"
      >
        <svg
          className="w-5 h-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

    </>
  );
}