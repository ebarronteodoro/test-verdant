import DontGoComponent from "../components/DontGo";
import Layout from "../Layouts/layout";
import "../styles/contacto.css";

export const metadata = {
  title: "Contacto | Verdânt Inmobiliaria",
  description:
    "¿Tienes alguna consulta? Déjanos todas tus preguntas en nuestro formulario de contacto y un asesor te responderá o se contactará contigo vía telefónica.",
  keywords: "contacto, asesor, consultas, Verdânt",
};

export default function Page() {
  return (
    <Layout>
      <section aria-labelledby="contact-title" className="contact-section">
        <header>
          <div>
            <h1 id="contact-title">Contacto</h1>
            <p>
              <strong>¿Tienes alguna consulta?</strong>
              Déjanos todas tus preguntas en nuestro formulario de contacto y un
              asesor te responderá o se contactará contigo vía telefónica.
            </p>
          </div>
          <picture>
            <img src="/contact-page/Pet.png" alt="Mascota de Verdant" />
          </picture>
        </header>

        <div className="contact-info">
          <div className="info-container">
            <div>
              <img src="/contact-page/wsp-icon.png" alt="Icono de WhatsApp" />
              <p>
                <strong>WhatsApp:</strong> +51 982 145 819
              </p>
            </div>
            <div>
              <img src="/contact-page/mail-icon.png" alt="Icono de correo" />
              <p>
                <strong>Correo:</strong>{" "}
                <a href="mailto:ventas.digital@verdant.pe">
                  ventas.digital@verdant.pe
                </a>
              </p>
            </div>

            <div>
              <img
                src="/contact-page/location-icon.png"
                alt="Icono de dirección"
              />
              <p>
                <strong>Dirección:</strong> Centro Empresarial Plexus
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="contact-form-title" className="form-section">
        <img className="flecha_1" src="/flecha-gris.png" />
        <img className="flecha_2" src="/flecha-gris.png" />
        <img className="flecha_3" src="/flecha-gris.png" />

        <div className="form-container">
          <img src="/leaf-1.png" className="leaf-testimonial leaf-1" />
          <img src="/leaf-2.png" className="leaf-testimonial leaf-2" />
          <img src="/leaf-3.png" className="leaf-testimonial leaf-3" />
          <img src="/leaf-4.png" className="leaf-testimonial leaf-4" />
          <img src="/leaf-5.png" className="leaf-testimonial leaf-5" />
          {/* <img src="/leaf-6.png" className="leaf-testimonial leaf-6" /> */}
          <img src="/leaf-7.png" className="leaf-testimonial leaf-7" />
          <div className="form-container__son">
            <div>
              <picture>
                <img src="/contact-page/Pet.png" alt="Mascota de Verdant" />
              </picture>
              <div>
                <h2 id="contact-form-title">Nos comunicaremos contigo</h2>
                <p>Escribe tus datos aquí</p>
              </div>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
            <form method="POST" id="form_contact">
              <div className="row">
                <div>
                  <input type="text" id="name" name="name" required />
                  <label htmlFor="name">
                    <span>Nombres</span>
                  </label>
                </div>
                <div>
                  <input type="text" id="lastname" name="lastname" required />
                  <label htmlFor="lastname">
                    <span>Apellidos</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="select">
                  <select id="project" name="project" required defaultValue="">
                    <option value="" disabled></option>
                    <option value="1646">Seed Growing Home</option>
                    <option value="1647">Soil Quality Home</option>
                  </select>
                  <label htmlFor="project">
                    <span>Proyecto de Interés</span>
                  </label>
                </div>
                <div className="document-container">
                  <div>
                    <select type="text" name="document_type" defaultValue={1}>
                      <option value="1">DNI</option>
                      <option value="4">C.E</option>
                    </select>
                  </div>
                  <div>
                    <div>
                      <input
                        type="number"
                        id="identification"
                        name="identification"
                        required
                      />
                      <label htmlFor="identification">
                        <span>Número de identificación</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div>
                  <input type="email" id="email" name="email" required />
                  <label htmlFor="email">
                    <span>Correo Electrónico</span>
                  </label>
                </div>
                <div>
                  <input type="tel" id="phone" name="phone" required />
                  <label htmlFor="phone">
                    <span>Número de Teléfono</span>
                  </label>
                </div>
              </div>
              <div className="last-row">
                <div className="text-area">
                  <textarea id="message" name="message"></textarea>
                  <label htmlFor="message">
                    <span>Mensaje</span>
                  </label>
                </div>
                <div>
                  <div>
                    <input type="checkbox" id="terms" name="terms" required />
                    <label htmlFor="terms">
                      He leído y acepto los Términos y condiciones y las
                      Políticas de Privacidad
                    </label>
                  </div>
                  <button type="submit">Enviar mensaje</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="proyectos-section__button">
          <img src="/barra-hojas.png" alt="Barra hojas" />
        </div>
      </section>
      <DontGoComponent variant="standard" />
    </Layout>
  );
}
