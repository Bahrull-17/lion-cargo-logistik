import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Lion Cargo",
    description: "Jasa cargo udara dari Bandara Soekarno-Hatta (CGK) ke seluruh Indonesia.",
    lang: "id",
    start_url: "/id",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#C8102E",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
