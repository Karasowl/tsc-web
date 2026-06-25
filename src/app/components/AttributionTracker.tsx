"use client";

import { useEffect } from 'react';
import { captureAdsAttribution } from '@/app/lib/adsAttribution';

const AttributionTracker = () => {
  useEffect(() => {
    captureAdsAttribution();
  }, []);

  return null;
};

export default AttributionTracker;
