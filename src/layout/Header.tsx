import React, { useState, useEffect } from "react";

export interface HeaderNavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  navLinks: HeaderNavLink[];
}

const Header: React.FC<HeaderProps> = ({ navLinks }) => {
  const [open, setOpen] = useState(false);

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      role="banner"
      className="w-full bg-[#F8F4ED] text-[#7F8C9A] shadow-md sticky top-0 z-50"
    >
      <nav
        className="container mx-auto flex items-center justify-between py-3 px-4 md:py-4 md:px-6"
        role="navigation"
        aria-label="Principal"
      >
        {/* Logo / Marca */}
        <a href="#hero" className="text-lg md:text-xl font-bold tracking-tight">
          Andrea Dorado
        </a>

        {/* Botón hamburguesa (solo mobile) */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7BBBCD]"
          aria-label="Abrir menú"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {/* Iconos: hamburguesa / cerrar */}
          <svg
            className={`h-6 w-6 transition-transform duration-200 ${open ? "scale-0" : "scale-100"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            className={`h-6 w-6 absolute transition-transform duration-200 ${open ? "scale-100" : "scale-0"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>

        {/* Navegación desktop */}
        <ul className="hidden md:flex md:items-center md:space-x-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="hover:text-[#7BBBCD] transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay + Panel móvil */}
      {/* Overlay clicable para cerrar */}
      <div
        className={`md:hidden fixed inset-0 bg-black/40 transition-opacity duration-200 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      {/* Panel */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85%] bg-[#F8F4ED] shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#E7E1D6]">
          <span className="text-base font-semibold">Menú</span>
          <button
            type="button"
            className="p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#7BBBCD]"
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>

        <ul className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-base hover:bg-[#EDE7DD] hover:text-[#7BBBCD] transition-colors duration-300"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
