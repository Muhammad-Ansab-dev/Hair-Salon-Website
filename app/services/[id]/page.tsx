'use client';

import { use } from 'react';
import { useSite } from '@/components/Providers';
import { ServiceDetailPage } from '@/components/ServiceDetailPage';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { onSelectServiceForBooking } = useSite();
  return <ServiceDetailPage serviceId={id} onSelectServiceForBooking={onSelectServiceForBooking} />;
}