export default function BrandsSection() {
  return (
    <section className='brands-section'>
      <h3>Socios Estratégicos</h3>
      <aside>
        {[
          { img: "LOGO-SUNFIRE.png", label: "Sun Fire SAC" },
          { img: "LOGO_SYNERGY.png", label: "Synergy" },
          { img: "LOGO_SOS.png", label: "SOS 911 SAC" }
        ].map(({ img, label }, index) => (
          <figure key={index}>
            <img src={`/nosotros/socios/${img}`} alt={`Logotipo de ${label}`} />
            <figcaption>{label}</figcaption>
          </figure>
        ))}
      </aside>
    </section>
  )
}
