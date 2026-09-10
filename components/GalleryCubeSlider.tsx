'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';

interface CubeSlide {
  image: string;
  alt: string;
}

const SLIDES: CubeSlide[] = [
  { image: '/images/hair-gallery1.jpeg', alt: 'Tousled wavy haircut' },
  { image: '/images/lookbook-2.jpg', alt: 'Blonde hair twist with gold leaf ornament' },
  { image: '/images/hair-hero3.jpeg', alt: 'Salon interior finishing work' },
  { image: '/images/instagram-1.jpg', alt: 'Precision scissor work on a male crop' },
  { image: '/images/lookbook-3.jpg', alt: 'Glossy editorial wet strand profile' },
  { image: '/images/instagram-4.jpg', alt: 'Honey gloss balayage with beach waves' },
];

export const GalleryCubeSlider: React.FC = () => {
  return (
    <section className="relative bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50 block text-center mb-5">
          The Collection
        </span>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-[1.05] text-center mb-14 sm:mb-20">
          SIGNATURE LOOKS
        </h2>

        <Swiper
          effect="cube"
          grabCursor
          loop
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          pagination={{
            clickable: true,
            renderBullet: (_, className) =>
              `<span class="${className} cube-bullet" aria-hidden="true"></span>`,
          }}
          modules={[EffectCube, Pagination, Autoplay]}
          className="gallery-cube-swiper"
        >
          {SLIDES.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative aspect-[4/5] sm:aspect-[4/4] overflow-hidden bg-neutral-900">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .gallery-cube-swiper {
          width: 100%;
          max-width: 480px;
          margin: 0 auto;
          --swiper-theme-color: #ffffff;
          --swiper-pagination-color: #ffffff;
          --swiper-pagination-bullet-inactive-color: #ffffff;
          --swiper-pagination-bullet-inactive-opacity: 0.35;
          padding-bottom: 56px;
        }
        .cube-bullet {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
      `}</style>
    </section>
  );
};