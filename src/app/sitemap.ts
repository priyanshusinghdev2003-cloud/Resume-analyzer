import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://resume-analyzer-kappa-two.vercel.app/",
      lastModified: new Date(),
    },
  ];
}
