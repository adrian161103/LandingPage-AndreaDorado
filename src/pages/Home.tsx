
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Page from '../components/Page';
// Página principal Home
const Home = () => {
  return (
    <main className=" color-black-50">
      <Page   >
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <ContactForm />
      </Page>
    </main>
  );
};

export default Home;
