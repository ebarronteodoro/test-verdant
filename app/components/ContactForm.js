"use client";

import Link from "next/link";
import Image from "next/image";
import "../styles/components/contactForm.css";

export default function ContactForm({ param }) {
  return (
    <>
      <section className="contact-form">
        <Image
          className="flecha_1"
          src="/flecha-gris.png"
          alt="Flecha gris"
          width={50}
          height={50}
        />

        <Image
          className="flecha_2"
          src="/flecha-gris.png"
          alt="Flecha gris"
          width={50}
          height={50}
        />

        <div className="contact-form__container">
          <div className="contact-form__description">
            <h2 className="contact-form__title">
              ¡Queremos
              <br />
              saber{" "}
              <span className="contact-form__title--highlight">más de ti!</span>
            </h2>
            <p className="contact-form__text">
              Compártenos tus datos y te ayudaremos a dar el siguiente paso
              hacia tu nuevo hogar
            </p>
          </div>

          <div className="contact-form__form-wrapper">
            {/* <form className="contact-form__form" action="includes/process_form_89234.php" method="post" onSubmit="return validarFormulario();"> */}
            <form
              className="contact-form__form"
              action=""
              method="POST"
              id="contactForm"
            >
              <Image
                src="/verdi-formulario.png"
                alt="Verdi"
                width={300}
                height={150}
              />

              <div className="contact-form__row double">
                <div className="contact-form__section">
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="contact-form__input"
                    required
                  />
                  <label htmlFor="nombre" className="contact-form__label">
                    <span>Nombres</span>
                  </label>
                </div>
                <div className="contact-form__section">
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    className="contact-form__input"
                    required
                  />
                  <label htmlFor="apellido" className="contact-form__label">
                    <span>Apellidos</span>
                  </label>
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__section select-div">
                  <label htmlFor="proyecto" className="contact-form__label">
                    <span>Proyecto de interés</span>
                  </label>
                  <select
                    id="proyecto"
                    name="proyecto"
                    className="contact-form__select"
                    required
                  >
                    <option value=""></option>
                    <option value="1646">Seed Growing Home</option>
                    <option value="1647">Soil Quality Home</option>
                  </select>
                </div>
              </div>

              <div className="contact-form__row double">
                <div className="contact-form__section select-div">
                  <label
                    htmlFor="tipo_documento"
                    className="contact-form__label"
                  >
                    <span>Tipo de Documento</span>
                  </label>
                  <select
                    id="tipo_documento"
                    name="tipo_documento"
                    className="contact-form__select"
                    required
                  >
                    <option value=""></option>
                    <option value="1">DNI</option>
                    <option value="4">CE</option>
                  </select>
                </div>
                <div className="contact-form__section">
                  <input
                    type="text"
                    id="dni"
                    name="dni"
                    className="contact-form__input"
                    required
                  />
                  <label htmlFor="dni" className="contact-form__label">
                    <span>DNI o Carnet de extranjería</span>
                  </label>
                </div>
              </div>

              <div className="contact-form__row double">
                <div className="contact-form__section">
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    className="contact-form__input"
                    required
                  />
                  <label htmlFor="telefono" className="contact-form__label">
                    <span>Teléfono</span>
                  </label>
                </div>
                <div className="contact-form__section">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="contact-form__input"
                    required
                  />
                  <label htmlFor="email" className="contact-form__label">
                    <span>Correo Electrónico</span>
                  </label>
                </div>
              </div>

              <div className="contact-form__row">
                <div className="contact-form__section">
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    className="contact-form__textarea"
                    rows="3"
                    required
                  ></textarea>
                  <label htmlFor="mensaje" className="contact-form__label">
                    <span>Mensaje</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="contact-form__submit-button">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
