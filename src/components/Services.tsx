import React from "react";

export interface ServiceItem {
  title: string;
  description: string;
  imageUrl?: string;
  alt: string;
}

const serviciosData: ServiceItem[] = [
  {
    title: "Ansiedad",
    description:
      "Acompañamiento en el manejo de estrés, ataques de pánico y fobias.",
    imageUrl: "/img/specialty-anxiety.webp",
    alt:"Paciente con síntomas de ansiedad en consulta psicológica"

  },
  {
    title: "Depresión",
    description:
      "Soporte para transitar estados de tristeza profunda y falta de motivación.",
    imageUrl: "/img/specialty-depression.webp",
    alt: "Persona con signos de depresión recibiendo apoyo psicológico"
  },
  {
    title: "Crisis Vitales",
    description:
      "Herramientas para afrontar cambios y rupturas vitales significativas.",
    imageUrl: "/img/specialty-vital-crises.webp",
    alt: "Hombre angustiado en sesión por crisis vital"

  },
  {
    title: "Duelos",
    description: "Acompañamiento en procesos de pérdida y duelo.",
    imageUrl: "/img/specialty-duel.webp",
    alt: "Paciente recibiendo contención emocional durante duelo"
  },
  {
    title: "Problemáticas Vinculares",
    description:
      "Terapia de pareja y familiar para mejorar la comunicación y vínculo.",
    imageUrl: "/img/specialty-bonding-therapy.webp",
    alt: "Terapia de pareja y familiar para mejorar la comunicación"
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-semibold mb-10 text-center text-gray-800 especialidades">
          Especialidades
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serviciosData.map((servicio) => (
            <div
              key={servicio.title}
              className="
                group relative h-64 rounded-lg overflow-hidden 
                shadow-sm bg-white hover:shadow-md 
                transform hover:scale-105 transition 
                duration-300 ease-in-out focus:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-sky-400
              "
            >
              {/* Imagen de fondo si existe */}
              {servicio.imageUrl ? (
                <div className="w-full h-full relative">
                  <img
                  loading="lazy"
                    src={servicio.imageUrl}
                    alt={servicio.alt}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay solo si hay imagen */}
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10" />
                </div>
              ) : (
                <div className="w-full h-full bg-black" />
              )}
              {/* Contenido */}
              <div
                className="
                  absolute inset-0 flex flex-col items-center 
                  justify-center text-center px-4 z-20
                "
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {servicio.title}
                </h3>
                <p className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity group-focus:opacity-100 duration-800">
                  {servicio.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
