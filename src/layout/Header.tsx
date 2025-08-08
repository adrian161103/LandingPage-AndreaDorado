import React from "react";

export interface HeaderNavLink {
  label: string;
  href: string;
}

interface HeaderProps {
  navLinks: HeaderNavLink[];
}

const Header: React.FC<HeaderProps> = ({ navLinks }) => (
  <header role="banner" className="w-full bg-[#F8F4ED] text-[#7F8C9A] shadow-md sticky top-0 z-50">
    <nav className="container mx-auto flex items-center justify-between py-4 px-6">
      <div className="text-xl font-bold"> <a href="">Andrea Dorado</a></div>
      <ul className="flex space-x-6">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="hover:text-[#7BBBCD] transition-colors duration-[500ms]">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default Header;
