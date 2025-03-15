"use client";

import { useEffect } from "react";

export default function ContactFormScript() {
  useEffect(() => {
    const form = document.getElementById("form_contact");
    if (form) {
      form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const json_data = validarFormulario();
        if (!json_data) {
          return;
        }
        console.log("enviado");
      });
    }

    const inputsAndTextareas = document.querySelectorAll(
      "form input, form select, form textarea"
    );

    inputsAndTextareas.forEach((element) => {
      element.addEventListener("focus", () => {
        const parentDiv = element.closest(".row, .text-area, div");
        if (parentDiv) {
          parentDiv.classList.add("inFocus");
        }
      });

      element.addEventListener("blur", () => {
        const parentDiv = element.closest(".row, .text-area, div");
        if (parentDiv) {
          parentDiv.classList.remove("inFocus");
        }
      });

      element.addEventListener("input", () => {
        const parentDiv = element.closest(".row, .text-area, div");
        if (parentDiv) {
          if (
            element.value.trim() !== "" ||
            (element.tagName.toLowerCase() === "select" &&
              element.selectedIndex !== 0)
          ) {
            parentDiv.classList.add("filled");
          } else {
            parentDiv.classList.remove("filled");
          }
        }
      });

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
          Comentario: `Datos del referido:\nNombres: ${nombreReferido}\nApellidos: ${apellidoReferido}\nProyecto de Interés: ${nombreProyectoReferente}\nDocumento: ${documentoReferido}\nTeléfono: ${telefonoReferido}\nCorreo: ${emailReferido}`,
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
  }, []);

  return null;
}
