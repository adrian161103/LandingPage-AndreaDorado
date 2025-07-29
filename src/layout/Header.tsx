import React from "react";

export interface HeaderNavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  navLinks: HeaderNavLink[];
}

const Header: React.FC<HeaderProps> = ({ navLinks }) => (
  <header className="w-full bg-white shadow-md sticky top-0 z-50">
    <nav className="container mx-auto flex items-center justify-between py-4 px-6">
      <div className="text-xl font-bold">Andrea Dorado</div>
      <ul className="flex space-x-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="hover:text-blue-600 transition-colors">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default Header;
