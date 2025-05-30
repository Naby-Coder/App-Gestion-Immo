import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    text: "ImmoExpert nous a accompagnés dans l'achat de notre première maison aux Almadies. Leur expertise du marché dakarois a été déterminante.",
    author: "Moussa et Fatou D.",
    location: "Acheteurs à Dakar",
    rating: 5,
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
  },
  {
    id: 2,
    text: "Service exceptionnel ! J'ai vendu mon appartement à Sacré-Cœur en un temps record grâce à leur réseau et leur professionnalisme.",
    author: "Abdoulaye S.",
    location: "Vendeur à Dakar",
    rating: 5,
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  {
    id: 3,
    text: "Une équipe à l'écoute qui comprend vraiment les besoins de ses clients. Mon investissement à Thiès s'est fait en toute sérénité.",
    author: "Aminata N.",
    location: "Investisseur à Thiès",
    rating: 5,
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative max-w-6xl mx-auto px-4">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center gap-8 bg-white rounded-xl shadow-lg p-8"
          >
            <div className="w-full md:w-1/3">
              <img
                src={testimonials[currentIndex].image}
                alt={testimonials[currentIndex].author}
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-1 text-yellow-400 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 text-lg italic mb-4">"{testimonials[currentIndex].text}"</p>
              <div>
                <p className="font-semibold text-gray-800">{testimonials[currentIndex].author}</p>
                <p className="text-gray-500">{testimonials[currentIndex].location}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>
    </div>
  );
};

export default TestimonialSlider;