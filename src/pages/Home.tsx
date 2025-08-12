
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';
import Page from '../components/Page';
import SEO from "../components/SEO";

const Home = () => {
  return (
    <>
          <SEO
        title="Lic. Andrea Dorado | Psicóloga en Buenos Aires"
        description="Psicóloga (UBA) con 35 años de experiencia. Terapia presencial y online para adultos y adolescentes. Especialista en ansiedad, depresión y adicciones en CABA."
        canonical="https://andreadorado.com.ar/"
        keywords={["psicóloga", "terapia", "ansiedad", "depresión", "psicología online", "Buenos Aires"]}
        jsonLdId='jsonld-person'
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Lic. Andrea Dorado",
          "jobTitle": "Psicóloga",
          "description": "Especialista en ansiedad, depresión y adicciones. 35 años de experiencia.",
          "image": "https://andreadorado.com.ar/img/therapy-hero.webp",
          "url": "https://andreadorado.com.ar/"
        }}
      />
      <Page   >
    <main id="main" role="main" className=" color-black-50 bg-[#FCFBF9] ">
      <Hero backgroundUrl="/img/therapy-hero.webp" />
      <About />
      <Services />
      <ContactForm />
    </main>
      </Page>
    </>
  );
};

export default Home;
