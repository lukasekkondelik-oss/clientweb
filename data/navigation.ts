export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "Prodej nemovitosti", href: "/prodej-nemovitosti" },
  { label: "Ocenění", href: "/oceneni" },
  { label: "Služby", href: "/sluzby" },
  { label: "Nemovitosti", href: "/nemovitosti" },
  { label: "O mně", href: "/o-mne" },
  { label: "Reference", href: "/reference" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerLinks: NavItem[] = [
  ...mainNav,
  { label: "Zásady ochrany osobních údajů", href: "/zasady-ochrany-osobnich-udaju" },
];
