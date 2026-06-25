const STORAGE_KEY = 'tsc_ads_attribution_v1';

const TRACKING_PARAMS = [
  'gclid',
  'gbraid',
  'wbraid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_id',
  'utm_adgroup',
  'utm_term',
  'utm_content',
  'matchtype',
  'network',
  'device',
] as const;

type TrackingParam = (typeof TRACKING_PARAMS)[number];

type AdsAttribution = {
  captured_at: string;
  landing_url: string;
  landing_referrer: string;
  params: Partial<Record<TrackingParam, string>>;
};

export type LeadIntentChannel = 'whatsapp' | 'phone';

type LeadIntentClick = {
  channel: LeadIntentChannel;
  placement: string;
  href: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const emptyAttribution = (): AdsAttribution => ({
  captured_at: '',
  landing_url: '',
  landing_referrer: '',
  params: {},
});

const getSessionStorage = () => {
  if (typeof window === 'undefined') return null;

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
};

const readStoredAttribution = (): AdsAttribution | null => {
  const storage = getSessionStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdsAttribution) : null;
  } catch {
    return null;
  }
};

const writeStoredAttribution = (attribution: AdsAttribution) => {
  const storage = getSessionStorage();
  if (!storage) return;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // Attribution is useful, but it must never block the lead form.
  }
};

const getCurrentTrackingParams = () => {
  if (typeof window === 'undefined') return {};

  const searchParams = new URL(window.location.href).searchParams;
  return TRACKING_PARAMS.reduce<Partial<Record<TrackingParam, string>>>((acc, key) => {
    const value = searchParams.get(key);
    if (value) acc[key] = value;
    return acc;
  }, {});
};

const hasTrackingParams = (params: Partial<Record<TrackingParam, string>>) =>
  Object.values(params).some(Boolean);

export const captureAdsAttribution = (): AdsAttribution => {
  if (typeof window === 'undefined') return emptyAttribution();

  const currentParams = getCurrentTrackingParams();
  const stored = readStoredAttribution();

  if (stored && !hasTrackingParams(currentParams)) {
    return stored;
  }

  const attribution: AdsAttribution = {
    captured_at: new Date().toISOString(),
    landing_url: window.location.href,
    landing_referrer: document.referrer || '',
    params: hasTrackingParams(currentParams) ? currentParams : stored?.params ?? {},
  };

  writeStoredAttribution(attribution);
  return attribution;
};

export const getAdsAttribution = (): AdsAttribution => {
  if (typeof window === 'undefined') return emptyAttribution();
  return readStoredAttribution() ?? captureAdsAttribution();
};

const formatSummary = (attribution: AdsAttribution) => {
  const { params } = attribution;
  const parts = [
    params.utm_source || 'sin fuente',
    params.utm_medium || 'sin medio',
    params.utm_campaign ? `campaign=${params.utm_campaign}` : '',
    params.utm_adgroup ? `adgroup=${params.utm_adgroup}` : '',
    params.utm_term ? `keyword=${params.utm_term}` : '',
    params.utm_content ? `creative=${params.utm_content}` : '',
    params.matchtype ? `match=${params.matchtype}` : '',
    params.device ? `device=${params.device}` : '',
  ].filter(Boolean);

  return parts.join(' | ');
};

const getAttributionFields = (attribution: AdsAttribution) => {
  const { params } = attribution;

  return {
    origen_ads: formatSummary(attribution),
    ads_gclid: params.gclid || '',
    ads_gbraid: params.gbraid || '',
    ads_wbraid: params.wbraid || '',
    ads_utm_source: params.utm_source || '',
    ads_utm_medium: params.utm_medium || '',
    ads_campaign_id: params.utm_campaign || '',
    ads_utm_id: params.utm_id || '',
    ads_adgroup_id: params.utm_adgroup || '',
    ads_keyword: params.utm_term || '',
    ads_creative_id: params.utm_content || '',
    ads_matchtype: params.matchtype || '',
    ads_network: params.network || '',
    ads_device: params.device || '',
    landing_url: attribution.landing_url,
    landing_current_url: typeof window !== 'undefined' ? window.location.href : '',
    landing_referrer: attribution.landing_referrer,
    landing_captured_at: attribution.captured_at,
  };
};

export const appendAdsAttributionToFormData = (data: FormData) => {
  const attribution = captureAdsAttribution();
  const fields = getAttributionFields(attribution);

  Object.entries(fields).forEach(([key, value]) => {
    data.set(key, value);
  });
};

export const trackLeadIntentClick = ({ channel, placement, href }: LeadIntentClick) => {
  if (typeof window === 'undefined') return;

  const attribution = captureAdsAttribution();
  const fields = getAttributionFields(attribution);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'tsc_lead_intent_click',
    event_category: 'lead_intent',
    event_action: channel,
    event_label: placement,
    lead_channel: channel,
    lead_placement: placement,
    lead_href: href,
    page_path: window.location.pathname,
    page_title: document.title,
    ...fields,
  });
};
