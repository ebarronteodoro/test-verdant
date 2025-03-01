import Image from "next/image";

export default function PilaresSection() {
  return (
    <section className='pilares-section'>
      <h3>
        Mantenemos nuestros <strong>pilares firmes</strong>
      </h3>
      <aside>
        {[
          { img: "innovation.png", label: "Constante Innovación" },
          { img: "team-work.png", label: "Trabajo en Equipo" },
          { img: "integridad.png", label: "Integridad Profesional" },
          { img: "client-service.png", label: "Servicio al Cliente" }
        ].map(({ img, label }, index) => (
          <figure key={index}>
            <Image width={100} height={100} src={`/nosotros/${img}`} alt={label} />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </aside>
    </section>
  )
}
