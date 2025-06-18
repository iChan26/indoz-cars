// pages/index.js

import Image from 'next/image';
import Head from 'next/head';
import { ArrowRight, MailIcon, UserIcon, MessageSquareIcon, LinkedinIcon, FacebookIcon, InstagramIcon } from 'lucide-react'; 
import { useEffect, useState, useRef } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import Slider from "react-slick";
import Link from 'next/link'; // make sure this is imported at the top

export default function Home() {
   const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
  };

  const [activeSection, setActiveSection] = useState(null);
  const cn = (...classes) => classes.filter(Boolean).join(" ");
  const [showHeader, setShowHeader] = useState(false);
  const aboutRef = useRef(null);

  useEffect(() => {
  const sectionIds = ["about", "brands", "contact"];

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const offset = 200; // Adjust sensitivity

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        const { offsetTop, offsetHeight } = el;
        if (scrollY >= offsetTop - offset && scrollY < offsetTop + offsetHeight - offset) {
          setActiveSection(id);
          break;
        }
      }
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Initial check

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById("about");
      if (!aboutSection) return;

      const rect = aboutSection.getBoundingClientRect();
      setShowHeader(rect.top <= 50); // adjust threshold as needed
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const images = ['/img/hero1-min.png', '/img/hero2-min.png'];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      "fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-md text-black font-termina text-sm",
      "transition-all duration-500 ease-out transform translate-y-0 opacity-100 animate-slideDown"
    )}
  >
    <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <Image src="/img/logo.png" alt="Logo" width={90} height={36} />

      {/* === Desktop Navigation === */}
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/about-us" className="relative group transition text-black flex items-center gap-1">
          About Us
          <span className="absolute -bottom-1 left-0 h-[1.5px] bg-black transition-all duration-300 w-0 group-hover:w-full" />
        </Link>

        <Link href="/our-brands" className="relative group transition text-black flex items-center gap-1">
          Our Brands
          <span className="absolute -bottom-1 left-0 h-[1.5px] bg-black transition-all duration-300 w-0 group-hover:w-full" />
        </Link>

   <Link
  href="/contact-us"
  className={`relative group text-sm transition flex items-center gap-1 ${
    activeSection === "contact"
      ? "text-black font-semibold"
      : "text-gray-700 hover:text-black"
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
    <path
      d="M21 10l-6 6-4-4-6 6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  <span
    className={`absolute -bottom-1 left-0 h-[1.5px] bg-black transition-all duration-300 ${
      activeSection === "contact" ? "w-full" : "w-0 group-hover:w-full"
    }`}
  />
</Link>


        {/* Optional: Search icon */}
        <button className="hover:text-gray-300 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </nav>

      {/* === Mobile Burger Button === */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>

    {/* === Mobile Navigation Menu === */}
    {mobileMenuOpen && (
      <div className="md:hidden px-4 pb-4 pt-2">
        <nav className="flex flex-col items-start gap-4">
          <Link
            href="/about-us"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm transition text-black"
          >
            About Us
          </Link>

          <Link
            href="/our-brands"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm text-gray-700 hover:text-black"
          >
            Our Brands
          </Link>

          <Link
            href="/contact-us"
            onClick={() => setMobileMenuOpen(false)}
            className={`text-sm transition flex items-center gap-1 ${
              activeSection === "contact"
                ? "text-black font-semibold"
                : "text-gray-700 hover:text-black"
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
              <path
                d="M21 10l-6 6-4-4-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </nav>
      </div>
    )}
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
        <Link key={section} href="/our-brands" passHref>
          <div className="relative group cursor-pointer text-white hover:text-gray-300 transition flex items-center gap-1">
            Our Brands
            <span className="absolute -bottom-1 left-0 h-[1.5px] bg-white w-0 group-hover:w-full transition-all duration-300" />
          </div>
        </Link>
      );
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
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
        index === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"
      }`}
      style={{ transform: `translateY(${scrollY * 0.2}px)` }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={img}
          alt={`Hero image ${index + 1}`}
          fill
          className={`object-cover transition-transform ease-in-out duration-[5000ms] ${
            index === currentSlide ? "scale-110" : "scale-100"
          }`}
          style={{ objectPosition: "center top" }}
          quality={90}
          priority={index === 0}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
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
      <Slider {...settings}>
        <div>
          <Image src="/img/mansitting.png" alt="Jewelry close-up" width={500} height={500} className="rounded-md w-full h-auto object-cover" />
        </div>
        <div>
          <Image src="/img/handsring.jpg" alt="Hand with rings" width={500} height={500} className="rounded-md w-full h-auto object-cover" />
        </div>
      </Slider>
    </div>
  </div>
</section>

{/* === Timeline Section === */}
<section className="py-24 px-6 bg-white font-termina" id="timeline">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
      Our Journey
    </h2>

    <div className="relative border-l-2 border-gray-200 ml-4 space-y-12">
      {/* === Timeline Item === */}
      <div className="relative pl-8">
        <div className="absolute top-1 left-[-0.45rem] w-4 h-4 bg-black rounded-full"></div>
        <h3 className="text-lg font-semibold text-gray-800">1991</h3>
        <p className="text-sm text-gray-600 mt-2">
          I&A International was established as a luxury jewelry retailer in Albania, setting the foundation for decades of elegance and excellence.
        </p>
      </div>

      {/* === Timeline Item === */}
      <div className="relative pl-8">
        <div className="absolute top-1 left-[-0.45rem] w-4 h-4 bg-black rounded-full"></div>
        <h3 className="text-lg font-semibold text-gray-800">2000s — Expansion Across Albania</h3>
        <p className="text-sm text-gray-600 mt-2">
          Grew presence with multiple retail stores and strengthened partnerships with world-renowned jewelry brands.
        </p>
      </div>

      {/* === Timeline Item === */}
      <div className="relative pl-8">
        <div className="absolute top-1 left-[-0.45rem] w-4 h-4 bg-black rounded-full"></div>
        <h3 className="text-lg font-semibold text-gray-800">2015 — Exclusive Brand Partnerships</h3>
        <p className="text-sm text-gray-600 mt-2">
          Secured exclusive selling rights for top-tier jewelry and luxury watch brands like Anna Maria Cammilli, Fope, and Eberhard & Co.
        </p>
      </div>

      {/* === Timeline Item === */}
      <div className="relative pl-8">
        <div className="absolute top-1 left-[-0.45rem] w-4 h-4 bg-black rounded-full"></div>
        <h3 className="text-lg font-semibold text-gray-800">2025 — New Digital Experience</h3>
        <p className="text-sm text-gray-600 mt-2">
          Launch of our new website and digital branding — bringing our luxury experience to customers worldwide.
        </p>
      </div>
    </div>
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
            <div className="absolute w-full h-full [backface-visibility:hidden] bg-white rounded overflow-hidden shadow-md flex items-center justify-center">
              <img src={brand.img} alt={brand.name} className="w-full h-full object-contain p-2" />
            </div>
            <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white rounded overflow-hidden shadow-md flex items-center justify-center">
              <img src={brand.productImg} alt={`${brand.name} Product`} className="w-full h-full object-contain p-2" />
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
      <a href="#" className="inline-block border px-6 py-2 border-black rounded-full hover:bg-black hover:text-white transition-colors duration-300">
        Contact Us
      </a>
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
