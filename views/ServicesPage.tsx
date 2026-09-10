'use client';
import React from 'react';
import { useSite } from '@/components/Providers';
import { ServicesCatalog } from '../components/ServicesCatalog';

export const ServicesPage: React.FC = () => {
  const { onSelectServiceForBooking } = useSite();
  return <ServicesCatalog onSelectService={onSelectServiceForBooking} />;
};