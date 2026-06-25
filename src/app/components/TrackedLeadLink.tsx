"use client";

import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import {
  trackLeadIntentClick,
  type LeadIntentChannel,
} from '@/app/lib/adsAttribution';

type TrackedLeadLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  channel: LeadIntentChannel;
  placement: string;
};

const TrackedLeadLink = ({
  channel,
  placement,
  href = '',
  onClick,
  ...props
}: TrackedLeadLinkProps) => {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackLeadIntentClick({ channel, placement, href });
    onClick?.(event);
  };

  return <a href={href} onClick={handleClick} {...props} />;
};

export default TrackedLeadLink;
