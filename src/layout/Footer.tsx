import React from "react";

export interface Social {
  name: string;
  url: string;
  icon: React.ReactNode;
  color?: string;
}

export interface NavLink {
  label: string;
  href: string;
}


export interface ContactInfo {
  phone: string;
  email: string;
  addresses: string[];
  href: string;
}

export interface PaymentMethod {
  icon: React.ReactNode;
  label: string;
  color?: string;
}


interface FooterProps {
  socials: Social[];
  navLinks: NavLink[];
  contactInfo: ContactInfo;
  paymentMethods?: PaymentMethod[];
}

const Footer: React.FC<FooterProps> = ({ socials, navLinks, contactInfo, paymentMethods = [] }) => (
  <footer className="bg-[#F8F4ED] text-[#7F8C9A] py-8 mt-auto">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-start gap-8 px-6">
     
      <div>
        <h2 className="font-bold text-lg mb-2">Navegación</h2>
        <ul>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:underline">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
           <div className=" mb-2 ">
        <h2 className="font-bold text-lg mb-2">Datos de Contacto</h2>
        <div className="flex space-x-4 ">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-blue-400 transition-colors"
              style={social.color ? { color: social.color } : {}}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
        <p>Tel: {contactInfo.phone}</p>
        <p>Email: <a href={`mailto:${contactInfo.email}`} className="hover:underline">{contactInfo.email}</a></p>
        <div className="mt-2">
          {contactInfo.addresses.map((address, i) => (
           <p> <a className="hover:underline" target="_blank" href={contactInfo.href} key={i}>{address} </a> </p>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-bold text-lg mb-2">Métodos de pago</h2>
        <div className="flex flex-col space-y-2">
          {paymentMethods.map((method, i) => (
            <div key={i} className="flex items-center space-x-2">
              <span className="text-2xl" style={method.color ? { color: method.color } : {}}>{method.icon}</span>
              <span>{method.label}</span>
            </div>
          ))}
        </div>
      </div>

   
   
    </div>
    <div className="text-center text-xs text-gray-400 mt-8">&copy; {new Date().getFullYear()} Andrea Dorado. Todos los derechos reservados.</div>
  </footer>
);

export default Footer;
