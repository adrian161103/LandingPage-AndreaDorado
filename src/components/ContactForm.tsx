import React, { useState } from "react";

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateName = (name: string) => {
  const onlyLetters = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const lettersCount = (onlyLetters.match(/[A-Za-zÑñÁÉÍÓÚáéíóúÜü]/g) || [])
    .length;
  return lettersCount >= 3;
};

const validatePhoneAR = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
};

type Status = "idle" | "loading" | "success" | "error";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    message: false,
  });

  const [status, setStatus] = useState<Status>("idle");
  const [globalError, setGlobalError] = useState<string | null>(null);

  // === ENV: mail receptor desde .env ===
  const RECEIVER_EMAIL = import.meta.env.VITE_FORMSUBMIT_EMAIL as
    | string
    | undefined;
  const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER as
    | string
    | undefined;
  const FORMSUBMIT_URL = RECEIVER_EMAIL
    ? `https://formsubmit.co/ajax/${RECEIVER_EMAIL}`
    : null;

  const onBlur = (field: keyof typeof touched) =>
    setTouched((t) => ({ ...t, [field]: true }));

  const nameError = touched.name && !validateName(name);
  const phoneError = touched.phone && !validatePhoneAR(phone);
  const emailError = touched.email && !validateEmail(email);
  const messageError = touched.message && message.trim().length < 10;

  const subject = `${name} - ${phone}`;

  const handleWhatsapp = () => {
    if (!WHATSAPP_NUMBER) {
      console.error("No está configurado VITE_WHATSAPP_NUMBER en el .env");
      return;
    }
    const text = `¡Hola! Quiero más info sobre terapia psicológica, mi nombre es ${name}`;
    const url = `https://api.whatsapp.com/send/?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
      text
    )}`;
    window.open(url, "_blank");
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setWebsite("");
    setTouched({ name: false, phone: false, email: false, message: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({ name: true, phone: true, email: true, message: true });

    const isValid =
      validateName(name) &&
      validatePhoneAR(phone) &&
      validateEmail(email) &&
      message.trim().length >= 10;

    if (website) {
      resetForm();
      setStatus("success");
      setGlobalError(null);
      return;
    }

    if (!isValid) {
      setStatus("error");
      setGlobalError(
        "Revisá los campos marcados en rojo e intentá nuevamente."
      );
      return;
    }

    if (!FORMSUBMIT_URL) {
      setStatus("error");
      setGlobalError(
        "Falta configurar el email del formulario. Definí VITE_FORMSUBMIT_EMAIL en las variables de entorno."
      );
      return;
    }

    setStatus("loading");
    setGlobalError(null);

    try {
      const res = await fetch(FORMSUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          message,
          _subject: subject,
          _captcha: "false",
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || `Error ${res.status}`);
      }

      await res.json().catch(() => ({}));
      setStatus("success");
      resetForm();
    } catch (err) {
      setStatus("error");
      setGlobalError(
        err instanceof Error
          ? err.message
          : "No pudimos enviar el mensaje. Verificá el formulario o intentá más tarde."
      );
    }
  };

  return (
    <section id="contact" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-semibold mb-10 text-center text-gray-800 especialidades">
          Contacto
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {status === "success" && (
              <div
                role="status"
                aria-live="polite"
                className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800"
              >
                ¡Tu mensaje fue enviado correctamente! Te responderemos a la
                brevedad.
              </div>
            )}

            {globalError && (
              <div
                role="alert"
                className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800"
              >
                {globalError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Honeypot */}
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
                    onBlur={() => onBlur("name")}
                    aria-invalid={nameError ? "true" : "false"}
                    aria-describedby={nameError ? "name-error" : undefined}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      nameError
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-400"
                    }`}
                    placeholder="Ingresa tu nombre"
                    autoComplete="name"
                  />
                  {nameError && (
                    <p id="name-error" className="text-xs text-red-600 mt-1">
                      El nombre debe tener al menos 3 letras.
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-m font-medium text-gray-700 mb-1"
                  >
                    Tu teléfono
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Permite solo dígitos, +, espacios, guiones y paréntesis
                      const filtered = value.replace(/[^0-9+\s()-]/g, "");
                      setPhone(filtered);
                    }}
                    onBlur={() => onBlur("phone")}
                    aria-invalid={phoneError ? "true" : "false"}
                    aria-describedby={phoneError ? "phone-error" : undefined}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      phoneError
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-400"
                    }`}
                    placeholder="Ej. +54 9 11 5555-5555"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                  {phoneError && (
                    <p id="phone-error" className="text-xs text-red-600 mt-1">
                      Ingresá un teléfono válido. Podés usar +54, espacios o
                      guiones.
                    </p>
                  )}
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
                  onBlur={() => onBlur("email")}
                  aria-invalid={emailError ? "true" : "false"}
                  aria-describedby={emailError ? "email-error" : undefined}
                  placeholder="ejemplo@correo.com"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    emailError
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-blue-400"
                  }`}
                />
                {emailError && (
                  <p id="email-error" className="text-xs text-red-600 mt-1">
                    Por favor, ingresá un correo electrónico válido.
                  </p>
                )}
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
                  onBlur={() => onBlur("message")}
                  aria-invalid={messageError ? "true" : "false"}
                  aria-describedby={messageError ? "message-error" : undefined}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Escribí tu consulta aquí..."
                />
                {messageError && (
                  <p id="message-error" className="text-xs text-red-600 mt-1">
                    Contanos un poco más (mínimo 10 caracteres).
                  </p>
                )}
              </div>

              <button
                aria-label="Enviar mensaje"
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 cursor-pointer bg-[#e5b3fe] hover:text-[#7F8C9A] rounded-lg hover:bg-[#ffffcc] text-black transition duration-[1000ms] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Enviando..." : "Enviar mensaje"}
              </button>
            </form>
          </div>

          {/* Información de contacto */}
          <aside className="space-y-4 md:self-center">
            <p className="text-lg">
              <strong>Teléfono:</strong>{" "}
              <a
                href="tel:+541151091962"
                className="text-[#23658B] hover:underline"
              >
                11 5109 1962
              </a>
            </p>
            <p className="text-lg">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:lic.andreadorado@gmail.com"
                className="text-[#23658B] hover:underline"
              >
                lic.andreadorado@gmail.com
              </a>
            </p>
            <p className="text-lg">
              <strong>Dirección:</strong> Jerónimo Salguero 1164, Almagro |
              Palermo, CABA
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
