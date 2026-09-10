'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { SERVICES, SERVICE_MEDIA } from '@/data/salonData';
import { ServiceItem } from '@/types';
import '../experience/servicesCatalog.css';

interface ServicesCatalogProps {
  onSelectService: (service: ServiceItem) => void;
}

const CATEGORY_FACETS = Array.from(new Set(SERVICES.map((s) => s.category)));

const imageFor = (service: ServiceItem) => {
  const media = SERVICE_MEDIA[service.id];
  return { image: media?.image ?? '/images/hero-1.jpg', alt: media?.alt ?? service.name };
};

export const ServicesCatalog: React.FC<ServicesCatalogProps> = ({ onSelectService }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [openPanel, setOpenPanel] = useState<string | null>('category');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const activeFacetCount = category !== 'all' ? 1 : 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = SERVICES.filter((s) => {
      if (category !== 'all' && s.category !== category) return false;
      if (q && !`${s.name} ${s.description}`.toLowerCase().includes(q)) return false;
      return true;
    });
    return list;
  }, [query, category]);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLElement>('.svcat-card');
    if (!cards || cards.length === 0) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 14, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.05, overwrite: true }
    );
  }, [filtered]);

  const togglePanel = (key: string) => {
    setOpenPanel((prev) => (prev === key ? null : key));
  };

  const clearAll = () => {
    setQuery('');
    setCategory('all');
  };

  return (
    <div className="svcat-root">
      {/* ── Page header ─────────────────────────────────────── */}
      <div className="px-6 sm:px-8 md:px-12 pt-32 sm:pt-40 pb-10 sm:pb-14 bg-[#f7f5ee]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-neutral-500 mb-4">
            Paul Hair Studio
          </p>
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight leading-none text-black">
            Our Services
          </h1>
          <p className="mt-5 text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl mx-auto">
            Filter by treatment, price and time — then book the ritual that fits your headspace.
          </p>
          <p className="mt-6 text-[11px] tracking-[0.25em] uppercase text-neutral-500">
            Menu from CHF 29 &nbsp;·&nbsp; Zurich · Paris &nbsp;·&nbsp; 12 Studios
          </p>
        </div>
      </div>

      <div className="svcat-layout">
        {/* ── Mobile filter toggle ─────────────────────────── */}
        <div className="svcat-mobile-bar">
          <span className="svcat-result-count">{filtered.length} services</span>
          <button
            type="button"
            className="svcat-filter-toggle"
            onClick={() => setFiltersOpen((v) => !v)}
          >
            Filters
            {activeFacetCount > 0 && <span className="svcat-badge">{activeFacetCount}</span>}
          </button>
        </div>

        {/* ── Sidebar filters ───────────────────────────────── */}
        <aside className={`svcat-sidebar ${filtersOpen ? 'svcat-sidebar--open' : ''}`}>
          {/* Search */}
          <div className="svcat-search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            <input
              type="search"
              placeholder="Search services…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search services"
            />
          </div>

          {/* Category dropdown */}
          <div className="svcat-panel">
            <button
              type="button"
              className={`svcat-panel-head ${openPanel === 'category' ? 'svcat-panel-head--open' : ''}`}
              onClick={() => togglePanel('category')}
              aria-expanded={openPanel === 'category'}
            >
              <span>Category</span>
              <svg viewBox="0 0 12 12" aria-hidden="true">
                <path d="M2 4l4 4 4-4" />
              </svg>
            </button>
            <div className="svcat-panel-collapsor">
              <div className="svcat-panel-body">
                <button
                  type="button"
                  className={`svcat-option ${category === 'all' ? 'svcat-option--active' : ''}`}
                  onClick={() => setCategory('all')}
                >
                  <span>All categories</span>
                  <span className="svcat-count">{SERVICES.length}</span>
                </button>
                {CATEGORY_FACETS.map((cat) => {
                  const count = SERVICES.filter((s) => s.category === cat).length;
                  return (
                    <button
                      key={cat}
                      type="button"
                      className={`svcat-option ${category === cat ? 'svcat-option--active' : ''}`}
                      onClick={() => setCategory(cat)}
                    >
                      <span>{cat}</span>
                      <span className="svcat-count">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {(query || activeFacetCount > 0) && (
            <button type="button" className="svcat-clear" onClick={clearAll}>
              Clear all filters
            </button>
          )}
        </aside>

        {/* ── Results grid ──────────────────────────────────── */}
        <div className="svcat-results">
          <div className="svcat-toolbar">
            <span className="svcat-result-count">
              {filtered.length} {filtered.length === 1 ? 'service' : 'services'}
            </span>
            <span className="svcat-toolbar-note">Book online · Instant confirmation</span>
          </div>

          {filtered.length > 0 ? (
            <div className="svcat-grid" ref={gridRef}>
              {filtered.map((service) => {
                const { image, alt } = imageFor(service);
                return (
                  <article key={service.id} className="svcat-card">
                    <div className="svcat-card-media">
                      <img src={image} alt={alt} loading="lazy" />
                      <span className="svcat-card-cat">{service.category}</span>
                    </div>
                    <div className="svcat-card-body">
                      <h3 className="svcat-card-name">{service.name}</h3>
                      <p className="svcat-card-desc">{service.description}</p>
                      <div className="svcat-card-meta">
                        <span>{service.durationMinutes} min</span>
                        <span className="svcat-card-price">CHF {service.price}</span>
                      </div>
                      <button
                        type="button"
                        className="svcat-book"
                        onClick={() => onSelectService(service)}
                      >
                        Book now <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="svcat-empty">
              <p className="svcat-empty-title">No services match those filters.</p>
              <p className="svcat-empty-sub">Try widening the price or duration range.</p>
              <button type="button" className="svcat-clear svcat-clear--inline" onClick={clearAll}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};