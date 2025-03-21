import Image from 'next/image'
import Link from 'next/link'

export default function ProjectCard ({
  name,
  location,
  address,
  status,
  imgSrc,
  minSize,
  maxSize,
  rooms,
  price,
  link
}) {
  return (
    <article className='proyectos-section__card' data-location={location}>
      <header className='proyectos-section__location'>
        <span className='building-name'>{name}</span>
        <Image width={27} height={21} src="/icons/location-icon.png" alt="Location Icon" />
        <address className='building-adress'>{address}</address>
      </header>
      <Link href={link} className='card_content'>
        <span className='card_location'>{location}</span>
        <span className='card_status'>{status}</span>
        <div className='card_img'>
          <Image width={400} height={500} src={imgSrc} alt={`Imagen del Proyecto ${name}`} />
          <div className='icon-container'>
            <Image width={125} height={123} src='/leaf-hover.png' alt='Hoja animada' />
          </div>
        </div>
        <div className='card_data'>
          <div className='card_size'>
            <div>
              <Image width={21} height={21} src='/icons/icon_m2.png' alt='icono m2' />
              <span>DESDE</span> {minSize} m<sup>2</sup>
            </div>
            <div>
              <span>HASTA</span> {maxSize} m<sup>2</sup>
            </div>
          </div>
          <div className='card-group__data'>
            <div className='card_bedrooms'>
              <Image width={21} height={18} src='/icons/bed-icon.png' alt='Icono Cama' />
              <div>
                <span>DORMS.</span>
                <br />
                {rooms}
              </div>
            </div>
            <div className='card_price'>
              <div>
                DESDE <span>s/ {price}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
