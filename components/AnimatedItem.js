'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

export default function AnimatedItem() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ contact: '', vehicle: '', address: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    fetch('/api/data')
      .then((res) => res.ok ? res.json() : Promise.reject())
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
    setShowModal(true);
    setForm({ contact: '', vehicle: '', address: '' });

    setTimeout(() => setSubmitted(false), 4000);
  };

  const faqs = [
    {
      question: "Approximately how much money could I get for my car?",
      answer: "When determining a fair price for your car, we consider many variables...",
    },
    {
      question: "Are you interested in buying non-functioning cars?",
      answer: "Yes. It makes no difference whether your car is running or not.",
    },
    {
      question: "Do I have to bring my vehicle to you?",
      answer: "No, we offer free towing and will arrange pickup at your convenience.",
    },
    {
      question: "When will my car be towed?",
      answer: "We usually complete pickup within 24 hours.",
    },
    {
      question: "Do I pay a fee for vehicle removal?",
      answer: "No. Our car removal service is completely free of charge.",
    },
  ];

  return (
    <motion.main
      className="min-h-screen bg-gray-50 p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      
    </motion.main>
  );
}
