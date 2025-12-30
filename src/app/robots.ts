import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ["Googlebot", "Bingbot"],
        allow: "/",
      },

      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "ClaudeBot",
          "AnthropicBot",
          "Google-Extended",
          "PerplexityBot",
          "Amazonbot",
          "Applebot-Extended",
        ],
        disallow: "/",
      },

      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://skillnest-ai-nine.vercel.app/sitemap.xml",
  };
}
