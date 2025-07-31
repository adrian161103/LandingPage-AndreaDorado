// Componente ContactForm
const ContactForm = () => {
  return <section id="contact" className="py-16">
  <div className="container mx-auto grid md:grid-cols-2 gap-8">
    <div>
      <h2 className="text-3xl font-semibold mb-4">Contacto</h2>
      <p className="mb-2"><strong>Tel:</strong> 11 5109 1962</p>
      <p className="mb-4"><strong>Email:</strong> andrea.dorado@example.com</p>
      <a href="https://wa.me/1151091962" className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg">
        Chatear por WhatsApp
      </a>
    </div>
    <form className="space-y-4">
      <input type="text" name="name" placeholder="Tu nombre" className="w-full p-3 border rounded" required />
      <input type="email" name="email" placeholder="Tu email" className="w-full p-3 border rounded" required />
      <textarea name="message" rows={4} placeholder="¿En qué puedo ayudarte?" className="w-full p-3 border rounded" required />
      <button type="submit" className="w-full px-6 py-3 bg-blue-600 text-white rounded">
        Enviar mensaje
      </button>
    </form>
  </div>
</section>;
};

export default ContactForm;
