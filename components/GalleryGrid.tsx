'use client';
import React from 'react';
import { motion } from 'motion/react';

interface GalleryItem {
  image: string;
  alt: string;
  caption: string;
}

const ITEMS: GalleryItem[] = [
  {
    image: '/images/hair-gallery1.jpeg',
    alt: 'Male model with tousled wavy haircut',
    caption: 'Textured swept crop',
  },
  {
    image: '/images/lookbook-2.jpg',
    alt: 'Elegant blonde hair twist with gold leaf ornament',
    caption: 'The golden flora twist',
  },
  {
    image: '/images/instagram-4.jpg',
    alt: 'Brunette model with honey gloss highlights and beach waves',
    caption: 'Sun-drenched honey balayage',
  },
  {
    image: '/images/lookbook-3.jpg',
    alt: 'Glossy editorial profile with sculpted strands',
    caption: 'Editorial wet strand',
  },
  {
    image: '/images/instagram-1.jpg',
    alt: 'Master stylist scissor work on a textured male crop',
    caption: 'Precision taper fade',
  },
  {
    image: '/images/hair-hero3.jpeg',
    alt: 'Salon interior with editorial color and finishing work in progress',
    caption: 'Inside Paul Hair Studio',
  },
];

export const GalleryGrid: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f7f5ee] px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {ITEMS.map((item, idx) => (
          <motion.figure
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-40px' }}
            transition={{
              duration: 0.7,
              ease: 'easeOut',
              delay: idx * 0.06,
            }}
            className="relative group overflow-hidden bg-white aspect-square"
          >
            <img
              src={item.image}
              alt={item.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
              <span className="block text-[10px] sm:text-[11px] leading-tight tracking-[0.18em] uppercase text-white font-semibold">
                {item.caption}
              </span>
            </div>
          </motion.figure>
        ))}
      </div>
    </div>
  );
};