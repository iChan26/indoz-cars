import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { PhoneIcon, TruckIcon, MapPinIcon, GiftIcon, ClipboardIcon, ChevronDownIcon, ChevronUpIcon, EnvelopeIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, useAnimation } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function Home() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ contact: '', vehicle: '', address: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false); // <-- Added modal state

  const faqs = [
    {
      question: "Approximately how much money could I get for my car?",
      answer: "When determining a fair price for your car, we consider many variables. These variables include the vehicle’s age, condition, and mileage."
    },
    {
      question: "Are you interested in buying non-functioning cars?",
      answer: "Yes. It makes no difference at all whether your car is running or not, registered or unregistered. Your vehicle’s condition is irrelevant to us; we’ll buy it nonetheless."
    },
    {
      question: "DO I HAVE TO BRING MY VEHICLE TO YOU?",
      answer: "No, we offer free towing and will arrange pickup at your convenience."
    },
    {
      question: "Within what time frame can I expect my automobile to be towed?",
      answer: "We conclude our transaction within 24 hours and tow the car within that time frame. We make staying effective our priority, and you can count on Atlas Auto to free up your space as soon as we buy your car. "
    },
    {
      question: "Do I have to pay a fee for vehicle removal?",
      answer: "No. Our car removal service is completely free of charge."
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [inView, controls]);

  useEffect(() => {
    const header = document.getElementById('main-header');
    function handleScroll() {
      if (window.scrollY > 10) {
        header.classList.add('backdrop-blur-sm', 'bg-white/70', 'shadow-md');
      } else {
        header.classList.remove('backdrop-blur-sm', 'bg-white/70', 'shadow-md');
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch('/api/data')
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((json) => setData(json))
      .catch(() => {
        setData([
          {
            id: 1,
            title: 'Cash for Cars Rotorua',
            description: 'We buy unwanted cars, utes, and trucks in Rotorua and pay top dollar!',
          },
          {
            id: 2,
            title: 'Free Car Removal',
            description: 'Get your vehicle picked up for free and paid instantly.',
          },
        ]);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.contact.trim()) newErrors.contact = 'Contact number is required';
    if (!form.vehicle.trim()) newErrors.vehicle = 'Vehicle details are required';
    if (!form.address.trim()) newErrors.address = 'Pickup address is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitted(true);
    setForm({ contact: '', vehicle: '', address: '' });

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <motion.main className="min-h-screen bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      {/* Header */}
      <header id="main-header" className="sticky top-0 bg-white/0 transition-all duration-300 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center z-50">
        <div className="flex items-center mb-4 sm:mb-0">
          <img
            src="/img/Cash-For-Car-2-1.webp"
            alt="Tow truck"
            className="w-[150px] sm:w-60 h-auto rounded-none shadow-none border-none bg-transparent"
          />
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <button className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition font-medium flex items-center justify-center space-x-2 w-full sm:w-auto text-lg sm:text-sm">
            <PhoneIcon className="h-5 w-5" />
            <span>0800 99 7000</span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition font-medium flex items-center justify-center space-x-2 w-full sm:w-auto text-lg sm:text-sm"
          >
            <span>Get an offer</span>
            <GiftIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto transition-all duration-300">
          <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg relative w-11/12 sm:max-w-lg md:max-w-4xl mx-auto my-10 transition-transform duration-300">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 bg-gray-100 border border-gray-300 rounded-full p-2 shadow-md hover:shadow-lg hover:bg-gray-200 transition-transform duration-200 hover:scale-110"
              aria-label="Close Modal"
            >
              <XMarkIcon className="h-5 w-5 text-gray-600" />
            </button>


            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">SELL YOUR VEHICLE TODAY</h2>
            <p className="text-gray-600 text-center mb-6 md:mb-8">
              We offer top cash for cars, trucks, SUVs, vans and offer free same-day removal as well.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="font-medium">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <ClipboardIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="border rounded-md w-full p-3 pl-10"
                      value={form.name || ''}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div>
                  <label className="font-medium">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      className="border rounded-md w-full p-3 pl-10"
                      value={form.email || ''}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div>
                  <label className="font-medium">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <PhoneIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3" />
                    <input
                      type="text"
                      name="contact"
                      placeholder="Your contact number"
                      className="border rounded-md w-full p-3 pl-10"
                      value={form.contact}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.contact && <p className="text-red-500 text-sm">{errors.contact}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-medium">
                    Vehicle Details <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <TruckIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3" />
                    <input
                      type="text"
                      name="vehicle"
                      placeholder="Vehicle rego OR make, model & year"
                      className="border rounded-md w-full p-3 pl-10"
                      value={form.vehicle}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.vehicle && <p className="text-red-500 text-sm">{errors.vehicle}</p>}
                </div>

                <div>
                  <label className="font-medium">
                    Pickup Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPinIcon className="h-5 w-5 text-gray-400 absolute top-3.5 left-3" />
                    <input
                      type="text"
                      name="address"
                      placeholder="Pickup address (start typing...)"
                      className="border rounded-md w-full p-3 pl-10"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="bg-green-700 hover:bg-green-800 text-white text-lg px-8 py-3 rounded-md font-semibold flex items-center transition-all duration-300"
                >
                  GET AN INSTANT OFFER <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



      {/* Main Section */}
      <section className="relative py-12 overflow-hidden">
        {/* Background GIF */}
        <div
          className="absolute inset-0 bg-center bg-cover opacity-10"
          style={{ backgroundImage: "url('/img/tension-force-car.gif')" }}
        ></div>

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-0 lg:grid-cols-2 gap-12 px-6 bg-green-0/80">
          {/* Left Section */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="bg-green-600 text-white px-2 py-1 rounded">
                CASH FOR CARS
              </span>{' '}
              ROTORUA
            </h1>

            <p className="text-gray-600 text-lg">
              Looking to get rid of your car in Rotorua? Get quick cash for your car with ease with our Rotorua cash for cars service. We offer free car removal and competitive prices for any make or model, whether it’s running or not. Contact us today to schedule a pickup and get top dollar for your junk car.
            </p>

            <div className="flex items-center gap-6 mt-6">
              <img
                src="/img/Group-2958.webp"
                alt="Tow truck"
                className="w-100 h-auto rounded-lg shadow-none border-none bg-transparent"
              />
            </div>
          </div>

          {/* Right Section - Form */}
          <motion.div
            className="bg-white p-8 shadow-2xl rounded-2xl border border-gray-100"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
              SELL YOUR CAR FOR CASH NOW!
            </h2>
            {submitted && (
              <motion.div
                className="text-green-600 text-center font-medium mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                Your request has been submitted!
              </motion.div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <PhoneIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  type="text"
                  placeholder="Your contact number"
                  className={`pl-10 w-full px-4 py-3 bg-gray-100 border ${errors.contact ? 'border-red-400' : 'border-transparent'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
              </div>
              <div className="relative">
                <TruckIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  name="vehicle"
                  value={form.vehicle}
                  onChange={handleChange}
                  type="text"
                  placeholder="Vehicle rego OR make, model & year"
                  className={`pl-10 w-full px-4 py-3 bg-gray-100 border ${errors.vehicle ? 'border-red-400' : 'border-transparent'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {errors.vehicle && <p className="text-red-500 text-sm mt-1">{errors.vehicle}</p>}
              </div>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  type="text"
                  placeholder="Pickup address (start typing...)"
                  className={`pl-10 w-full px-4 py-3 bg-gray-100 border ${errors.address ? 'border-red-400' : 'border-transparent'
                    } rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500`}
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
              </div>
              <motion.button
                type="submit"
                className="group w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition flex items-center justify-center gap-2"
                whileTap={{ scale: 0.97 }}
              >
                Request a Quote
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <span className="h-8 w-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRightIcon className="h-4 w-4 text-green-600" strokeWidth={3} />
                  </span>
                </motion.span>
              </motion.button>

            </form>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-10">
            <span className="text-green-600">6 Reasons</span> to Choose Us
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                src: "/img/instant-cash.webp",
                title: "Instant Cash",
                desc: "on the spot",
              },
              {
                src: "/img/free-removal.webp",
                title: "Free Removal",
                desc: "No Hidden Charges",
              },
              {
                src: "/img/professional.webp",
                title: "Professional",
                desc: "& Friendly Service",
              },
              {
                src: "/img/best-offer.webp",
                title: "Best Offer",
                desc: "Top Price Guaranteed",
              },
              {
                src: "/img/service.webp",
                title: "Service",
                desc: "Excellent Service",
              },
              {
                src: "/img/same-day.webp",
                title: "Same-Day",
                desc: "Removal Within Hours",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md hover:shadow-lg rounded-xl p-6 flex flex-col items-center text-center transition duration-300"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-20 h-20 object-contain mb-4"
                />
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-green-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10 px-4">
        {[1, 2, 3, 4, 5].map((item, index) => {
          const { ref, inView } = useInView({ triggerOnce: true });
          const controls = useAnimation();

          const isEven = index % 2 === 0;
          const slideDirection = isEven ? -100 : 100;

          useEffect(() => {
            // Only animate if viewport is md (768px) or larger
            if (inView && window.innerWidth >= 768) {
              controls.start({ opacity: 1, x: 0 });
            }
          }, [inView, controls]);

          const content = [
            {
              title: "Cash For Cars Rotorua",
              text: `Are you looking to get rid of your old car? Maybe it’s been sitting in your garage or driveway for years and you’re ready to move on. Or perhaps it’s been in an accident and it’s no longer safe to drive. Whatever the reason, getting cash offer for your car in Rotorua is easier than you think. There are many options for selling your car, but not all of them are equal. Some require a lot of time and effort on your part, while others may not offer a fair price for your scrap vehicle. Cash for cars Rotorua is a great option for those who want to get rid of their unwanted car quickly and for a fair price.`,
              img: "/img/damage-car.webp",
              alt: "Damaged car",
            },
            {
              title: "Get Cash for Cars Rotorua",
              text: `Cash for cars Rotorua is a service that buys cars in any condition, regardless of their make, model, or year. They offer a hassle-free way to sell your car, without the need for advertising, negotiating, or dealing with potential buyers.`,
              img: "/img/two-man-negotiate.webp",
              alt: "Negotiation",
            },
            {
              title: "Top Cash For Cars Rotorua",
              text: `The process of selling your car to Top cash for cars Rotorua is simple and straightforward. First, you’ll need to contact them either through their website or by phone to get a quote for your vehicle. You’ll need to provide some basic information about your car, such as its make, model, year, and condition. Once you’ve received a quote, you can choose whether or not to accept it. If you decide to go ahead, you’ll need to arrange a time and place for the car to be picked up. Cash for cars Rotorua will come to you, so you don’t need to worry about transporting the vehicle yourself. When the car is picked up, you’ll need to provide the necessary paperwork, such as the registration and title. Cash for cars Rotorua will take care of the rest, including paying you in cash or via bank transfer.`,
              img: "/img/man-towed-car.webp",
              alt: "Man towing car",
            },
            {
              title: "Cash For Cars Rotorua",
              text: `One of the main advantages of using cash for cars Rotorua is that you can sell your car quickly. You don’t need to wait for potential buyers to contact you or haggle over the price. Cash for cars Rotorua will give you a quote on the spot and can usually pick up the car within a few days. Another advantage is that you can sell your car in any condition. Cash for cars Rotorua buys cars that are running, not running, or even those that have been in accidents. This is especially useful if you have a car that you can’t sell through traditional means, such as a dealership or private sale.`,
              img: "/img/two-man-negotiate.webp",
              alt: "Negotiation",
            },
            {
              title: "Car Wreckers Rotorua",
              text: `Cash for cars Rotorua also offers a fair price for your vehicle. They use a number of factors to determine the value of your car, such as its age, mileage, and condition. You can be sure that you’ll get a competitive price for your vehicle, without the need to negotiate or haggle.`,
              img: "/img/damage-car.webp",
              alt: "Damaged car",
            },
          ];

          const current = content[index];

          return (
            <div
              key={index}
              className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center my-12"
            >
              {/* Mobile Image - Above Text */}
              <div className="md:hidden flex justify-center mb-4">
                <img
                  src={current.img}
                  alt={current.alt}
                  className="w-full max-w-xs h-auto bg-transparent"
                />
              </div>

              {/* Left Column - Desktop Image with animation */}
              {isEven ? (
                <>
                  {/* Desktop Image with animation */}
                  <motion.div
                    ref={ref}
                    animate={controls}
                    initial={{ opacity: 0, x: slideDirection }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:flex justify-center order-1"
                  >
                    <img
                      src={current.img}
                      alt={current.alt}
                      className="max-w-md w-full h-auto bg-transparent"
                    />
                  </motion.div>

                  {/* Text */}
                  <div className="order-2 md:hidden">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                      {current.title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg whitespace-pre-line">
                      {current.text}
                    </p>
                  </div>
                  <motion.div
                    ref={ref}
                    animate={controls}
                    initial={{ opacity: 0, x: slideDirection }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:block order-2"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                      {current.title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg whitespace-pre-line">
                      {current.text}
                    </p>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Text */}
                  <div className="order-1 md:hidden">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                      {current.title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg whitespace-pre-line">
                      {current.text}
                    </p>
                  </div>
                  <motion.div
                    ref={ref}
                    animate={controls}
                    initial={{ opacity: 0, x: slideDirection }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:block order-1"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                      {current.title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-lg whitespace-pre-line">
                      {current.text}
                    </p>
                  </motion.div>

                  {/* Desktop Image with animation */}
                  <motion.div
                    ref={ref}
                    animate={controls}
                    initial={{ opacity: 0, x: slideDirection }}
                    transition={{ duration: 0.6 }}
                    className="hidden md:flex justify-center order-2"
                  >
                    <img
                      src={current.img}
                      alt={current.alt}
                      className="max-w-md w-full h-auto bg-transparent"
                    />
                  </motion.div>
                </>
              )}
            </div>
          );
        })}
      </section>


      <section className="bg-white py-16 px-4 text-center">
        <p className="text-green-600 md:text-2xl font-medium text-sm mb-2">
          We pay within minutes. Provide your details and get cash in 3 steps.
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Our Process
        </h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Step 1 - Contact */}
          <div className="flex flex-col items-center">
            <div className="bg-green-100 rounded-full p-8 mb-6">
              <img src="/img/contact.webp" alt="Get an Offer" className="w-10 h-10 text-green-600" />
            </div>

            <h3 className="text-xl font-semibold mb-2">Contact</h3>
            <p className="text-gray-600 text-sm">
              Contact us now at 0800 997000 or use the contact form on this page. Once we obtain your details, we will dispatch a team to your area.
            </p>
          </div>

          {/* Step 2 - Get an Offer */}
          <div className="flex flex-col items-center">
            <div className="bg-green-100 rounded-full p-8 mb-6">
              <img src="/img/best-offer.webp" alt="Get an Offer" className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Get an Offer</h3>
            <p className="text-gray-600 text-sm">
              Our evaluation will consider the vehicle's year, make, model, miles are driven, and overall condition. Our team will make you a reasonable offer based on the appraisal results.
            </p>
          </div>

          {/* Step 3 - Free Removal */}
          <div className="flex flex-col items-center">
            <div className="bg-green-100 rounded-full p-8 mb-6">
              <img src="/img/free-removal.webp" alt="Free Removal" className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Free Removal</h3>
            <p className="text-gray-600 text-sm">
              We'll pay you instant cash for cars if you accept the offer. Our crew will take your automobile away on the same day for free.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What Our Customers Say</h2>
          <p className="text-gray-600 mt-4 text-base md:text-lg">Real feedback from happy Rotorua car sellers</p>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory px-2">
          {[
            {
              name: "Sarah T.",
              text: "Super fast and hassle-free! They picked up my car the same day and paid in cash. Highly recommend.",
              img: "/img/testimonial1.webp",
            },
            {
              name: "John D.",
              text: "I didn’t expect to get much for my broken car, but they offered a great price and took care of everything.",
              img: "/img/testimonial2.webp",
            },
            {
              name: "Lena M.",
              text: "Friendly staff and great communication. The pickup was on time, and the payment was instant.",
              img: "/img/testimonial3.webp",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center snap-start"
            >
              <img
                src={t.img}
                alt={`Photo of ${t.name}`}
                className="w-20 h-20 object-cover rounded-full mb-4 border-2 border-green-600"
              />
              <p className="text-gray-700 mb-4 italic">"{t.text}"</p>
              <h3 className="text-lg font-semibold text-green-700">{t.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-green-600 text-white py-16 px-4 bg-no-repeat bg-right-bottom bg-contain">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Left Content with Image, Heading, Text */}
          <div className="bg-green-600 text-white px-4 py-12">
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center md:text-left">
              {/* Image on Top */}
              <div className="mb-6">
                <img
                  src="/img/man-thumbsup.webp"
                  alt="Man giving thumbs up beside a car"
                  className="w-50 h-50 object-contain mx-auto"
                />
              </div>

              {/* Heading + Text */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Get Top Cash for Unwanted Cars
                </h1>
                <p className="text-lg">
                  We offer top cash for cars, trucks, SUVs, vans and provide free same-day removal.
                </p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <form className="md:w-1/2 w-full grid grid-cols-1 gap-4 bg-white p-6 rounded-lg shadow-lg text-black">
            {/* Contact Number */}
            <div className="relative">
              <PhoneIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Your contact number"
                className="border rounded px-10 py-2 w-full"
              />
            </div>

            {/* Vehicle Details */}
            <div className="relative">
              <TruckIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Vehicle rego OR make, model & year"
                className="border rounded px-10 py-2 w-full"
              />
            </div>

            {/* Pickup Address */}
            <div className="relative">
              <MapPinIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Pickup address (start typing...)"
                className="border rounded px-10 py-2 w-full"
              />
            </div>

            <motion.button
              type="submit"
              className="group w-full bg-green-700 text-white font-semibold py-3 rounded-xl hover:bg-green-800 transition flex items-center justify-center gap-2"
              whileTap={{ scale: 0.97 }}
            >
              GET A QUOTE NOW
              <motion.span
                className="inline-block"
                initial={{ x: 0 }}
                whileHover={{ x: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="h-8 w-8 rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRightIcon className="h-4 w-4 text-green-700" strokeWidth={3} />
                </span>
              </motion.span>
            </motion.button>

          </form>
        </div>
      </section>


      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-12">
            GET OUR CASH FOR CARS ROTORUA SERVICE IN 3 SIMPLE STEPS:
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Step 1: Contact Us */}
            <div className="bg-green-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-center bg-green-100 w-14 h-14 rounded-full mb-4">
                <PhoneIcon className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Contact Us</h3>
              <p className="text-gray-700">
                Contact us now at <strong>0800 997000</strong> or use the contact form on this page. Once we obtain your details, we will dispatch a team to your area.
              </p>
            </div>

            {/* Step 2: Assessment */}
            <div className="bg-green-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-center bg-green-100 w-14 h-14 rounded-full mb-4">
                <ClipboardIcon className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Assessment</h3>
              <p className="text-gray-700">
                Our evaluation will consider the vehicle's year, make, model, miles driven, and condition. Based on this, we’ll make you a reasonable cash offer.
              </p>
            </div>

            {/* Step 3: Sale & Removal */}
            <div className="bg-green-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
              <div className="flex items-center justify-center bg-green-100 w-14 h-14 rounded-full mb-4">
                <TruckIcon className="w-6 h-6 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Sale & Free Car Removal</h3>
              <p className="text-gray-700">
                We’ll pay you instant cash for cars if you accept the offer. Our crew will take your automobile away on the same day for free.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-10">
          FAQ: CASH FOR CAR SERVICES, ROTORUA
        </h2>
        <div className="flex justify-center mb-10">
          <div className="h-14 w-14 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>


        <div className="divide-y divide-gray-300">
          {faqs.map((faq, index) => (
            <div key={index} className="py-5">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left focus:outline-none"
              >
                <span className={`text-lg font-semibold ${openIndex === index ? 'text-green-600' : 'text-black'}`}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon className="h-5 w-5 text-teal-500" />
                </motion.div>
              </button>

              {openIndex === index && (
                <motion.div
                  className="mt-3 text-gray-600"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-green-50 py-16 px-4 sm:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src="/img/two-man-negotiate.webp" // Replace this with your actual image path
              alt="Get in Touch"
              className="max-w-sm w-full md:max-w-md lg:max-w-lg object-contain"
            />
          </div>

          {/* Right Text Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Get in Touch</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Finally, using cash for cars Rotorua is a safe and secure way to sell your car. You don’t need to worry about meeting with strangers or dealing with potential scammers. Cash for cars Rotorua is a reputable company that has been in the business for many years, and they will provide you with a fair and honest service.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              In conclusion, if you’re looking to sell your car in Rotorua, using cash for cars Rotorua is a great option. It’s quick, easy, and hassle-free, and you can be sure that you’ll get a fair price for your vehicle. So why wait? Contact cash for cars Rotorua today and get instant cash for your car!
            </p>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-medium shadow hover:bg-green-700 transition flex items-center space-x-3">
              <PhoneIcon className="h-6 w-6" />
              <span>Contact Us Now</span>
            </button>
          </div>
        </div>
      </section>


      <section className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Cash For Cars Rotorua</h3>
            <p className="text-gray-400">
              Quick, easy, and hassle-free car removal. Get top cash offers instantly.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                0800 99 7000
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                info@cashforcars.co.nz
              </li>
              <li className="flex items-center">
                <MapPinIcon className="h-5 w-5 mr-2" />
                Rotorua, New Zealand
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Services</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Get Instant Offer</h4>
            <p className="text-gray-400 mb-4">
              Contact us today to get a free quote for your vehicle!
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium">
              Get an Offer
            </button>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Cash For Cars Rotorua. All rights reserved.
        </div>
      </section>


    </motion.main>
  );
}
