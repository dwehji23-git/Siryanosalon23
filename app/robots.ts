import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://siryano.com/sitemap.xml",
    host: "https://siryano.com",
  };
}
