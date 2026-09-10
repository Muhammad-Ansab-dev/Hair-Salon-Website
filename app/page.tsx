'use client';

import { useSite } from '@/components/Providers';
import { HomePage } from '@/views/HomePage';

export default function Page() {
  const { onBookNow, onSelectServiceForBooking } = useSite();
  return <HomePage onBookNow={onBookNow} onSelectServiceForBooking={onSelectServiceForBooking} />;
}