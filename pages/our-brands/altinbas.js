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
        <title>Altinbas | Our Brands</title>
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
              <span className="text-[#333] font-thin uppercase">Our Brands</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-[#000] font-semibold uppercase">Altınbaş</span>
            </div>
          </div>
        </div>
      </section>

<section className="relative w-full h-screen overflow-hidden font-serif">
  {/* === Background Image === */}
  <div className="absolute inset-0 z-0">
    <img
      src="/img/altinbas-banner.jpg"
      alt="Cartier Jewelry Over Skyline"
      className="w-full h-full object-cover"
    />
  </div>

  {/* === Overlay === */}
  <div className="absolute inset-0 bg-black/10 z-10"></div>

  {/* === Centered Content === */}
  <div className="relative z-20 flex flex-col items-center justify-center text-white text-center h-full px-4">
    <h1 className="text-5xl sm:text-6xl md:text-7xl font-[Playfair_Display] italic tracking-wide">
      Altınbaş
    </h1>

            <a
              href="https://www.altinbas.us/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans font-normal not-italic group mt-6 inline-flex items-center gap-1 px-6 py-2 bg-[#ffffff75] text-[#000000] text-l hover:bg-[#00000075] hover:text-[#ffffff] transition backdrop-blur-sm"
            >
              Visit Altınbaş website
              <span className="transition group-hover:invert group-hover:brightness-0 group-hover:contrast-200">
                <Image
                  src="/svg/external-link.svg"
                  alt="External link icon"
                  width={16}
                  height={16}
                />
              </span>
            </a>

  </div>

  {/* === Scroll Down Button === */}
<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30 mb-4">
  <a
    href="#About Altınbaş"
    className="w-20 h-8 flex items-center justify-center bg-[#ffffff75] text-[#000000b5] hover:bg-[#00000075] hover:text-[#ffffffb5] transition backdrop-blur-sm"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </a>
</div>

</section>

<section  id="About Altınbaş" className="bg-[#fff] py-16 px-4 sm:px-6 md:px-10 lg:px-12 font-serif">
  <div className="max-w-container-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-10 lg:gap-x-16 items-start">

    {/* === Left: Text Content === */}
    <div className="text-left order-2 lg:order-1">
      <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-light text-[#555] leading-snug tracking-tight">
        Where Heritage Meets Modern Elegance
      </h2>

      <p className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.7] sm:leading-[1.8] text-[#444] font-normal tracking-normal mt-4">
     Since its founding, Altınbaş has been renowned for timeless elegance and exceptional quality in fine jewelry.
      </p>
            <p className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.7] sm:leading-[1.8] text-[#444] font-normal tracking-normal mt-4">
              With deep roots in Turkish goldsmith artistry, the brand combines innovative design with masterful craftsmanship to create pieces that celebrate life’s most cherished moments.
            </p>

       <p className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.7] sm:leading-[1.8] text-[#444] font-normal tracking-normal mt-4">
            Each Altınbaş store embodies this spirit, offering distinctive collections that honour tradition while embracing the beauty of contemporary style.
            </p>
    </div>

    {/* === Right: Image === */}
    <div className="w-full order-1 lg:order-2">
      <div className="aspect-[3/2] w-full overflow-hidden shadow-sm">
        <Image
          src="/img/altinbas-intro.jpg"
          alt="Jewelry in store"
          width={720}
          height={480}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    
  </div>
</section>

 <section className="bg-[#ececec] py-16 px-4 sm:px-6 md:px-8 lg:px-10">
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center font-serif">

    {/* === Founded === */}
    <div className="px-2 sm:px-4">
      <div className="flex justify-center mb-4 sm:mb-6">
    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#4a4a4a]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/>
  <line x1="16" y1="2" x2="16" y2="6" strokeLinecap="round" strokeLinejoin="round"/>
  <line x1="8" y1="2" x2="8" y2="6" strokeLinecap="round" strokeLinejoin="round"/>
  <line x1="3" y1="10" x2="21" y2="10" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
      </div>
      <h3 className="text-xl sm:text-2xl font-[520] text-[#2e2e2e] mb-3 sm:mb-4 tracking-wide">
        Founded
      </h3>
      <p className="text-[0.95rem] sm:text-[1.0625rem] text-[#3a3a3a] leading-[1.7] sm:leading-[1.9] font-[450] tracking-wide">
        1975 in Istanbul, Turkey
      </p>
    </div>

    {/* === Chairman === */}
    <div className="px-2 sm:px-6 border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-gray-300">
      <div className="flex justify-center mb-4 sm:mb-6">
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#4a4a4a]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
  <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      </div>
      <h3 className="text-xl sm:text-2xl font-[520] text-[#2e2e2e] mb-3 sm:mb-4 tracking-wide">
        Partnership with I&A
      </h3>
      <p className="text-[0.95rem] sm:text-[1.0625rem] text-[#3a3a3a] leading-[1.7] sm:leading-[1.9] font-[450] tracking-wide">
      Since 2007
      </p>
    </div>

    {/* === Store Network === */}
    <div className="px-2 sm:px-4">
      <div className="flex justify-center mb-4 sm:mb-6">
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#4a4a4a]" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/>
  <line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
  <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      </div>
      <h3 className="text-xl sm:text-2xl font-[520] text-[#2e2e2e] mb-3 sm:mb-4 tracking-wide">
       Operated by I&A
      </h3>
      <p className="text-[0.95rem] sm:text-[1.0625rem] text-[#3a3a3a] leading-[1.7] sm:leading-[1.9] font-[450] tracking-wide">
       Over <strong>4 countries</strong>
      </p>
    </div>

  </div>
</section>
      {/* === Altinbas Brand Section === */}
<section className="min-h-screen max-w-6xl mx-auto px-4 py-16 relative font-serif">
  <div className="text-center mb-10 order-2 lg:order-1">
    <h2 className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-light text-[#555] leading-snug tracking-tight">About Altınbaş</h2>
    <p className="text-[1rem] sm:text-[1.125rem] md:text-[1.25rem] leading-[1.7] sm:leading-[1.8] text-[#444] font-normal tracking-normal mt-4">
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

  {/* Responsive Grid Info Section */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-gray-200 pt-6">
    {/* Store Address */}
    <div className="flex items-start gap-3">
      <MapPin className="w-5 h-5 text-[#555] mt-1 shrink-0" />
      <div>
        <h3 className="text-[2rem] sm:text-[2.5rem] md:text-[1.5rem] font-light text-[#555] leading-snug tracking-tight">Store Address</h3>
        <p className="text-[1rem] sm:text-[1.125rem] md:text-[1rem] leading-[1.7] sm:leading-[1.8] text-[#444] font-normal tracking-normal mt-4">
          Rr.Kavajës, Pallati Mio 2000<br />
          Tirana, Albania
        </p>
      </div>
    </div>

    {/* Opening Hours */}
    <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
      <Clock className="w-5 h-5 text-[#555] mt-1 shrink-0" />
      <div>
        <h3 className="text-[2rem] sm:text-[2.5rem] md:text-[1.5rem] font-light text-[#555] leading-snug tracking-tight">Opening Hours</h3>
        <p className="text-[1rem] sm:text-[1.125rem] md:text-[1rem] leading-[1.7] sm:leading-[1.8] text-[#444] font-normal tracking-normal mt-4">
          Monday - Friday: 9:00 AM - 7:00 PM<br />
          Saturday: 10:00 AM - 5:00 PM<br />
          Sunday: Closed
        </p>
      </div>
    </div>

    {/* Contact Info */}
    <div className="flex items-start gap-3 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-6">
      <Phone className="w-5 h-5 text-[#555] mt-1 shrink-0" />
      <div>
        <h3 className="text-[2rem] sm:text-[2.5rem] md:text-[1.5rem] font-light text-[#555] leading-snug tracking-tight">Contact Information</h3>
        <p className="text-[1rem] sm:text-[1.125rem] md:text-[1rem] leading-[1.7] sm:leading-[1.8] text-[#444] font-normal tracking-normal mt-4">
          <Mail className="inline w-4 h-4 mr-1" />
          <a href="mailto:info@ia-international.com" className="text-[#555] hover:underline">
            info@ia-international.com
          </a>
        </p>
        <p className="text-[1rem] sm:text-[1.125rem] md:text-[1rem] leading-[1.7] sm:leading-[1.8] text-[#444] font-normal tracking-normal mt-4">Phone: +355 123 4567</p>
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
         className="filter brightness-0 invert mb-4"
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