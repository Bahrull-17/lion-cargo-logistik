import { Home, Info, Plane, MapPin, FileText, HelpCircle, PhoneCall } from "lucide-react";

export const navigation = [
  {
    key: "home",
    href: "/",
    icon: Home,
  },
  {
    key: "about",
    href: "/tentang-kami",
    icon: Info,
  },
  {
    key: "services",
    href: "/layanan",
    icon: Plane,
  },
  {
    key: "destination",
    href: "/kota-tujuan",
    icon: MapPin,
  },
  {
    key: "article",
    href: "/artikel",
    icon: FileText,
  },
  {
    key: "faq",
    href: "/faq",
    icon: HelpCircle,
  },
  {
    key: "contact",
    href: "/kontak",
    icon: PhoneCall,
  },
] as const;
