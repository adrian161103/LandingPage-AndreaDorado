import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp  } from "react-icons/fa";
import { SiGooglemaps, SiMercadopago, SiVisa, SiMastercard  } from "react-icons/si";
import { TbCashBanknote  } from "react-icons/tb";


import Footer from "../layout/Footer";
import Header from "../layout/Header";
import type { Social, NavLink, ContactInfo } from "../layout/Footer";
import type { HeaderNavLink } from "../layout/Header";

import { Helmet } from "react-helmet";

const navLinks: NavLink[] = [
  { label: "Inicio", href: "#hero" },
  { label: "Trayectoria", href: "#about" },
  { label: "Atención Psicoanalítica", href: "#services" },
  { label: "Contacto", href: "#contact" },
];

const headerLinks: HeaderNavLink[] = navLinks;

const socials: Social[] = [
  { name: "Facebook", url: "https://www.facebook.com/lic.andreadorado/", icon: <FaFacebookF />, color: "#1877F3" },
  { name: "Instagram", url: "https://www.instagram.com/lic.andreadoradook/?hl=es", icon: <FaInstagram />, color: "#E4405F" },
  { name: "GoogleMaps", url: "https://maps.app.goo.gl/kju5aMR1CBLK1EmA7", icon: <SiGooglemaps />, color: "#34A853" },
  { name: "WhatsApp", url: "https://wa.me/5491151091962", icon: <FaWhatsapp />, color: "#25D366" },
];


const contactInfo: ContactInfo = {
  phone: "+54 9 1151091962",
  email: "lic.andreadorado@gmail.com",
  href: "https://maps.app.goo.gl/kju5aMR1CBLK1EmA7",
  addresses: [
    "Jerónimo Salguero 1164, Almagro | Palermo",
    "CABA",
  ],
};

const paymentMethods = [
  { icon: <SiMercadopago />, label: "Mercado Pago", color: "#009EE3" },
  { icon: <SiVisa />, label: "Visa", color: "#1A1F71" },
  { icon: <SiMastercard />, label: "Mastercard", color: "#EB001B" },
  { icon: <TbCashBanknote  />, label: "Efectivo", color: "#08b651" },
];

interface PageProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title = "Andrea Dorado | Psicoanalista", description = "Lic. Andrea Dorado - Atención Psicoanalítica, Trayectoria, El Andén, Contacto.", children }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://andreadorado.com.ar/" />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Header navLinks={headerLinks} />
        <main className="flex-1">{children}</main>
        <Footer
          socials={socials}
          navLinks={navLinks}
          contactInfo={contactInfo}
          paymentMethods={paymentMethods}
        />
      </div>
    </>
  );
};

export default Page;
