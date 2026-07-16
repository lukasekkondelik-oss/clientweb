export interface UtmParams {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

const STORAGE_KEY = "rr_utm_params";

/**
 * Reads UTM parameters from the current URL (client-side only) and persists
 * them in sessionStorage so they survive navigation between pages within the
 * same visit, ready to be attached to any lead submitted later.
 */
export function captureUtmParams(): UtmParams {
  if (typeof window === "undefined") {
    return { utmSource: "", utmMedium: "", utmCampaign: "" };
  }

  const params = new URLSearchParams(window.location.search);
  const fromUrl: UtmParams = {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
  };

  const hasAny = fromUrl.utmSource || fromUrl.utmMedium || fromUrl.utmCampaign;

  if (hasAny) {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    return fromUrl;
  }

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as UtmParams;
  } catch {
    // ignore malformed storage
  }

  return { utmSource: "", utmMedium: "", utmCampaign: "" };
}

export function getPageUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.href;
}
