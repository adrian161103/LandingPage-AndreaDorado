import React from "react";

export interface ServiceItem {
  title: string;
  description: string;
  imageUrl?: string;
}

const serviciosData: ServiceItem[] = [
  {
    title: "Ansiedad",
    description: "Acompañamiento en el manejo de estrés, ataques de pánico y fobias.",
    imageUrl: "/img/Test.jpg",
  },
  {
    title: "Depresión",
    description: "Soporte para transitar estados de tristeza profunda y falta de motivación.",
    imageUrl: "/img/depresion.jpg",
  },
  {
    title: "Crisis Vitales",
    description: "Herramientas para afrontar cambios y rupturas vitales significativas.",
  },
  {
    title: "Duelos",
    description: "Acompañamiento en procesos de pérdida y duelo.",
    imageUrl: "/img/duelos.jpg",
  },
  {
    title: "Problemáticas Vinculares",
    description: "Terapia de pareja y familiar para mejorar la comunicación y vínculo.",
    imageUrl: "/img/vinculos.jpg",
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center text-gray-800">
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
                duration-300 ease-in-out
              "
            >
              {/* Imagen de fondo si existe */}
              {servicio.imageUrl ? (
                <img
                  src={servicio.imageUrl}
                  alt={servicio.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-blue-100" />
              )}

              {/* Overlay semi-transparente */}
              <div
                className="
                  absolute inset-0 bg-black bg-opacity-80 
                  group-hover:bg-opacity-60 transition-opacity 
                  duration-300 z-10
                "
              />

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
                <p className="text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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