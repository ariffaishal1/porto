import type { Language } from "@/lib/i18n/dictionaries";

export type NavItem = {
  label: string;
  href: string;
};

export const navItemsId: NavItem[] = [
  { label: "Beranda", href: "#hero" },
  { label: "Tentang", href: "#about" },
  { label: "Keahlian", href: "#skills" },
  { label: "Proyek", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Pengalaman", href: "#experience" },
  { label: "Kontak", href: "#contact" },
];

export const navItemsEn: NavItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const navItems = navItemsId;

export function getNavItems(lang: Language): NavItem[] {
  return lang === "en" ? navItemsEn : navItemsId;
}
