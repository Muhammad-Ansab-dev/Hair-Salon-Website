'use client';
import React from 'react';
import { GalleryGrid } from '../components/GalleryGrid';
import { GalleryCubeSlider } from '../components/GalleryCubeSlider';

export const GalleryPage: React.FC = () => {
  return (
    <>
      <GalleryCubeSlider />
      <GalleryGrid />
    </>
  );
};