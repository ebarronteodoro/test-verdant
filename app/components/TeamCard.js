export default function TeamCard ({ name, position, image }) {
  return (
    <article className='team-card'>
      <header>
        <h4>{name}</h4>
        <figcaption>{position}</figcaption>
      </header>
      <figure>
        <img src={image} alt={name} loading='lazy' />
      </figure>
    </article>
  )
}
