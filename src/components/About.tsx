const About = () => {
  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-8">
          
          {/* Imagen - 40% en pantallas medianas y mayores */}
          <div className="w-full md:w-[40%]">
            <img
              className="w-full h-auto rounded-xl shadow-md object-cover"
              src="/img/Test.jpg"
              alt="imagen de testeo"
            />
          </div>

          {/* Texto - 60% */}
          <div className="w-full md:w-[60%]">
            <h2 className="text-3xl font-semibold mb-4 text-center md:text-left">
              ¿Quién soy?
            </h2>
            <p className="text-[#7F8C9A] leading-relaxed text-center md:text-left text-lg">
              Soy Andrea Dorado, Licenciada en Psicología por la UBA y Supervisora
              Clínica, con más de 35 años de experiencia. Me dedico al
              acompañamiento de adolescentes, adultos y adultos mayores que
              atraviesan ansiedad, depresión, crisis vitales, duelos y problemáticas
              vinculares. Mi enfoque integra herramientas psicoanalíticas y terapias
              focalizadas, ofreciendo un espacio seguro y confidencial. Mi objetivo
              es brindarte la contención y las herramientas necesarias para
              potenciar tu bienestar emocional.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;