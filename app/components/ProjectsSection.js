import Link from "next/link";
import slugify from "slugify";
import ProjectCard from "./ProjectCard";
import "../styles/components/projectsSection.css";
import Image from "next/image";

const projects = [
  {
    name: "SOIL",
    location: "PUEBLO LIBRE",
    address: "Av. La Marina 426",
    status: "EN CONSTRUCCIÓN",
    imgSrc: "/buildings/soil-project.png",
    minSize: "35",
    maxSize: "77",
    rooms: "1, 2 Y 3",
    price: "277,780",
  },
  {
    name: "SEED",
    location: "SURCO",
    address: "Jr. República de Libano 173",
    status: "ENTREGADO",
    imgSrc: "/buildings/seed-project.png",
    minSize: "52",
    maxSize: "146",
    rooms: "2, 3 Y 4",
    price: "467,780",
  },
  {
    name: "ROOTS",
    location: "BARRANCO",
    address: "Próximo Proyecto",
    status: "EN LANZAMIENTO",
    imgSrc: "/proyectos/Fachada_en_construcción.png",
    minSize: "40",
    maxSize: "92",
    rooms: "1, 2 Y 3",
    price: "357,890",
  },
];

export default function ProjectsSection({ param }) {
  return (
    <aside className="proyectos-section">
      <div className="proyectos-section__container">
        <div className="double_container">
          {projects.map((project, index) => {
            const slug = `${slugify(project.location, {
              lower: true,
              strict: true,
            })}-${slugify(project.name, { lower: true, strict: true })}`;

            return (
              <div key={index} className="second_container">
                <ProjectCard
                  name={project.name}
                  location={project.location}
                  address={project.address}
                  status={project.status}
                  imgSrc={project.imgSrc}
                  minSize={project.minSize}
                  maxSize={project.maxSize}
                  rooms={project.rooms}
                  price={project.price}
                  link={`/venta-departamentos/${slug}`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="proyectos-section__button">
        <Link href="/venta-departamentos">Ver más proyectos</Link>
        <Image
          width={2000}
          height={120}
          src="/barra-hojas.png"
          alt="Barra hojas"
        />
      </div>
      {param === "proyectos" ? (
        <>
          <Image
            width={120}
            height={252}
            className="laterales lateral_izq"
            src="/flecha-gris.png"
            alt="Decoración de flechas laterales"
          />
          <Image
            width={120}
            height={252}
            className="laterales lateral_der"
            src="/flecha-gris.png"
            alt="Decoración de flechas laterales"
          />
        </>
      ) : (
        <>
          <Image
            width={120}
            height={1050}
            className="laterales lateral_der"
            src="/laterales.png"
            alt="Adorno de hojas laterales"
          />
          <Image
            width={120}
            height={1050}
            className="laterales lateral_izq"
            src="/laterales.png"
            alt="Adorno de hojas laterales"
          />
        </>
      )}
    </aside>
  );
}
