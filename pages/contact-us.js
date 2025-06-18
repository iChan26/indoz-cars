import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LinkedinIcon, FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, CheckCircle, SendIcon  } from 'lucide-react';

export default function About() {
    const [showHeader, setShowHeader] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [offsetY, setOffsetY] = useState(0);
const router = useRouter();
const isContactPage = router.pathname === '/contact-us';

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
                <title>Contact Us – I&A International</title>
                <meta name="description" content="Learn more about I&A International – Our story, vision, and values." />
            </Head>

            {/* === Banner Section === */}
            <div className="w-full h-64 relative overflow-hidden banner-section">
                <div
                    className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-transform duration-300 ease-out"
                    style={{
                        backgroundImage: 'url("/img/contactusbanner.png")',
                        transform: `translateY(${offsetY * 0.3}px)`,
                    }}
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center justify-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold uppercase">Contact US</h2>
                </div>
            </div>

            {/* === Sticky Header === */}
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
  {["about", "brands", "contact"].map((section) => {
    const label =
      section === "contact"
        ? "GET IN TOUCH"
        : section === "brands"
        ? "Our Brands"
        : "About Us";

    const href =
      section === "about"
        ? "/about-us"
        : section === "brands"
        ? "/our-brands"
        : "/contact-us";

    // === About Us & Our Brands ===
    if (section === "about" || section === "brands") {
      return (
        <Link
          key={section}
          href={href}
          className="relative group transition hover:text-gray-600 flex items-center gap-1"
        >
          {label}
          <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
        </Link>
      );
    }

    // === GET IN TOUCH (active link style) ===
    return (
      <Link
        key={section}
        href={href}
        className="relative text-black flex items-center gap-1"
      >
        {label}
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
        <span className="absolute -bottom-1 left-0 h-[1.5px] w-full bg-black transition-all duration-300" />
      </Link>
    );
  })}

  {/* Search Icon */}
  <button className="hover:text-gray-300 transition">
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </button>
</nav>


      {/* Mobile Toggle Button */}
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle Menu"
      >
        <svg
          className="w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
    </div>

    {/* Mobile Menu (Unchanged) */}
    {mobileMenuOpen && (
      <div className="md:hidden px-4 pb-4 pt-2">
        <nav className="flex flex-col items-start gap-4">
         <Link
  href="/about-us"
  onClick={() => setMobileMenuOpen(false)}
  className="text-sm text-black hover:underline underline-offset-2"
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
  className={`text-sm flex items-center gap-1 transition ${
    isContactPage ? 'text-black underline underline-offset-4' : 'text-gray-700 hover:text-black'
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


<section id="contact" className="py-20 px-4 sm:px-6 bg-gray-100">
  <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
    
    {/* Left Side - Branding + Contacts */}
    <div className="md:w-1/2 bg-gradient-to-b from-[#000000] to-[#4b4b4b] text-white p-10 flex flex-col justify-center">
                        <img
                            src="/img/logo.png"
                            alt="Logo"
                            className="w-28 mb-6 mx-auto filter brightness-0 invert"
                        />

      <h3 className="text-3xl font-bold mb-6 text-center">get in touch</h3>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 text-sm text-white">
        {/* Head Office */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Head Office</h4>
          <div className="flex items-center gap-2 mb-1">
            <PhoneIcon className="w-4 h-4" />
            <span>+355 69 206 0515</span>
          </div>
          <div className="flex items-center gap-2">
            <MailIcon className="w-4 h-4" />
            <span>info@ia-international.com</span>
          </div>
        </div>

        {/* Marketing */}
        <div>
          <h4 className="font-semibold text-lg mb-2">Marketing</h4>
          <div className="flex items-center gap-2">
            <MailIcon className="w-4 h-4" />
            <span>marketing@ia-international.com</span>
          </div>
        </div>
      </div>
    </div>

    {/* Right Side - Form */}
    <div className="md:w-1/2 bg-gradient-to-b from-white to-gray-100 p-10">
      <h4 className="text-2xl font-semibold text-black-700 mb-6">let’s talk</h4>
      <form className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
        <input
          type="email"
          placeholder="Your Mail"
          className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />
        <textarea
          placeholder="Type your message here..."
          rows="4"
          className="w-full border border-gray-300 rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-600"
        />

        {/* Simulated CAPTCHA */}
        <div className="flex items-center justify-between mt-6">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4 border-gray-400 rounded" />
            <span className="text-sm text-gray-600">I'm not a robot</span>
          </label>

        <button
  type="submit"
  className="bg-gradient-to-r from-[#000000] to-[#4b4b4b] text-white px-6 py-2 rounded-full hover:opacity-90 transition-all flex items-center gap-2"
>
  <SendIcon className="w-4 h-4" />
  Send
</button>

        </div>
      </form>
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
