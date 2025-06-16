import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const content = [
  {
    title: "Cash For Cars Rotorua",
    text: `Are you looking to get rid of your old car?...`,
    img: "/img/damage-car.webp",
    alt: "Damaged car",
  },
  // ... other items
];

function AnimatedSectionItem({ item, index }) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const controls = useAnimation();

  const isEven = index % 2 === 0;
  const slideDirection = isEven ? -100 : 100;

  useEffect(() => {
    if (inView && window.innerWidth >= 768) {
      controls.start({ opacity: 1, x: 0 });
    }
  }, [inView, controls]);

  return (
    <div
      key={index}
      className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center my-12"
    >
      {/* Mobile Image - Above Text */}
      <div className="md:hidden flex justify-center mb-4">
        <img
          src={item.img}
          alt={item.alt}
          className="w-full max-w-xs h-auto bg-transparent"
        />
      </div>

      {isEven ? (
        <>
          <motion.div
            ref={ref}
            animate={controls}
            initial={{ opacity: 0, x: slideDirection }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex justify-center order-1"
          >
            <img
              src={item.img}
              alt={item.alt}
              className="max-w-md w-full h-auto bg-transparent"
            />
          </motion.div>

          <div className="order-2 md:hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {item.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg whitespace-pre-line">
              {item.text}
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
              {item.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg whitespace-pre-line">
              {item.text}
            </p>
          </motion.div>
        </>
      ) : (
        <>
          <div className="order-1 md:hidden">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {item.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg whitespace-pre-line">
              {item.text}
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
              {item.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg whitespace-pre-line">
              {item.text}
            </p>
          </motion.div>

          <motion.div
            ref={ref}
            animate={controls}
            initial={{ opacity: 0, x: slideDirection }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex justify-center order-2"
          >
            <img
              src={item.img}
              alt={item.alt}
              className="max-w-md w-full h-auto bg-transparent"
            />
          </motion.div>
        </>
      )}
    </div>
  );
}

export default function YourSection() {
  return (
    <section className="bg-white py-10 px-4">
      {content.map((item, index) => (
        <AnimatedSectionItem key={index} item={item} index={index} />
      ))}
    </section>
  );
}
