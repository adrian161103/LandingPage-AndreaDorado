
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ContactForm from '../components/ContactForm';
import Page from '../components/Page';
// Página principal Home
const Home = () => {
  return (
    <main className=" color-black-50 bg-[#FCFBF9] ">
      <Page   >
      <Hero backgroundUrl="/img/Theraphy.jpg" />
      <About />
      <Services />
      <ContactForm />
      </Page>
    </main>
  );
};

export default Home;
