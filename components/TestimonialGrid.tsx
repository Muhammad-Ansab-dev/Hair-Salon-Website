'use client';
import React from 'react';
import { TESTIMONIALS } from '@/data/salonData';

const TestimonialCard: React.FC<{ item: (typeof TESTIMONIALS)[number] }> = ({ item }) => (
  <div className="h-[100px] w-[300px] sm:w-[360px] shrink-0 bg-white border border-neutral-200 shadow-sm hover:bg-black hover:border-black group/tc transition-colors duration-300 flex flex-col justify-center px-6 cursor-default">
    <p className="font-editorial text-base font-black uppercase text-black leading-snug line-clamp-2 group-hover/tc:text-white transition-colors">
      "{item.quote}"
    </p>
    <p className="text-[10px] font-semibold tracking-wider text-neutral-500 group-hover/tc:text-white/60 mt-1.5 transition-colors">
      {item.author} · {item.role} · {item.location}
    </p>
  </div>
);

export const TestimonialGrid: React.FC = () => {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="bg-white py-16 sm:py-20 overflow-hidden">
      <div className="text-center mb-10 sm:mb-14">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-neutral-400 mb-3 block">
          Client Words
        </span>
        <h2 className="font-editorial text-2xl sm:text-3xl font-black uppercase text-black tracking-tight">
          VOICES OF THE CRAFT
        </h2>
      </div>

      <div className="w-full grid gap-3 sm:gap-4">
        {(['', 'reverse', 'slower'] as const).map((variant, row) => (
          <div key={variant} className="group-marquee flex overflow-hidden">
            <div className={`animate-marquee ${variant}`}>
              {doubled.map((item, idx) => (
                <TestimonialCard key={`${item.id}-${row}-${idx}`} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};