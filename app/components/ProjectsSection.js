import Link from 'next/link'
import slugify from 'slugify'
import ProjectCard from './ProjectCard'
import '../styles/components/projectsSection.css'

const projects = [
  {
    name: 'SOIL',
    location: 'PUEBLO LIBRE',
    address: 'Av. La Marina 426',
    status: 'EN CONSTRUCCIÓN',
    imgSrc: '/buildings/soil-project.png',
    minSize: '35',
    maxSize: '77',
    rooms: '1, 2 Y 3',
    price: '277,780'
  },
  {
    name: 'SEED',
    location: 'SURCO',
    address: 'Jr. República de Libano 173',
    status: 'ENTREGADO',
    imgSrc: '/buildings/seed-project.png',
    minSize: '52',
    maxSize: '146',
    rooms: '2, 3 Y 4',
    price: '467,780'
  },
  {
    name: 'ROOTS',
    location: 'BARRANCO',
    address: 'Próximo Proyecto',
    status: 'EN LANZAMIENTO',
    imgSrc: '/proyectos/Fachada en construcción.png',
    minSize: '40',
    maxSize: '92',
    rooms: '1, 2 Y 3',
    price: '357,890'
  }
]

export default function ProjectsSection ({ param }) {
  return (
    <aside className='proyectos-section'>
      <div className='proyectos-section__container'>
        <div className='double_container'>
          {projects.map((project, index) => {
            const slug = `departamentos-en-venta-${slugify(project.location, {
              lower: true,
              strict: true
            })}-${slugify(project.name, { lower: true, strict: true })}`

            return (
              <div key={index} className='second_container'>
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
                  link={`/proyectos/${slug}`}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className='proyectos-section__button'>
        <Link href='/proyectos'>Ver más proyectos</Link>
        <img src='/barra-hojas.png' alt='Barra hojas' />
      </div>
    </aside>
  )
}
