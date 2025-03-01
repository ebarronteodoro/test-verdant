import Image from "next/image";

export default function TeamCard ({ name, position, image }) {
  return (
    <article className='team-card'>
      <header>
        <h4>{name}</h4>
        <figcaption>{position}</figcaption>
      </header>
      <figure>
        <Image width={300} height={300} src={image} alt={name} loading='lazy' />
      </figure>
    </article>
  )
}
