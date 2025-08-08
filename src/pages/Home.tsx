
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';
import Page from '../components/Page';
// Página principal Home
const Home = () => {
  return (
      <Page   >
    <main id="main" role="main" className=" color-black-50 bg-[#FCFBF9] ">
      <Hero backgroundUrl="/img/therapy-hero.webp" />
      <About />
      <Services />
      <ContactForm />
    </main>
      </Page>
  );
};

export default Home;
