import React, { useEffect, useState } from "react";

interface HeroProps {
  backgroundUrl: string;
}

const Hero: React.FC<HeroProps> = ({ backgroundUrl }) => {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Zoom máximo: 1.3x (ajustable)
  const zoom = 1 + Math.min(offsetY / 1000, 0.3);
  const blur = Math.min(offsetY / 50, 15);
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex items-center overflow-hidden"
    >
      {/* Imagen de fondo con blur y zoom */}
      <div
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: `${zoom * 100}%`,
          backgroundPosition: "center",
          filter: `blur(${blur}px)`,
          transition: "background-size 0.8s linear, filter 1s linear"
        }}
      />
      {/* Overlay negro semitransparente */}
      <div className="absolute inset-0 bg-black opacity-40" />

      {/* Contenido */}
      <div className="relative z-10 container mx-auto px-4 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-bold text-[#e5b3fe] mb-4">
          LIC. ANDREA DORADO
        </h1>
        <p className="text-xl md:text-2xl text-gray-100 mb-6">
          Especialista en Ansiedad, Depresión y Adicción
        </p>
        <p className="text-sm md:text-base text-gray-200 mb-8">
          🎓 Lic. en Psicología (UBA) • 35 años de experiencia  
          💻 Terapia virtual y presencial • Adultos y Adolescentes
        </p>
        <div className="space-x-4">
          <a
            href="#contact"
            className="inline-block px-6 py-3 bg-[#ffffcc] hover:bg-[#e5b3fe] hover:text-[#7F8C9A]  text-black rounded-lg transition-all duration-[1000ms]"
          >
            Solicitar turno
          </a>
          <a
            href="#about"
            className="inline-block px-6 py-3 border border-white text-white hover:bg-white hover:text-black rounded-lg transition-all duration-[1000ms]"
          >
            Conocé más
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
