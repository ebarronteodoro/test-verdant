"use client";
import { useEffect } from "react";
import Image from "next/image";
import DontGoComponent from "../components/DontGo";
import Layout from "../Layouts/layout";
import "../styles/refiere.css";

export default function ClientRefiere() {
  useEffect(() => {
    // Función de validación del formulario
    function validarFormulario() {
      const formContainers = document.querySelectorAll(".form__container");
      if (formContainers.length < 2) {
        alert("Error al obtener datos del formulario.");
        return null;
      }

      const referente = formContainers[0];
      const referido = formContainers[1];

      function obtenerValor(campo, contenedor) {
        const elemento = contenedor.querySelector(`#${campo}`);
        return elemento ? elemento.value.trim() : "";
      }

      // **Datos del Referente**
      const nombreReferente = obtenerValor("referente_name", referente);
      const apellidoReferente = obtenerValor("referente_lastname", referente);
      const proyectoReferente = parseInt(
        obtenerValor("referente_project", referente),
        10
      );
      const documentoReferente = obtenerValor(
        "referente_identification",
        referente
      );
      const telefonoReferente = obtenerValor("referente_phone", referente);
      const emailReferente = obtenerValor("referente_email", referente);
      const tipoDocumentoReferente =
        referente.querySelector("#referente_document_type").value === "DNI"
          ? 1
          : 4;

      // **Datos del Referido**
      const nombreReferido = obtenerValor("referido_name", referido);
      const apellidoReferido = obtenerValor("referido_lastname", referido);
      const proyectoReferido = parseInt(
        obtenerValor("referido_project", referido),
        10
      );
      const documentoReferido = obtenerValor(
        "referido_identification",
        referido
      );
      const telefonoReferido = obtenerValor("referido_phone", referido);
      const emailReferido = obtenerValor("referido_email", referido);
      const tipoDocumentoReferido =
        referido.querySelector("#referido_document_type").value === "DNI"
          ? 1
          : 4;

      // 🔹 **Transformar ID del Proyecto en Nombre del Proyecto**
      const proyectosMap = {
        1646: "Seed Growing Home",
        1647: "Soil Quality Home",
      };

      const nombreProyectoReferente =
        proyectosMap[proyectoReferente] || "Otro Proyecto";
      const nombreProyectoReferido =
        proyectosMap[proyectoReferido] || "Otro Proyecto";

      // **Construcción del JSON**
      return {
        evolta: {
          IdTipoPortal: 10,
          IdProyecto: proyectoReferente,
          IdTipoDocumento: tipoDocumentoReferente,
          NroDocumento: documentoReferente,
          Nombres: nombreReferente,
          Apellidos: apellidoReferente,
          Correo: emailReferente,
          Celular: telefonoReferente,
          Comentario: `Datos del referido:\nNombres: ${nombreReferido}\nApellidos: ${apellidoReferido}\nProyecto de Interés: ${nombreProyectoReferente}\nDocumento: ${documentoReferido}\nTeléfono: ${telefonoReferido}\nCorreo: ${emailReferido}`,
        },
        mailer: {
          Titulo: "¡Nuevo Registro en Refiere y Gana!",
          Nombres: nombreReferente,
          Apellidos: apellidoReferente,
          IdProyecto: nombreProyectoReferente,
          Correo: emailReferente,
          Celular: telefonoReferente,
          Comentario: `Datos del referido:\nNombres: ${nombreReferido}\nApellidos: ${apellidoReferido}\nProyecto de Interés: ${nombreProyectoReferente}\nDocumento: ${documentoReferido}\nTeléfono: ${telefonoReferito}\nCorreo: ${emailReferido}`,
        },
        referente: {
          IdTipoPortal: 10,
          IdProyecto: proyectoReferente,
          IdTipoDocumento: tipoDocumentoReferente,
          NroDocumento: documentoReferente,
          Nombres: nombreReferente,
          Apellidos: apellidoReferente,
          Correo: emailReferente,
          Celular: telefonoReferente,
        },
        referido: {
          IdTipoPortal: 10,
          IdProyecto: proyectoReferido,
          IdTipoDocumento: tipoDocumentoReferido,
          NroDocumento: documentoReferido,
          Nombres: nombreReferido,
          Apellidos: apellidoReferido,
          Correo: emailReferido,
          Celular: telefonoReferido,
        },
      };
    }

    // Asignar el listener para el submit del formulario
    const form = document.getElementById("form_refiere");
    if (form) {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const json_data = validarFormulario();

        if (!json_data) {
          return; // Si hay un error en la validación, se detiene la ejecución
        }

        // Se omiten los envíos y se imprime en consola
        console.log("enviado");
      });
    }

    // Agregar listeners a inputs, selects y textareas
    const inputsAndTextareas = document.querySelectorAll(
      "form input, form select, form textarea"
    );

    inputsAndTextareas.forEach((element) => {
      element.addEventListener("focus", () => {
        const parentDiv = element.closest(".row, .text-area, div");
        if (parentDiv) {
          parentDiv.classList.add("inFocus"); // Agregar clase al contenedor
        }
      });

      element.addEventListener("blur", () => {
        const parentDiv = element.closest(".row, .text-area, div");
        if (parentDiv) {
          parentDiv.classList.remove("inFocus"); // Remover clase al salir del foco
        }
      });

      // Detectar cambios en inputs, textareas o selects
      element.addEventListener("input", () => {
        const parentDiv = element.closest(".row, .text-area, div");
        if (parentDiv) {
          if (
            element.value.trim() !== "" ||
            (element.tagName.toLowerCase() === "select" &&
              element.selectedIndex !== 0)
          ) {
            parentDiv.classList.add("filled"); // Agregar clase si tiene contenido o selección válida
          } else {
            parentDiv.classList.remove("filled"); // Remover clase si está vacío
          }
        }
      });

      // Para detectar cambios en el select específicamente
      if (element.tagName.toLowerCase() === "select") {
        element.addEventListener("change", () => {
          const parentDiv = element.closest(".row, .text-area, div");
          if (parentDiv) {
            if (element.value.trim() !== "" || element.selectedIndex !== 0) {
              parentDiv.classList.add("filled");
            } else {
              parentDiv.classList.remove("filled");
            }
          }
        });
      }
    });
  }, []);

  return (
    <Layout>
      {/* Aquí todo el contenido de la página */}
      <section className="info-section">
        <div className="info-section__container">
          <div className="info-section__title">
            <h1>
              ¡Refiere y<br />
              <span>Gana!</span>
            </h1>
            <p>
              ¡Por cada referido ganas
              <br />
              <span>s/.2,000.00 !</span>
            </p>
            <Image
              width={170}
              height={80}
              alt="Flecha gris decorativa de guía"
              className="arrow flecha_1"
              src="/flecha-gris.png"
            />
          </div>
          <picture>
            <Image
              width={400}
              height={300}
              src="/refiere/refiere-pig.png"
              alt="Alcancía sobre monedas"
            />
            <Image
              width={170}
              height={80}
              alt="Flecha gris decorativa de guía"
              className="arrow flecha_2"
              src="/flecha-gris.png"
            />
          </picture>
          <ul>
            <li>
              <div className="bubble">
                Recomienda a un amigo o conocido
                <span className="corner"></span>
              </div>
              <div className="message">
                Invita a esa persona que sueña con su hogar
              </div>
            </li>
            <li>
              <div className="message">
                Llena nuestro formulario de referidos con los datos de tu
                contacto
              </div>
              <div className="bubble">
                Regístralo fácilmente
                <span className="corner"></span>
              </div>
            </li>
            <li>
              <div className="bubble">
                Nosotros hacemos el resto
                <span className="corner"></span>
              </div>
              <div className="message">
                Nuestro equipo se pondrá en contacto con tu referido,
                brindándole la mejor asesoría
              </div>
            </li>
            <Image
              width={170}
              height={80}
              alt="Flecha gris decorativa de guía"
              className="arrow flecha_3"
              src="/flecha-gris.png"
            />
          </ul>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0h24v24H0z" stroke="none"></path>
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </div>
      </section>
      <section className="form-section">
        <Image
          width={250}
          height={450}
          alt="Flecha gris decorativa de guía"
          className="flecha_1"
          src="/flecha-gris.png"
        />
        <Image
          width={250}
          height={450}
          alt="Flecha gris decorativa de guía"
          className="flecha_2"
          src="/flecha-gris.png"
        />
        <Image
          width={200}
          height={200}
          alt="Billetes decorativos"
          src="/refiere/billete_1.png"
          className="billete billete-1"
        />
        <Image
          width={200}
          height={200}
          alt="Billetes decorativos"
          src="/refiere/billete_2.png"
          className="billete billete-2"
        />
        <Image
          width={200}
          height={200}
          alt="Billetes decorativos"
          src="/refiere/billete_3.png"
          className="billete billete-3"
        />
        <Image
          width={200}
          height={200}
          alt="Billetes decorativos"
          src="/refiere/billete_4.png"
          className="billete billete-4"
        />
        <Image
          width={200}
          height={200}
          alt="Billetes decorativos"
          src="/refiere/billete_5.png"
          className="billete billete-5"
        />
        <Image
          width={200}
          height={200}
          alt="Billetes decorativos"
          src="/refiere/billete_6.png"
          className="billete billete-6"
        />
        <h2>Completa el formulario</h2>
        <div className="form-section__container">
          <picture>
            <Image
              width={224}
              height={224}
              src="/refiere/verdi-form.png"
              alt="Verdi te da un consejo"
            />
            <div className="message-bubble">
              <div className="message-container">
                <span className="message">
                  ¡El momento es <strong>ahora!</strong>
                </span>
                <span className="corner"></span>
              </div>
            </div>
          </picture>
          <form id="form_refiere">
            <div className="form__container">
              <h2>Tus datos</h2>
              <div className="row">
                <div>
                  <input
                    type="text"
                    id="referente_name"
                    name="referente_name"
                    required
                  />
                  <label htmlFor="referente_name">
                    <span>Nombres</span>
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    id="referente_lastname"
                    name="referente_lastname"
                    required
                  />
                  <label htmlFor="referente_lastname">
                    <span>Apellidos</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="full select">
                  <select
                    id="referente_project"
                    name="referente_project"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled></option>
                    <option value="1646">Seed Growing Home</option>
                    <option value="1647">Soil Quality Home</option>
                  </select>
                  <label htmlFor="referente_project">
                    <span>Proyecto de Interés</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="full">
                  <input
                    type="text"
                    id="referente_email"
                    name="referente_email"
                    required
                  />
                  <label htmlFor="referente_email">
                    <span>Correo electrónico</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="document-container full">
                  <div>
                    <select
                      id="referente_document_type"
                      name="referente_document_type"
                      defaultValue={"DNI"}
                    >
                      <option value="DNI">DNI</option>
                      <option value="C.E">C.E</option>
                    </select>
                  </div>
                  <div>
                    <div>
                      <input
                        type="number"
                        id="referente_identification"
                        name="referente_identification"
                        required
                      />
                      <label htmlFor="referente_identification">
                        <span>Número de identificación</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="full">
                  <input
                    type="text"
                    id="referente_phone"
                    name="referente_phone"
                    required
                  />
                  <label htmlFor="referente_phone">
                    <span>Número de teléfono</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="form__container">
              <h2>Datos del referido</h2>
              <div className="row">
                <div>
                  <input
                    type="text"
                    id="referido_name"
                    name="referido_name"
                    required
                  />
                  <label htmlFor="referido_name">
                    <span>Nombres</span>
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    id="referido_lastname"
                    name="referido_lastname"
                    required
                  />
                  <label htmlFor="referido_lastname">
                    <span>Apellidos</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="full select">
                  <select
                    id="referido_project"
                    name="referido_project"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled></option>
                    <option value="1646">Seed Growing Home</option>
                    <option value="1647">Soil Quality Home</option>
                  </select>
                  <label htmlFor="referido_project">
                    <span>Proyecto de Interés</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="full">
                  <input
                    type="text"
                    id="referido_email"
                    name="referido_email"
                    required
                  />
                  <label htmlFor="referido_email">
                    <span>Correo electrónico</span>
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="document-container full">
                  <div>
                    <select
                      id="referido_document_type"
                      name="referido_document_type"
                      defaultValue={"DNI"}
                    >
                      <option value="DNI">DNI</option>
                      <option value="C.E">C.E</option>
                    </select>
                  </div>
                  <div>
                    <div>
                      <input
                        type="number"
                        id="referido_identification"
                        name="referido_identification"
                        required
                      />
                      <label htmlFor="referido_identification">
                        <span>Número de identificación</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="full">
                  <input
                    type="text"
                    id="referido_phone"
                    name="referido_phone"
                    required
                  />
                  <label htmlFor="referido_phone">
                    <span>Número de teléfono</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button>Enviar mensaje</button>
            </div>
          </form>
          <Image
            width={1050}
            height={100}
            className="hojas"
            src="/barra-hojas.png"
            alt="Barra hojas"
          />
        </div>
      </section>
      <DontGoComponent variant="standard" />
    </Layout>
  );
}
