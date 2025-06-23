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
  "/img/michaelkors-store1.avif",
  "/img/michaelkors-store2.jpeg",
  "/img/michaelkors-store3.jpeg",
];
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

  return (
    <>
    <>
      <Head>
        <title>MICHAEL KORS Brand – I&A International</title>
        <meta name="description" content="Get in touch with I&A International – Our story, vision, and contact information." />
      </Head>

      {/* === Parallax Video Banner Section === */}
<div className="w-full h-64 relative overflow-hidden">
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-200 ease-out will-change-transform"
    style={{
      transform: `translateY(${offsetY * 0.3}px)`
    }}
    src="/img/allbrandsbanner.mp4"
  />
  <div className="absolute inset-0 bg-black/30" />
  <div className="relative z-10 flex items-center justify-center h-full text-white px-4 max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold uppercase mt-[100px]">MICHAEL KORS Brand</h2>
  </div>
</div>

      {/* === Sticky Header === */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md shadow-md text-sm font-termina">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/">
            <Image src="/img/logo.png" alt="Logo" width={90} height={36} />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about-us" className="relative group text-black">
              About Us
              <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-black group-hover:w-full transition-all duration-300" />
            </Link>

            {/* === Our Brands Dropdown === */}
            <div ref={containerRef} className="relative">
              <Link
                href="/our-brands"
                onClick={handleClick}
                className="group flex items-center gap-1 text-black relative"
              >
                Our Brands
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-black group-hover:w-full transition-all duration-300" />
                <svg className={`w-4 h-4 ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </Link>

              {isOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white text-black rounded shadow-md z-50 divide-y divide-gray-200">
                  {brands.map((b) => (
                    <Link key={b.name} href={b.href} className="block px-4 py-2 hover:bg-gray-100 transition">
                      {b.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

         <Link href="/contact-us" className="relative group flex items-center gap-1 hover:text-black">
  GET IN TOUCH
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path d="M21 10l-6 6-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
  <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-black group-hover:w-full transition-all duration-300" />
</Link>

          </nav>

          {/* === Mobile Nav Toggle === */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>

        {/* === Mobile Nav Dropdown === */}
        <AnimatePresence initial={false}>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-nav"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: navHeight, opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                height: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.2, ease: 'easeOut' },
              }}
              className="md:hidden px-4 pt-2 overflow-hidden"
            >
              <div ref={navRef}>
                <div className="w-full h-[1.5px] bg-black mb-4" />
                <nav className="flex flex-col items-center gap-4 pb-4">
                  <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="text-sm text-black hover:underline underline-offset-4">
                    About Us
                  </Link>

                  {/* Mobile Our Brands dropdown */}
                  <div ref={containerRef} className="relative w-full text-center">
                    <div className="flex items-center justify-center py-2 text-sm text-gray-700">
                      <Link href="/our-brands" className="mr-1">Our Brands</Link>
                      <button onClick={handleClick} className="p-1">
                        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                        </svg>
                      </button>
                    </div>

                    {isOpen && (
                      <div className="divide-y divide-gray-200">
                        {brands.map((b) => (
                          <Link key={b.name} href={b.href} onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-100">
                            {b.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-1 text-sm">
                    GET IN TOUCH
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M21 10l-6 6-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


{/* === MICHAEL KORS Brand Section === */}
<section className="max-w-6xl mx-auto px-4 py-16">
  <div className="text-center mb-10">
    <h2 className="text-3xl md:text-4xl font-semibold mb-4">About MICHAEL KORS</h2>
    <p className="text-gray-600 max-w-2xl mx-auto">
      MICHAEL KORS is a world-renowned brand synonymous with jet-set glamour and luxurious lifestyle. Blending timeless
      sophistication with a modern sensibility, MICHAEL KORS delivers refined fashion and accessories that celebrate
      individuality, confidence, and effortless style.
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
              alt={`MICHAEL KORS Store ${index + 1}`}
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

  {/* === Footer === */}
<footer className="bg-black text-white py-12 px-4 sm:px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-left">
    {/* Logo Section (centered on mobile) */}
    <div className="text-center sm:text-left">
      <Link href="/">
        <Image
          src="/img/logo.png"
          alt="I&A International Logo"
          width={120}
          height={40}
          priority
          className="filter brightness-0 invert mx-auto sm:mx-0 mb-4"
        />
      </Link>
      <p className="text-sm text-gray-400">
        © {new Date().getFullYear()} I&A International.<br />
        All Rights Reserved.
      </p>
    </div>

    {/* Contact */}
    <div>
      <h4 className="font-semibold text-white mb-3 text-lg">Contact Us</h4>
      <p className="text-sm text-gray-400">info@ia-international.com</p>
    </div>

    {/* Address & Socials */}
    <div>
      <h4 className="font-semibold text-white mb-3 text-lg">Our Address</h4>
      <p className="text-sm text-gray-400 mb-4">
        Rr.Kavajës, Pallati Mio 2000<br />
        Tirana, Albania
      </p>
      <div className="flex justify-center sm:justify-start gap-4">
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-gray-400 hover:text-white"
        >
          <LinkedinIcon className="w-5 h-5" />
        </a>
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-gray-400 hover:text-white"
        >
          <FacebookIcon className="w-5 h-5" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-gray-400 hover:text-white"
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
