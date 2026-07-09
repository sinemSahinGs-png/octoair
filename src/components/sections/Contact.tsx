export function Contact() {
  return (
    <section id="contact" className="content-section contact-panel">
      <p className="section-tag">Contact</p>
      <h3>Book the flight</h3>
      <form className="contact-form" action="#" method="post">
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="name@example.com" />
        </label>
        <label>
          Phone
          <input type="tel" name="phone" placeholder="+971" />
        </label>
        <label>
          Arriving
          <input type="text" name="arriving" placeholder="Destination" />
        </label>
        <button type="submit" className="pill-btn">
          Book the Flight
        </button>
      </form>
      <footer className="site-footer">
        <a href="#">Privacy Policy</a>
        <a href="mailto:info@jeskojets.com">Contact</a>
      </footer>
    </section>
  );
}
