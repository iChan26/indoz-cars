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
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'

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
const visible = true;




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
 
  const containerRef = useRef(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
const [isOpen, setIsOpen] = useState(false);
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
        <title>I&A International – Where Luxury Meets Elegance</title>
        <meta name="description" content="Discover I&A International’s luxury jewelry and fashion brands. Explore craftsmanship, recruitment, and world-class collections." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>


      <>
       


  <section className="relative h-screen w-full overflow-hidden font-termina bg-black">
      {/* === HEADER === */}
   <header
  className={`w-full bg-white text-black z-50 fixed top-0 left-0 right-0 transition-transform duration-300 ${
    visible ? 'translate-y-0' : '-translate-y-full'
  } shadow-[0_2px_8px_rgba(0,0,0,0.75)]`}
>


        {/* Top Logo */}
        <div className="flex justify-center items-center py-3">
          <Image
            src="/img/logo.png"
            alt="I&A International Logo"
            width={100}
            height={40}
            priority
            
          />
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex border-t border-black/20 py-3 px-6 items-center justify-between max-w-7xl mx-auto text-sm">
          {/* Left: Search + Button */}
          <div className="w-1/3 flex justify-start items-center gap-4">
            <button className="hover:text-black-300 hover:font-bold transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <Link href="/contact-us" className="border border-black px-4 py-1 rounded hover:bg-black hover:text-white transition">
              Get in Touch
            </Link>
          </div>

              {/* Center Nav */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6">
                <Link href="/" className="relative hover:text-black-300 hover:font-bold transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">Home</Link>
                <Link href="/about-us" className="relative hover:text-black-300 hover:font-bold transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">About Us</Link>
              <div className="relative group">
  {/* Link for Navigation */}
  <Link
    href="/our-brands"
    className="flex items-center gap-1 relative hover:text-black-300 hover:font-bold transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
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

  {/* Dropdown on Hover */}
  <div className="absolute top-full mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50 divide-y divide-gray-200 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
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
</div>

            <Link href="/press" className="relative hover:text-black-300 hover:font-bold transition after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">Press</Link>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between px-4 py-3 border-t border-black/20">
          {/* Hamburger */}
          <button onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search */}
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
    ${mobileNavOpen ? 'max-h-[500px] opacity-100 py-4 px-4 space-y-4' : 'max-h-0 opacity-0 py-0 px-4'}
  `}
>
  <Link href="/" className="block transition-opacity duration-300">Home</Link>
  <Link href="/about-us" className="block transition-opacity duration-300">About Us</Link>

  <details className="group">
    <summary className="cursor-pointer">Our Brands</summary>
    <div className="pl-4 pt-2 space-y-2">
      {brands.map((b) => (
        <Link key={b.name} href={b.href} className="block hover:text-gray-300 transition">
          {b.name}
        </Link>
      ))}
    </div>
  </details>

  <Link href="/contact-us" className="block transition-opacity duration-300">Contact</Link>
</div>

      </header>

  {/* === HERO VIDEO === */}
<div className="absolute inset-0 overflow-hidden z-0">
  <video
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
    style={{
      transform: `translateY(${scrollY * 0.2}px)`,
    }}
  >
    <source src="/vid/hero.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlays */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60 pointer-events-none" />
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      background:
        'radial-gradient(circle, transparent 50%, rgba(0, 0, 0, 0.5) 100%)',
    }}
  />
</div>



      {/* === HERO TEXT === */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
          <Typewriter
            words={['I&A International', 'Luxury Redefined', 'Where Fashion Meets Elegance']}
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



      <section className="bg-white py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Left: Event Image */}
          <div className="w-full">
            <Image
              src="/img/recent-event.webp" // Replace with your actual event image
              alt="I&A Luxury Showcase"
              width={800}
              height={600}
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right: Event Details */}
          <div>
            <p className="text-gray-500 text-sm uppercase mb-2">Recent Event</p>

            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
              I&A International Hosts Global Luxury Showcase 2025
            </h2>

            <p className="text-lg text-gray-700 mb-6">
              Where luxury meets elegance and quality. I&A International recently hosted an exclusive showcase celebrating its legacy since 1991. Featuring iconic pieces from world-renowned brands, the event reflects our rise as a leader in Albania’s jewelry industry.
            </p>

            <Link
              href="/events/recent-event"
              className="inline-block border border-gray-800 text-gray-800 font-semibold px-6 py-2 rounded hover:bg-black hover:text-white transition duration-300"
            >
              View Full Highlights
            </Link>
          </div>
        </div>
      </section>


<section id="about" className="bg-gray-100 py-20 px-4 sm:px-10 lg:px-20 font-termina w-full">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">

    {/* === Left: Text Content === */}
    <div className="text-left">
      <p className="text-sm text-gray-500 mb-2">About us</p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-800 mb-6 leading-tight">
        I&A International
      </h2>
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 max-w-prose">
        Where luxury meets elegance and quality. I&A International is a well-established Albanian jewelry retailer founded by Artan Cuci in 1991. Now a leader in the jewelry industry with internationally acclaimed luxury brands.
      </p>
      <a
        href="#"
        className="inline-block border border-black text-black hover:text-white hover:bg-black transition px-6 py-3 text-sm font-medium rounded"
      >
        View More
      </a>
    </div>

    {/* === Right: Swiper Image Slider === */}
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="rounded-md shadow-lg"
      >
        {[
          { src: '/img/mansitting.png', alt: 'Jewelry sketches and hands' },
          { src: '/img/handsring.jpg', alt: 'Jewelry sketches and hands 2' }
        ].map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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
        { name: "Bravo", img: "/img/roberto bravo.png", productImg: "/img/noahsark.png" },
      ].map((brand, idx) => (
        <div key={idx} className="group relative w-full aspect-square [perspective:1000px]">
          <div className="relative w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

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

<section className="bg-white py-12 px-6 md:px-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* === Image (Shown First on Mobile) === */}
    <div className="order-1 md:order-2">
      <Image
        src="/img/recent-event2.webp"
        alt="Anniversary Gala"
        width={800}
        height={600}
        className="w-full h-auto object-cover rounded-lg shadow-md"
      />
    </div>

    {/* === Text Section === */}
    <div className="order-2 md:order-1">
      <p className="text-gray-500 text-sm uppercase mb-2">Recent Event</p>
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
        Celebrating Over 30 Years of Timeless Craft
      </h2>
      <p className="text-lg text-gray-700 mb-6">
        To commemorate over three decades of craftsmanship, I&A International unveiled a curated collection of designer pieces. This milestone event reaffirmed our commitment to elegance, quality, and international excellence.
      </p>
      <Link
        href="#"
        className="inline-block border border-gray-800 text-gray-800 font-semibold px-6 py-2 rounded hover:bg-black hover:text-white transition duration-300"
      >
        View the Collection
      </Link>
    </div>

  </div>
</section>

<section className="bg-white py-16 px-6 md:px-12">
  <div className="max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
        Latest Press Releases & News
      </h2>
      <div>{/* Swiper pagination appears automatically */}</div>
    </div>

    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      breakpoints={{
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      className="news-swiper"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="group">
          <div className="overflow-hidden rounded-md shadow-md">
            <Image
              src="/img/news1.jpg"
              alt="I&A flagship opening"
              width={400}
              height={250}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">18 June 2025</p>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-black transition">
            I&A International unveils a flagship boutique in central Tirana
          </h3>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="group">
          <div className="overflow-hidden rounded-md shadow-md">
            <Image
              src="/img/news2.jpg"
              alt="Luxury partnership"
              width={400}
              height={250}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">12 June 2025</p>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-black transition">
            New luxury brand partnerships announced at I&A Gala
          </h3>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div className="group">
          <div className="overflow-hidden rounded-md shadow-md">
            <Image
              src="/img/news3.jpg"
              alt="Annual Report"
              width={400}
              height={250}
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">20 June 2025</p>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-black transition">
            I&A publishes FY25 Annual Report and Strategic Overview
          </h3>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
</section>


<section className="bg-gray-100 py-16 px-6 md:px-12">
  <div className="max-w-3xl mx-auto text-center">
    <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
      Sign up to our Press Releases & News
    </h2>

   <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
  <div className="relative w-full sm:w-2/3">
    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      {/* Email Icon SVG */}
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V6a2 2 0 00-2-2H3a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </span>
    <input
      type="email"
      placeholder="Enter your email address"
      className="w-full pl-10 pr-4 py-3 rounded-md shadow-sm border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none transition"
      required
    />
  </div>

  <button
    type="submit"
    className="w-full sm:w-auto px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition"
  >
    Subscribe
  </button>
</form>

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
