import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { properties } from "@/data/properties";

const staticPaths = [
  "",
  "/prodej-nemovitosti",
  "/oceneni",
  "/sluzby",
  "/nemovitosti",
  "/o-mne",
  "/reference",
  "/kontakt",
  "/zasady-ochrany-osobnich-udaju",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const propertyEntries: MetadataRoute.Sitemap = properties.map((property) => ({
    url: `${siteUrl}/nemovitosti/${property.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticEntries, ...propertyEntries];
}
