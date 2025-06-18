import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LinkedinIcon, FacebookIcon, InstagramIcon } from 'lucide-react';
import { useRouter } from 'next/router';

export default function About() {

    const router = useRouter();
const isBrandsPage = router.pathname === '/our-brands';
    const [showHeader, setShowHeader] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [offsetY, setOffsetY] = useState(0);

    const cn = (...classes) => classes.filter(Boolean).join(" ");

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);

            const banner = document.querySelector(".banner-section");
            if (banner) {
                const rect = banner.getBoundingClientRect();
                setShowHeader(rect.bottom <= 60); // header appears after banner scrolls out
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

          {showHeader && (
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

       <Link href="/our-brands" className="relative group transition text-black flex items-center gap-1">
  Our Brands
  <span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-black transition-all duration-300" />
</Link>

    <Link href="/contact-us" passHref legacyBehavior>
  <a className="relative group text-sm transition flex items-center gap-1 text-gray-700 hover:text-black">
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

    {/* Mobile Navigation */}
    {mobileMenuOpen && (
      <div className="md:hidden px-4 pb-4 pt-2">
        <nav className="flex flex-col items-start gap-4">
          <Link href="/about-us" passHref legacyBehavior>
            <a onClick={() => setMobileMenuOpen(false)} className="text-sm text-black hover:underline underline-offset-4">
              About Us
            </a>
          </Link>

          <Link href="/our-brands" passHref legacyBehavior>
  <a
    onClick={() => setMobileMenuOpen(false)}
    className={`text-sm transition ${
      isBrandsPage ? 'text-black underline underline-offset-4' : 'text-gray-700 hover:text-black'
    }`}
  >
    Our Brands
  </a>
</Link>

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
      <path d="M21 10l-6 6-4-4-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </a>
</Link>

        </nav>
      </div>
    )}
  </header>
)}

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8">
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
        <div
          key={idx}
          className="relative group overflow-hidden rounded-xl shadow-xl border border-gray-200 bg-white w-full aspect-[4/5] sm:aspect-[3/4]"
        >
          {/* Product image - reveal with envelope-style animation */}
          <img
            src={brand.productImg}
            alt={`${brand.name} Product`}
            className="absolute inset-0 w-full h-full object-cover scale-105 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-out"
          />

          {/* Envelope flap with logo */}
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10 origin-top transform transition-transform duration-700 group-hover:-rotate-x-90 group-hover:scale-y-0">
            <img
              src={brand.img}
              alt={`${brand.name} Logo`}
              className="max-h-full max-w-full p-6 object-contain opacity-70"
            />
          </div>

          {/* Bottom Text Overlay */}
          <div className="absolute bottom-0 w-full px-4 py-5 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out bg-gradient-to-t from-black/80 to-transparent group-hover:from-white group-hover:to-white z-20">
            <h4 className="text-sm font-semibold text-gold group-hover:text-black transition-colors duration-300 tracking-wide">
              {brand.name}
            </h4>
            <p className="text-xs italic text-gold group-hover:text-black transition-colors duration-300">
              {brand.tagline}
            </p>
          </div>
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
