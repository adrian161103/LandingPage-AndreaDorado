import React, { useState } from "react";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // nuevo
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  // Solo bloquea bots que completen el honeypot
  const handleSubmit = (e: React.FormEvent) => {
    if (website) {
      e.preventDefault();
      return;
    }
  };

  // El asunto será: "Nombre - Teléfono"
  const subject = `${name} - ${phone}`;

  // Lógica de WhatsApp
const handleWhatsapp = () => {
  const whatsappNumber = "5491151091962";
  const message = `¡Hola! Quiero más info sobre terapia psicológica, mi nombre es ${name}`;
  const url = `https://api.whatsapp.com/send/?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

  return (
    <section id="contact" className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-semibold mb-10 text-center text-gray-800 especialidades">
          Contacto
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
         

          {/* Formulario con Formsubmit */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form
              onSubmit={handleSubmit}
              action="https://formsubmit.co/tu-correo@ejemplo.com"
              method="POST"
              className="space-y-6"
              noValidate
            >
              {/* Config Formsubmit */}
              <input type="hidden" name="_next" value="https://tusitio.com/gracias" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value={subject} />

              {/* Honeypot anti-spam */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Nombre + Teléfono */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-m font-medium text-gray-700 mb-1"
                  >
                    Tu nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Ingresa tu nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-m font-medium text-gray-700 mb-1"
                  >
                   Tu Teléfono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Ej. 11 5555 5555"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-m font-medium text-gray-700 mb-1"
                >
                  Tu email
                </label>
                <input
                  id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="ejemplo@correo.com"
                  />
              </div>

              {/* Mensaje */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-m font-medium text-gray-700 mb-1"
                >
                  ¿En qué puedo ayudarte?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Escribe tu consulta aquí..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 cursor-pointer bg-[#e5b3fe] hover:text-[#7F8C9A] rounded-lg hover:bg-[#ffffcc] text-black transition duration-[1000ms]"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
           {/* Información de contacto */}
          <aside className="space-y-4 md:self-center">
            <p className="text-lg">
              <strong>Teléfono:</strong>{" "}
              <a href="tel:+541151091962" className="text-[#23658B] hover:underline">
                11 5109 1962
              </a>
            </p>
            <p className="text-lg">
              <strong>Email:</strong>{" "}
              <a href="mailto:lic.andreadorado@gmail.com" className="text-[#23658B] hover:underline">
                lic.andreadorado@gmail.com
              </a>
            </p>
            <p className="text-lg">
              <strong>Dirección:</strong> Jerónimo Salguero 1164, Almagro | Palermo, CABA
            </p>
            <button
              className="inline-block cursor-pointer mt-4 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-[1000ms] whatsapp-btn"
              onClick={handleWhatsapp}
            >
              Más Info por WhatsApp
            </button>
          </aside>
        </div>
        
      </div>
    </section>
  );
};

export default ContactForm;