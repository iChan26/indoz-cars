
"use client";
import { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { HiOutlineMenu, HiOutlineX, HiOutlineSearch  } from 'react-icons/hi'
import { Typewriter } from 'react-simple-typewriter';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Search, CalendarCheck, Car } from 'lucide-react';
import { FiKey } from 'react-icons/fi';  // Add this to your imports

export default function Home() {
    const carImages = [
    "/img/car1.png",
    "/img/car2.png",
    "/img/car3.png",
  ];

const [activeIndex, setActiveIndex] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  return (
    <>
      <Head>
        <title>IndOz Cars & Rentals – Drive Your Way!</title>
        <meta
          name="description"
          content="Buy, sell, or rent a car. Reliable used cars & flexible rentals. Partnered with Indaus Automotive."
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
 <header
      className={`fixed top-0 left-0 w-full z-50  bg-black/90 text-white transform transition-transform duration-300 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 py-2">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={100}
            height={30}
            priority
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Nav */}
         <nav className="font-techno hidden font-orbitron md:flex flex-wrap items-center space-x-4 lg:space-x-6 text-xs lg:text-sm uppercase tracking-wide">
  {[
  { label: "Home", href: "/" },
  { label: "Inventory", href: "#" },
  { label: "Rentals", href: "#" },
  { label: "Sell Your Car", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
].map(({ label, href }, i) => (
  <Link
    key={i}
    href={href}
    className={`relative transition 
      after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#d00000] 
      after:transition-all after:duration-300 
      ${label === "Home" ? "text-[#d00000] after:w-full" : "after:w-0 hover:after:w-full hover:text-[#d00000]"}`}
  >
    {label}
  </Link>
))}

<button
  className="text-white hover:text-[#d00000] transition"
  aria-label="Search"
>
  <HiOutlineSearch size={18} />
</button>


  {/* Get a Quote button stays the same */}
  <Link
    href="#"
    className="ml-2 bg-[#d00000] hover:bg-red-700 px-3 py-1 text-xs lg:text-sm uppercase tracking-wide transition whitespace-nowrap"
  >
    Get a Quote
  </Link>
</nav>



       {/* Burger Toggle */}
<div className="md:hidden ml-auto flex items-center space-x-4">
  {/* Search Icon */}
  <button
    className="text-white hover:text-[#d00000] transition"
    aria-label="Search"
    onClick={() => {
      // Handle search logic here
      setIsMenuOpen(false);
    }}
  >
    <HiOutlineSearch size={24} />
  </button>

  {/* Burger Toggle */}
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    className=""
    aria-label="Toggle Menu"
  >
    {isMenuOpen ? <HiOutlineX size={28} /> : <HiOutlineMenu size={28} />}
  </button>
</div>

</div>

{/* Mobile Nav */}
<div
  className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
    isMenuOpen ? 'max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
  }`}
>
  <nav className="bg-black text-white flex flex-col items-center space-y-4 py-4 transition-opacity duration-300">
    {[
      { label: "Home", href: "/" },
      { label: "Inventory", href: "#" },
      { label: "Rentals", href: "#" },
      { label: "Sell Your Car", href: "#" },
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
    ].map(({ label, href }, i) => (
      <Link
        key={i}
        href={href}
        className={`block hover:text-[#d00000] text-lg ${
          label === "Home" ? "text-[#d00000]" : ""
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        {label}
      </Link>
    ))}

    <Link
      href="#"
      className="inline-block bg-[#d00000] hover:bg-red-700 px-4 py-2 text-sm uppercase tracking-wide"
      onClick={() => setIsMenuOpen(false)}
    >
      Get a Quote
    </Link>
  </nav>
</div>

    </header>


{/* HERO */}
<section className="font-techno relative flex flex-col md:flex-row items-center justify-between min-h-screen text-white pt-40 px-4 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-black">

  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    <source src="/vid/hero.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  {/* Overlay for better contrast */}
  <div className="absolute inset-0 bg-black/85 z-0" />

  {/* Left Content */}
  <div className="w-full md:w-1/2 max-w-lg text-center md:text-left z-10 flex flex-col items-center md:items-start">

    <div className="w-full mb-6 md:hidden px-4">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full max-w-md mx-auto"
      >
        {carImages.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Luxury Car ${index + 1}`}
              width={800}
              height={500}
              className={`w-full object-contain ${
                activeIndex === index ? 'animate-shine' : ''
              }`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

<h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight font-techno">
  Drive <span className="text-[#d00000]">Your Way!</span>
</h1>
         <p className="text-base sm:text-lg md:text-xl mb-2 text-gray-200 leading-snug font-techno">
  <Typewriter
    words={["Looking to buy, sell, or rent a car? We've got you covered."]}
    loop={0}
    cursor
    cursorStyle="|"
    typeSpeed={50}
    deleteSpeed={30}
    delaySpeed={2000}
  />
</p>

  <p className="text-gray-400 mb-6 sm:mb-8 font-techno">
  IndOz Cars & Rentals is your trusted partner for buying, selling, or renting vehicles.
  Partnered with <strong>Indaus Automotive</strong>, we bring you premium automotive solutions.
</p>
    <Link
      href="/rentals"
      className="inline-block bg-[#d00000] hover:bg-red-700 px-6 py-3 rounded-full transition text-sm uppercase tracking-wider"
    >
      Book Now
    </Link>
  </div>

  <div className="hidden md:flex w-full md:w-1/2 flex-col items-center mt-12 md:mt-0 relative z-10">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full max-w-xs sm:max-w-sm md:max-w-md"
      >
        {carImages.map((src, index) => (
          <SwiperSlide key={index}>
            <Image
              src={src}
              alt={`Luxury Car ${index + 1}`}
              width={500}
              height={300}
              className={`w-full object-contain ${
                activeIndex === index ? 'animate-shine' : ''
              }`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
</section>


{/* ABOUT */}
<section className="font-techno py-16 sm:py-20 px-4 bg-black text-white">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
    {/* Image Left */}
    <div className="w-full md:w-1/2">
      <img
        src="/img/section1.jpg"
        alt="About IndOz Cars & Rentals"
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>

    {/* Text Right */}
    <div className="w-full md:w-1/2 text-center md:text-left">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Who We Are
      </h2>
      <p className="max-w-xl text-gray-300 text-base sm:text-lg">
        IndOz Cars & Rentals is your trusted partner for buying, selling, or renting vehicles.
        Partnered with <strong>Indaus Automotive</strong>, we bring you premium automotive solutions.
      </p>
    </div>
  </div>
</section>


{/* FEATURED CARS */}
<section className=" font-techno py-16 sm:py-20 px-4 bg-[#090909]">
  <h2 className="text-2xl sm:text-3xl md:text-4xl text-center text-white font-bold mb-10">
    Featured Cars
  </h2>
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {[
      {
        img: 'featured1.jpg',
        title: 'BMW X6',
        desc: 'From IndOz Cars & Rentals – Brisbane 4078 Unleash the thrill of driving a 300hp turbocharged BMW X6, packed with luxury, comfort, and performance. Whether it’s a weekend getaway, special occasion, or just spoiling yourself – this ride delivers.'
      },
      {
        img: 'featured2.jpg',
        title: 'Mitsubishi Outlander 2015',
        desc: 'From IndOz Cars & Rentals – Brisbane 4078 Need a clean, reliable, and spacious SUV for a trip, family outing, or weekend getaway? Our Mitsubishi Outlander 2015 (7-Seater) is available now for short-term or long-term rent!'
      },
      {
        img: 'featured3.jpg',
        title: 'Suzuki Swift Top Model 2010',
        desc: 'IndOz Cars & Rentals – Brisbane 4078. This top model hatch has 170,000 km and runs perfectly, featuring a touchscreen display with registration and RWC included. It’s super reliable, fuel efficient, and perfect for daily driving or weekend trips!'
      },
    ].map(({ img, title, desc }, index) => (
      <div key={index} className="bg-[#000] border border-[#333] rounded-lg p-4 hover:shadow-lg transition">
        <div className="relative w-full aspect-[16/9] overflow-hidden rounded">
          <Image
            src={`/img/${img}`}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold mt-4 text-[#fff]">
          {title}
        </h3>
        <p className="text-[#d3d3d3] font-semibold">
          {desc}
        </p>
        <Link
          href="#"
          className="inline-flex items-center gap-2 mt-6 bg-[#d00000] text-white px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide hover:bg-[#b00000] transition duration-300 group"
        >
          Available for Rent Now
          <FiKey className="w-4 h-4 transform transition-transform duration-300 group-hover:rotate-12" />
        </Link>

      </div>
    ))}
  </div>
</section>




 {/* HOW IT WORKS */}
<section className="font-techno py-16 sm:py-20 px-4 bg-[#000] text-center">
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-10">
    How It Works
  </h2>
  <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
    {[
      { icon: <Search size={28} className="text-[#d00000] mt-3 flex-shrink-0" />, title: 'Browse', desc: 'Explore our inventory or rental options online.' },
      { icon: <CalendarCheck size={28} className="text-[#d00000] mt-3 flex-shrink-0" />, title: 'Book', desc: 'Reserve your car with flexible terms.' },
      { icon: <Car size={28} className="text-[#d00000] mt-3 flex-shrink-0" />, title: 'Drive', desc: 'Enjoy your new ride or rental with peace of mind.' }
    ].map(({ icon, title, desc }, i) => (
      <div
        key={i}
        className={`flex items-start gap-4 relative pb-4 ${
          i < 2 ? 'md:border-r md:border-gray-600' : ''
        }`}
      >
        <div>{icon}</div>
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
          <p className="text-gray-300">{desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>



      {/* FOOTER */}
      <footer className="font-techno bg-[#090909] text-white py-12 px-4 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <Image
              src="/img/logo.png"
              alt="IndOz Logo"
              width={120}
              height={40}
              className="mb-4"
            />
            <p>© {new Date().getFullYear()} IndOz Cars & Rentals. All Rights Reserved.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p>info@indozcars.com</p>
            <p className="mt-2">123 Main Street, Melbourne, Australia</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/inventory">Inventory</Link></li>
              <li><Link href="/rentals">Rentals</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="hover:text-red-600"><FaFacebookF size={20} /></a>
              <a href="#" className="hover:text-red-600"><FaInstagram size={20} /></a>
              <a href="#" className="hover:text-red-600"><FaLinkedinIn size={20} /></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
