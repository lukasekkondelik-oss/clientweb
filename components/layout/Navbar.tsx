"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-[60] border-b border-line/80 bg-cream/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between lg:h-20">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-xl tracking-tight text-charcoal lg:text-2xl">
            Romana Reality
          </span>
          <span className="text-[10px] uppercase tracking-[0.25em] text-bronze">
            Romana Trefná
          </span>
        </Link>

        <nav aria-label="Hlavní navigace" className="hidden items-center gap-7 lg:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-charcoal/80 transition-colors hover:text-bronze",
                pathname === item.href && "text-bronze",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="/oceneni" size="md">
            Odhad zdarma
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 text-charcoal lg:hidden"
          aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] overflow-y-auto bg-cream transition-transform duration-300 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
      >
        <nav aria-label="Mobilní navigace" className="container-page flex flex-col gap-1 py-6">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className={cn(
                "border-b border-line py-4 font-serif text-2xl text-charcoal",
                pathname === item.href && "text-bronze",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/oceneni" size="lg" onClick={closeMenu} className="mt-6 w-full">
            Odhad zdarma
          </Button>
        </nav>
      </div>
    </header>
  );
}
